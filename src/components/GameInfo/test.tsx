import 'session.mock'
import { screen, render } from 'utils/test-utils'

import GameInfo from '.'

const props = {
  id: '1',
  title: 'Borderlands 3',
  description:
    'Experience the epic space strategy games that redefined the RTS genre. Control your fleet and build an armada across more than 30 single-player missions.',
  price: 215
}

describe('<GameInfo />', () => {
  it('should render game informations', () => {
    const { container } = render(<GameInfo {...props} />)

    expect(
      screen.getByRole('heading', { name: /borderlands 3/i })
    ).toBeInTheDocument()

    expect(
      screen.getByText(
        'Experience the epic space strategy games that redefined the RTS genre. Control your fleet and build an armada across more than 30 single-player missions.'
      )
    ).toBeInTheDocument()

    expect(screen.getByText('$215.00')).toBeInTheDocument()

    expect(container.firstChild).toMatchSnapshot()
  })

  it('should render buttons', () => {
    render(<GameInfo {...props} />)

    expect(
      screen.getByRole('button', { name: /Add to Cart/i })
    ).toBeInTheDocument()

    expect(
      screen.getByRole('button', { name: /Add to Wishlist/i })
    ).toBeInTheDocument()
  })

  it('should render free', () => {
    render(<GameInfo {...props} price={0} />)

    expect(screen.getByText(/FREE/i)).toBeInTheDocument()
  })
})
