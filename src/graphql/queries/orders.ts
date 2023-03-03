import { gql } from '@apollo/client'

import { GameFragment } from './fragments/game'

export const QUERY_ORDERS = gql`
  ${GameFragment}

  query QueryOrders($identifier: ID!, $sort: String!) {
    orders(where: { user: { id: $identifier } }, sort: $sort) {
      id
      card_brand
      card_last4
      created_at
      games {
        ...GameFragment
      }
    }
  }
`
