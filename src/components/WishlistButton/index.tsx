import Button, { ButtonProps } from 'components/Button'
import Spinner from 'components/Spinner'
import { useWishlist } from 'hooks/use-wishlist'
import { useSession } from 'next-auth/client'
import { useState } from 'react'
import { Favorite, FavoriteBorder } from 'styled-icons/material-outlined'

export type WishlistButtonProps = {
  id: string
  hasText?: boolean
} & Pick<ButtonProps, 'size'>

const WishlistButton = ({
  id,
  hasText,
  size = 'small'
}: WishlistButtonProps) => {
  const [session] = useSession()
  const [loading, setLoading] = useState(false)
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist()

  if (!session) {
    return null
  }

  const handleClick = async () => {
    setLoading(true)
    isInWishlist(id) ? await removeFromWishlist(id) : await addToWishlist(id)
    setLoading(false)
  }

  const text = isInWishlist(id) ? 'Remove from Wishlist' : 'Add to Wishlist'

  return (
    <Button
      minimal
      size={size}
      onClick={handleClick}
      icon={
        loading ? (
          <Spinner size={24} />
        ) : isInWishlist(id) ? (
          <Favorite aria-label={text} />
        ) : (
          <FavoriteBorder aria-label={text} />
        )
      }
    >
      {hasText && text}
    </Button>
  )
}

export default WishlistButton
