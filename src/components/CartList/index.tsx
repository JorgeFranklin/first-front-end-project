import Button from 'components/Button'
import Empty from 'components/Empty'
import GameItem from 'components/GameItem'
import Spinner from 'components/Spinner'
import { useCart } from 'hooks/use-cart'
import Link from 'next/link'
import * as S from './styles'

export type CartListProps = {
  hasButton?: boolean
}

const CartList = ({ hasButton = false }: CartListProps) => {
  const { items, total, loading } = useCart()

  if (loading) {
    return (
      <S.LoadingWrapper>
        <Spinner size={36} />
        LOADING
      </S.LoadingWrapper>
    )
  }

  return (
    <S.Wrapper isEmpty={!items.length}>
      {items.length > 0 ? (
        <>
          <S.GamesList>
            {items.map((item) => (
              <GameItem key={item.title} {...item} />
            ))}
          </S.GamesList>

          <S.Footer>
            {!hasButton && <span>Total:</span>}
            <S.Total>{total}</S.Total>
            {hasButton && (
              <Link href="/cart" passHref>
                <Button as="a">Buy it now</Button>
              </Link>
            )}
          </S.Footer>
        </>
      ) : (
        <S.EmptyWrapper>
          <Empty
            title="Your cart is empty"
            description="Go back to the store and explore great games and offers."
            hasLink
          />
        </S.EmptyWrapper>
      )}
    </S.Wrapper>
  )
}

export default CartList
