import { gql, QueryHookOptions, useQuery } from '@apollo/client'
import { QueryGames, QueryGamesVariables } from 'graphql/generated/QueryGames'
import { GameFragment } from './fragments/game'

export const QUERY_GAMES = gql`
  ${GameFragment}

  query QueryGames($start: Int, $limit: Int, $where: JSON, $sort: String) {
    games(start: $start, limit: $limit, where: $where, sort: $sort) {
      ...GameFragment
    }

    gamesConnection(where: $where) {
      values {
        id
      }
    }
  }
`

export const QUERY_GAME_BY_SLUG = gql`
  query QueryGameBySlug($slug: String!) {
    games(where: { slug: $slug }) {
      cover {
        src: url
      }
      id
      name
      short_description
      price
      gallery {
        src: url
        label: alternativeText
      }
      description
      developers {
        name
      }
      release_date
      platforms {
        name
      }
      publisher {
        name
      }
      rating
      categories {
        name
      }
    }
  }
`

export function useQueryGames(
  options?: QueryHookOptions<QueryGames, QueryGamesVariables>
) {
  return useQuery<QueryGames, QueryGamesVariables>(QUERY_GAMES, options)
}
