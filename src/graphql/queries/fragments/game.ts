import { gql } from '@apollo/client'

export const GameFragment = gql`
  fragment GameFragment on Game {
    cover {
      url
    }
    id
    name
    slug
    developers {
      name
    }
    price
  }
`
