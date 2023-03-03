import { gql } from '@apollo/client'

import { BannerFragment } from 'graphql/queries/fragments/banner'
import { GameFragment } from './fragments/game'
import { HighlightFragment } from './fragments/highlight'

export const QUERY_HOME = gql`
  ${BannerFragment}
  ${GameFragment}
  ${HighlightFragment}

  query QueryHome($date: Date!, $limit: Int!) {
    banners {
      ...BannerFragment
    }

    newGames: games(
      where: { release_date_lte: $date }
      sort: "release_date:desc"
      limit: $limit
    ) {
      ...GameFragment
    }

    upcommingGames: games(
      where: { release_date_gt: $date }
      sort: "release_date:asc"
      limit: $limit
    ) {
      ...GameFragment
    }

    freeGames: games(
      where: { price: 0 }
      sort: "release_date:desc"
      limit: $limit
    ) {
      ...GameFragment
    }

    sections: home {
      newGames {
        title
        highlight {
          ...HighlightFragment
        }
      }

      popularGames {
        title
        highlight {
          ...HighlightFragment
        }
        games {
          ...GameFragment
        }
      }

      upcomingGames {
        title
        highlight {
          ...HighlightFragment
        }
      }

      freeGames {
        title
        highlight {
          ...HighlightFragment
        }
      }
    }
  }
`
