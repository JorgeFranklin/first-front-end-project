import { UsersPermissionsRegisterInput } from 'graphql/generated/globalTypes'
import Joi from 'joi'

const fieldsValidation = {
  username: Joi.string().min(5).required(),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
  password: Joi.string().required(),
  confirm_password: Joi.string()
    .valid(Joi.ref('password'))
    .required()
    .messages({ 'any.only': 'confirm password does not match with password' })
}

export type FieldErrors = {
  [field: string]: string
}

export function getFieldErrors(objError: Joi.ValidationResult) {
  const errors: FieldErrors = {}

  if (objError.error) {
    objError.error.details.forEach((err) => {
      errors[err.path?.join('.')] = err.message
    })
  }

  return errors
}

export function signUpValidate(values: UsersPermissionsRegisterInput) {
  const schema = Joi.object(fieldsValidation)
  const objError = schema.validate(values, { abortEarly: false })

  return getFieldErrors(objError)
}

type SignInValues = Omit<UsersPermissionsRegisterInput, 'username'>

export function signInValidate(values: SignInValues) {
  const { email, password } = fieldsValidation
  const schema = Joi.object({ email, password })

  const objError = schema.validate(values, { abortEarly: false })

  return getFieldErrors(objError)
}

type ForgotValidate = Pick<UsersPermissionsRegisterInput, 'email'>

export function forgotValidate(values: ForgotValidate) {
  const { email } = fieldsValidation
  const schema = Joi.object({ email })

  const objError = schema.validate(values, { abortEarly: false })

  return getFieldErrors(objError)
}

type ResetValidate = {
  password: string
  confirm_password: string
}

export function resetValidate(values: ResetValidate) {
  const { password, confirm_password } = fieldsValidation
  const schema = Joi.object({ password, confirm_password })

  const objError = schema.validate(values, { abortEarly: false })

  return getFieldErrors(objError)
}
