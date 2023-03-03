import { screen, render } from 'utils/test-utils'

import items from 'components/CartList/mock'

import CartDropdown from '.'
import { CartContextDefaultValues } from 'hooks/use-cart'

describe('<CartDropdown />', () => {
  beforeEach(() => {
    const cartProviderProps = {
      ...CartContextDefaultValues,
      items,
      quantity: items.length,
      total: '$330,00'
    }
    render(<CartDropdown />, { cartProviderProps })
  })
  it('should render <CartIcon /> and its badge', () => {
    expect(screen.getByLabelText(/shopping cart/i)).toBeInTheDocument()
    expect(screen.getByText(`${items.length}`)).toBeInTheDocument()
  })

  it('should render Dropdown content with cart items and total', () => {
    expect(screen.getByText(/\$330,00/i)).toBeInTheDocument()

    expect(screen.getAllByText(/Borderlands 3/i)).toHaveLength(3)
  })
})
