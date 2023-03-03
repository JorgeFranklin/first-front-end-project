import { Lock, Error } from '@styled-icons/material-outlined'

import Button from 'components/Button'
import TextField from 'components/TextField'
import { FormWrapper, FormError } from 'components/Form'

import { useState } from 'react'
import { useRouter } from 'next/router'

import { signIn } from 'next-auth/client'
import { FieldErrors, resetValidate } from 'utils/validations'

const FormResetPassword = () => {
  const [formError, setFormError] = useState('')
  const [fieldError, setFieldError] = useState<FieldErrors>({})
  const [loading, setLoading] = useState(false)

  const [values, setValues] = useState({
    password: '',
    confirm_password: ''
  })

  const { query } = useRouter()

  const handleInput = (field: string, value: string) => {
    setValues((s) => ({ ...s, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const errors = resetValidate(values)

    const hasError = Object.keys(errors).length

    if (hasError) {
      setFieldError(errors)
      setFormError('')
      setLoading(false)
      return
    }

    setFieldError({})

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/reset-password`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          code: query.code,
          password: values.password,
          passwordConfirmation: values.confirm_password
        })
      }
    )

    const data = await response.json()

    if (data.error) {
      const messageError = data.message[0].messages[0].message
      setFormError(messageError)
      setLoading(false)
    } else {
      signIn('credentials', {
        email: data.user.email,
        password: values.password,
        callbackUrl: '/'
      })
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
      <form onSubmit={handleSubmit}>
        <TextField
          name="password"
          placeholder="Password"
          type="password"
          icon={<Lock />}
          iconPosition="left"
          onInputChange={(value: string) => handleInput('password', value)}
          error={fieldError?.password}
        />
        <TextField
          name="confirm_password"
          placeholder="Confirm password"
          type="password"
          icon={<Lock />}
          iconPosition="left"
          onInputChange={(value: string) =>
            handleInput('confirm_password', value)
          }
          error={fieldError?.confirm_password}
        />

        <Button type="submit" size="large" disabled={loading} fullWidth>
          Reset password
        </Button>
      </form>
    </FormWrapper>
  )
}

export default FormResetPassword
