import {
  signUpValidate,
  signInValidate,
  forgotValidate,
  resetValidate
} from '.'

describe('validations', () => {
  describe('signInValidate()', () => {
    it('should validate empty fields', () => {
      const values = { email: '', password: '' }

      expect(signInValidate(values)).toMatchObject({
        email: '"email" is not allowed to be empty',
        password: '"password" is not allowed to be empty'
      })
    })

    it('should return invalid email error', () => {
      const values = { email: 'invalid-email', password: 'password' }

      expect(signInValidate(values)).toMatchObject({
        email: '"email" must be a valid email'
      })
    })
  })

  describe('signUpValidate()', () => {
    it('should validate empty fields', () => {
      const values = {
        username: '',
        email: '',
        password: ''
      }

      expect(signUpValidate(values)).toMatchObject({
        username: expect.any(String),
        email: expect.any(String),
        password: expect.any(String),
        confirm_password: expect.any(String)
      })
    })

    it('should return short username error', () => {
      const values = {
        username: 'hi',
        email: '',
        password: ''
      }

      expect(signUpValidate(values).username).toMatchInlineSnapshot(
        `"\\"username\\" length must be at least 5 characters long"`
      )
    })

    it('should return invalid email error', () => {
      const values = {
        username: 'Jorge',
        email: 'invalid-email',
        password: ''
      }

      expect(signUpValidate(values).email).toMatchInlineSnapshot(
        `"\\"email\\" must be a valid email"`
      )
    })

    it('should return error if password does not match with confirm password', () => {
      const values = {
        username: 'Jorge',
        email: 'anyemail@gmail.com',
        password: 'password',
        confirm_password: 'confirmPassword'
      }

      expect(signUpValidate(values).confirm_password).toMatchInlineSnapshot(
        `"confirm password does not match with password"`
      )
    })
  })

  describe('forgotValidate()', () => {
    it('should validate empty fields', () => {
      const values = { email: '' }

      expect(forgotValidate(values)).toMatchObject({
        email: '"email" is not allowed to be empty'
      })
    })

    it('should return invalid email error', () => {
      const values = { email: 'invalid-email' }

      expect(forgotValidate(values)).toMatchObject({
        email: '"email" must be a valid email'
      })
    })
  })

  describe('resetValidate()', () => {
    it('should validate empty fields', () => {
      const values = {
        password: '',
        confirm_password: ''
      }

      expect(resetValidate(values)).toMatchObject({
        password: expect.any(String)
      })
    })

    it('should validate confirm password when empty', () => {
      const values = {
        password: 'password',
        confirm_password: ''
      }

      expect(resetValidate(values).confirm_password).toMatchInlineSnapshot(
        `"\\"confirm_password\\" is not allowed to be empty"`
      )
    })

    it('should validate confirm password when different', () => {
      const values = {
        password: 'password',
        confirm_password: 'aicalica'
      }

      expect(resetValidate(values).confirm_password).toMatchInlineSnapshot(
        `"confirm password does not match with password"`
      )
    })
  })
})
