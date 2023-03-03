import {
  Email,
  Error,
  CheckCircleOutline
} from '@styled-icons/material-outlined'

import Button from 'components/Button'
import TextField from 'components/TextField'
import { FormWrapper, FormError, FormSuccess } from 'components/Form'

import { useState } from 'react'
import { FieldErrors, forgotValidate } from 'utils/validations'
import { useRouter } from 'next/router'

const FormForgotPassword = () => {
  const [formSuccess, setFormSuccess] = useState('')
  const [formError, setFormError] = useState('')
  const [fieldError, setFieldError] = useState<FieldErrors>({})
  const [loading, setLoading] = useState(false)

  const { query } = useRouter()

  const [values, setValues] = useState({
    email: (query.email as string) || ''
  })

  const handleInput = (field: string, value: string) => {
    setValues((s) => ({ ...s, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const errors = forgotValidate(values)

    const hasError = Object.keys(errors).length

    if (hasError) {
      setFieldError(errors)
      setFormError('')
      setLoading(false)
      return
    }

    setFieldError({})

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/forgot-password`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
      }
    )

    const data = await response.json()
    setLoading(false)

    if (data.error) {
      const messageError = data.message[0].messages[0].message
      setFormError(messageError)
    } else {
      setFormError('')
      setFormSuccess('Email sent.')
    }
  }

  return (
    <FormWrapper>
      {!!formError && (
        <FormError>
          <Error />
          {formError}
        </FormError>
      )}
      {formSuccess ? (
        <FormSuccess>
          <CheckCircleOutline />
          {formSuccess}
        </FormSuccess>
      ) : (
        <form onSubmit={handleSubmit}>
          <TextField
            name="email"
            placeholder="Email"
            type="text"
            icon={<Email />}
            iconPosition="left"
            onInputChange={(value: string) => handleInput('email', value)}
            error={fieldError?.email}
            initialValue={query.email as string}
          />

          <Button type="submit" size="large" disabled={loading} fullWidth>
            Send email
          </Button>
        </form>
      )}
    </FormWrapper>
  )
}

export default FormForgotPassword
