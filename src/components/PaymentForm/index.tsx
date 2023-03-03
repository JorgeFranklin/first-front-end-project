import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import { PaymentIntent, StripeCardElementChangeEvent } from '@stripe/stripe-js'
import Button from 'components/Button'
import Heading from 'components/Heading'
import { useCart } from 'hooks/use-cart'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

import { ErrorOutline, ShoppingCart } from 'styled-icons/material-outlined'
import { createPayment, createPaymentIntent } from 'utils/stripe/methods'

import * as S from './styles'

type PaymentFormProps = {
  session: any
}

const PaymentForm = ({ session }: PaymentFormProps) => {
  const [error, setError] = useState<string | null>(null)
  const [disabledCard, setDisabledCard] = useState(false)
  const [disabled, setDisabled] = useState(true)
  const [clientSecret, setClientSecret] = useState('')
  const [freeGames, setFreeGames] = useState(false)
  const { push } = useRouter()

  const stripe = useStripe()
  const elements = useElements()

  const { items } = useCart()

  useEffect(() => {
    async function setPaymentMode() {
      if (items.length) {
        const data = await createPaymentIntent({ items, token: session.jwt })

        if (data.freeGames) {
          setFreeGames(true)
          return
        } else {
          setFreeGames(false)
        }

        if (data.error) {
          setError(data.error)
          return
        }

        setClientSecret(data.client_secret)
      }
    }

    setPaymentMode()
  }, [items, session])

  const handleChange = async (event: StripeCardElementChangeEvent) => {
    setDisabled(event.empty)
    setError(event.error ? event.error.message : '')
  }

  const saveOrder = async (paymentIntent?: PaymentIntent) => {
    const data = await createPayment({
      items,
      paymentIntent,
      token: session.jwt
    })

    return data
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setDisabled(true)
    setDisabledCard(true)

    if (freeGames) {
      saveOrder()
      push('/success')
      return
    }

    const payload = await stripe!.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements!.getElement(CardElement)!
      }
    })

    if (payload.error) {
      setError(`Payment failed ${payload.error.message}`)
    } else {
      setError(null)
      saveOrder(payload.paymentIntent)
      push('/success')
    }

    setDisabled(false)
    setDisabledCard(false)
  }

  const cardStyle = {
    base: {
      fontSize: '16px'
    }
  }

  return (
    <S.Wrapper>
      <form onSubmit={handleSubmit}>
        <S.Body>
          <Heading lineBottom size="small" color="black">
            Payment
          </Heading>

          {freeGames ? (
            <S.FreeGames>Only free games, click buy and enjoy!</S.FreeGames>
          ) : (
            <CardElement
              options={{
                hidePostalCode: true,
                style: cardStyle,
                disabled: disabledCard
              }}
              onChange={handleChange}
            />
          )}

          {!!error && (
            <S.Error>
              <ErrorOutline size={20} />
              <span>{error}</span>
            </S.Error>
          )}
        </S.Body>
        <S.Footer>
          <Link href="/" passHref>
            <Button fullWidth minimal as="a">
              Continue shopping
            </Button>
          </Link>
          <Button
            fullWidth
            icon={<ShoppingCart />}
            disabled={!freeGames && (disabled || !!error)}
          >
            Buy now
          </Button>
        </S.Footer>
      </form>
    </S.Wrapper>
  )
}

export default PaymentForm
