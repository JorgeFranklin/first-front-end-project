import Link from 'next/link'
import { Email, Lock, Error } from '@styled-icons/material-outlined'
import { AccountCircle } from '@styled-icons/remix-line/AccountCircle'

import Button from 'components/Button'
import TextField from 'components/TextField'
import { FormWrapper, FormLink, FormError } from 'components/Form'
import React, { useState } from 'react'

import { UsersPermissionsRegisterInput } from 'graphql/generated/globalTypes'
import { useMutation } from '@apollo/client'
import { MUTATION_REGISTER } from 'graphql/mutations/register'
import { signIn } from 'next-auth/client'
import { FieldErrors, signUpValidate } from 'utils/validations'

const FormSignUp = () => {
  const [formError, setFormError] = useState('')
  const [fieldError, setFieldError] = useState<FieldErrors>({})

  const [values, setValues] = useState<UsersPermissionsRegisterInput>({
    username: '',
    email: '',
    password: ''
  })

  const [addUser, { error, loading }] = useMutation(MUTATION_REGISTER, {
    onError: (err) => {
      const message =
        err?.graphQLErrors[0]?.extensions?.exception.data.message[0].messages[0]
          .message

      if (message === 'Email already taken') {
        setFormError('Username already taken')
      } else {
        setFormError(message)
      }
    },
    onCompleted: () => {
      !error &&
        signIn('credentials', {
          email: values.email,
          password: values.password,
          callbackUrl: '/'
        })
    }
  })

  const handleInput = (field: string, value: string) => {
    setValues((s) => ({ ...s, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormError('')

    const errors = signUpValidate(values)

    const hasError = Object.keys(errors).length

    if (hasError) {
      setFieldError(errors)
      return
    }

    setFieldError({})

    addUser({
      variables: {
        input: {
          username: values.username,
          email: values.email,
          password: values.password
        }
      }
    })
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
          name="username"
          placeholder="Username"
          type="text"
          icon={<AccountCircle />}
          iconPosition="left"
          onInputChange={(value: string) => handleInput('username', value)}
          error={fieldError?.username}
        />

        <TextField
          name="email"
          placeholder="Email"
          type="text"
          icon={<Email />}
          iconPosition="left"
          onInputChange={(value: string) => handleInput('email', value)}
          error={fieldError?.email}
        />

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
          Sign up now
        </Button>

        <FormLink>
          Already have an account? <Link href="/sign-in">Sign in</Link>
        </FormLink>
      </form>
    </FormWrapper>
  )
}

export default FormSignUp
