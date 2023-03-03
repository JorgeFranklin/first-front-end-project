import 'match-media-mock'
import { screen, render } from 'utils/test-utils'

import bannersMock from 'components/BannerSlider/mock'
import gamesSliderMock from 'components/GameCardSlider/mock'
import highlightMock from 'components/Highlight/mock'

import Home from '.'

const props = {
  banners: bannersMock,
  newGamesTitle: 'News',
  newGames: [gamesSliderMock[0]],
  mostPopularGamesTitle: 'Most popular',
  mostPopularHighlight: highlightMock,
  mostPopularGames: [gamesSliderMock[0]],
  upcomingGamesTitle: 'Upcoming games',
  upcomingGames: [gamesSliderMock[0]],
  upcomingHighlight: highlightMock,
  freeGamesTitle: 'Free games',
  freeGamesHighlight: highlightMock,
  freeGames: [gamesSliderMock[0]]
}

jest.mock('templates/Base', () => ({
  __esModule: true,
  default: function Mock({ children }: { children: React.ReactNode }) {
    return <div data-testid="Mock Base">{children}</div>
  }
}))

jest.mock('components/Showcase', () => {
  return {
    __esModule: true,
    default: function Mock() {
      return <div data-testid="Mock Showcase"></div>
    }
  }
})

jest.mock('components/BannerSlider', () => {
  return {
    __esModule: true,
    default: function Mock() {
      return <div data-testid="Mock Banner Slider"></div>
    }
  }
})

describe('<Home />', () => {
  it('should render banner and showcases', () => {
    render(<Home {...props} />)

    expect(screen.getByTestId('Mock Banner Slider')).toBeInTheDocument()
    expect(screen.getAllByTestId('Mock Showcase')).toHaveLength(4)
  })
})
