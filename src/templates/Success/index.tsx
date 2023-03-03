import { Container } from 'components/Container'
import { Divider } from 'components/Divider'
import { GameCardProps } from 'components/GameCard'
import Heading from 'components/Heading'
import { HighlightProps } from 'components/Highlight'
import Showcase from 'components/Showcase'
import Link from 'next/link'
import Base from 'templates/Base'

import { useCart } from 'hooks/use-cart'

import * as S from './styles'
import { useEffect } from 'react'

export type SuccessTemplateProps = {
  recommendedTitle?: string
  recommendedGames?: GameCardProps[]
  recommendedHighlight?: HighlightProps
}

const Success = ({
  recommendedTitle,
  recommendedGames,
  recommendedHighlight
}: SuccessTemplateProps) => {
  const { clearCart } = useCart()

  useEffect(() => {
    clearCart()
  }, [])

  return (
    <Base>
      <Container>
        <S.Content>
          <Heading>Your purchase was successful!</Heading>
          <S.CheckMark>
            <img src="/img/checkmark.png" />
          </S.CheckMark>
          <S.Text>
            Wait for your payment details by email. Your game is now available
            for download inside your{' '}
            <Link href="/profile/orders" passHref>
              <a>Orders List.</a>
            </Link>{' '}
            Enjoy!
          </S.Text>
        </S.Content>

        <Divider />
      </Container>
      <Showcase
        title={recommendedTitle}
        games={recommendedGames}
        highlight={recommendedHighlight}
      />
    </Base>
  )
}

export default Success
