export default function formatPrice(price: number | bigint): string {
  if (price <= 0) return 'FREE'

  const formattedPrice = new Intl.NumberFormat('en', {
    style: 'currency',
    currency: 'USD'
  }).format(price)

  return formattedPrice
}
