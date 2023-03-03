import { gql } from '@apollo/client'

import { GameFragment } from './fragments/game'
import { HighlightFragment } from './fragments/highlight'

export const QUERY_UPCOMING = gql`
  ${GameFragment}
  ${HighlightFragment}

  query QueryUpcoming($date: Date!, $limit: Int!) {
    upcommingGames: games(
      where: { release_date_gt: $date }
      sort: "release_date:asc"
      limit: $limit
    ) {
      ...GameFragment
    }

    showcase: home {
      upcoming: upcomingGames {
        title
        highlight {
          ...HighlightFragment
        }
      }
    }
  }
`
