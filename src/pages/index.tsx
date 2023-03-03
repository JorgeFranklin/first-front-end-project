import Home, { HomeTemplateProps } from 'templates/Home'

import { initializeApollo } from 'utils/apollo'
import { QUERY_HOME } from 'graphql/queries/home'
import { QueryHome, QueryHomeVariables } from 'graphql/generated/QueryHome'
import { bannerMapper, gamesMapper, highlightMapper } from 'utils/mappers'

// não esquecer de exportar a função, se não, não funciona.
// "getStatic" vai gerar um estático na hora do build e, servir este estático para qualquer requisição.
// "getServerSide" vai gerar uma página a cada requisição do usuário a página.
export async function getStaticProps() {
  // faz uma lógica aqui, como pegar dados em uma api ou mock.
  const apolloClient = initializeApollo()

  const today = new Date().toISOString().slice(0, 10)

  const {
    data: { banners, newGames, upcommingGames, freeGames, sections }
  } = await apolloClient.query<QueryHome, QueryHomeVariables>({
    query: QUERY_HOME,
    variables: {
      date: today,
      limit: 8
    },
    fetchPolicy: 'no-cache'
  })

  // depois retorna os dados para o componente responsável por renderizar esta página, que está logo em baixo.
  return {
    revalidate: 60,
    props: {
      banners: bannerMapper(banners),
      newGamesTitle: sections?.newGames?.title,
      newGamesHighlight: highlightMapper(sections?.newGames?.highlight),
      newGames: gamesMapper(newGames),
      mostPopularGamesTitle: sections?.popularGames?.title,
      mostPopularHighlight: highlightMapper(sections?.popularGames?.highlight),
      mostPopularGames: gamesMapper(sections!.popularGames!.games),
      upcomingGamesTitle: sections?.upcomingGames?.title,
      upcomingHighlight: highlightMapper(sections?.upcomingGames?.highlight),
      upcomingGames: gamesMapper(upcommingGames),
      freeGamesTitle: sections?.freeGames?.title,
      freeGamesHighlight: highlightMapper(sections?.freeGames?.highlight),
      freeGames: gamesMapper(freeGames)
    }
  }
}

export default function Index(props: HomeTemplateProps) {
  return <Home {...props} />
}

// ATENÇÃO:
// os métodos getStatic/getServerSide SÓ FUNCIONAM NO DIRETÓRIO (PAGES)
