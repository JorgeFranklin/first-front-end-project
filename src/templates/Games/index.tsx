import Base from 'templates/Base'
import { KeyboardArrowDown as ArrowDown } from '@styled-icons/material-outlined/KeyboardArrowDown'

import ExploreSidebar, { ItemProps } from 'components/ExploreSidebar'
import GameCard from 'components/GameCard'

import * as S from './styles'
import { Grid } from 'components/Grid'
import { useQueryGames } from 'graphql/queries/games'
import Loading from 'components/Loading'
import { useRouter } from 'next/router'
import { parseQueryStringToFilter, parseQueryStringToWhere } from 'utils/filter'
import { ParsedUrlQueryInput } from 'querystring'
import Empty from 'components/Empty'
import { getImageUrl } from 'utils/getImageUrl'

export type GamesTemplateProps = {
  filterItems: ItemProps[]
}

const GamesTemplate = ({ filterItems }: GamesTemplateProps) => {
  const { push, query } = useRouter()

  const { data, loading, fetchMore } = useQueryGames({
    notifyOnNetworkStatusChange: true,
    variables: {
      limit: 15,
      where: parseQueryStringToWhere({
        queryString: query,
        filterItems
      }),
      sort: query.sort as string | null
    }
  })

  if (!data) return <Loading />

  const { games, gamesConnection } = data

  const hasMoreGames = games.length < (gamesConnection?.values?.length || 0)

  const handleFilter = (items: ParsedUrlQueryInput) => {
    push({ pathname: '/games', query: items })
    return
  }

  const handleShowMore = () => {
    fetchMore({ variables: { start: data?.games.length, limit: 15 } })
  }

  return (
    <Base>
      <S.Main>
        <ExploreSidebar
          items={filterItems}
          onFilter={handleFilter}
          initialValues={parseQueryStringToFilter({
            queryString: query,
            filterItems
          })}
        />

        <section>
          {data?.games.length ? (
            <>
              <Grid>
                {data?.games.map((game) => (
                  <GameCard
                    id={game.id}
                    key={game.slug}
                    img={`${getImageUrl(game.cover?.url)}`}
                    title={game.name}
                    slug={game.slug}
                    developer={game.developers[0].name}
                    price={game.price}
                  />
                ))}
              </Grid>
              {hasMoreGames && (
                <>
                  {loading ? (
                    <S.LoadingWrapper>
                      <Loading />
                      LOADING
                    </S.LoadingWrapper>
                  ) : (
                    <S.ShowMore role="button" onClick={handleShowMore}>
                      <p>Show More</p>
                      <ArrowDown size={35} />
                    </S.ShowMore>
                  )}
                </>
              )}
            </>
          ) : (
            <Empty
              title=":("
              description="We didn't find any games with this filter"
            />
          )}
        </section>
      </S.Main>
    </Base>
  )
}

export default GamesTemplate
