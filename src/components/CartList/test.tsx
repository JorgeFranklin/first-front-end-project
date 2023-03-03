import { screen, render } from 'utils/test-utils'

import items from './mock'

import CartList from '.'
import { CartContextDefaultValues } from 'hooks/use-cart'

const props = {}

describe('<CartList />', () => {
  it('should render the heading', () => {
    const cartProviderProps = {
      ...CartContextDefaultValues,
      items,
      total: '$330,00'
    }

    const { container } = render(<CartList {...props} />, { cartProviderProps })

    expect(
      screen.getAllByRole('heading', { name: /Borderlands 3/i })
    ).toHaveLength(3)

    expect(screen.getByText(/\$330,00/i)).toHaveStyle({ color: '#F231A5' })

    expect(container.firstChild).toMatchSnapshot()
  })

  it('should render the button', () => {
    const cartProviderProps = {
      ...CartContextDefaultValues,
      items
    }

    render(<CartList {...props} hasButton />, { cartProviderProps })

    expect(screen.getByText(/buy it now/i)).toBeInTheDocument()
  })

  it('should render loading', () => {
    const cartProviderProps = {
      ...CartContextDefaultValues,
      loading: true
    }

    render(<CartList {...props} hasButton />, { cartProviderProps })

    expect(screen.getByText('LOADING')).toBeInTheDocument()
  })

  it('should render empty if there are no games', () => {
    render(<CartList />)

    expect(screen.getByText(/your cart is empty/i)).toBeInTheDocument()
    expect(screen.queryByText(/Total:/i)).not.toBeInTheDocument()
  })
})
