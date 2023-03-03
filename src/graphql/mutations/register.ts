import { gql } from '@apollo/client'

export const MUTATION_REGISTER = gql`
  mutation mutationRegister($input: UsersPermissionsRegisterInput!) {
    register(input: $input) {
      jwt
    }
  }
`
