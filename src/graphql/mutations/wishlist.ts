import { gql } from '@apollo/client'
import { GameFragment } from '../../graphql/queries/fragments/game'

export const MUTATION_CREATE_WISHLIST = gql`
  ${GameFragment}

  mutation MutationCreateWishlist($input: createWishlistInput!) {
    createWishlist(input: $input) {
      wishlist {
        id
        games {
          ...GameFragment
        }
      }
    }
  }
`

export const MUTATION_UPDATE_WISHLIST = gql`
  ${GameFragment}

  mutation MutationUpdateWishlist($input: updateWishlistInput!) {
    updateWishlist(input: $input) {
      wishlist {
        id
        games {
          ...GameFragment
        }
      }
    }
  }
`
