import {
  createGlobalStyle,
  css,
  DefaultTheme,
  GlobalStyleComponent
} from 'styled-components'

type GlobalStylesProps = {
  removeBg?: boolean
}

const GlobalStyles: GlobalStyleComponent<
  GlobalStylesProps,
  DefaultTheme
> = createGlobalStyle`
  @font-face {
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 300;
    font-display: swap;
    src: local('Poppins Light'), local('Poppins-Light'),
        url('/fonts/poppins-v20-latin-300.woff2') format('woff2');
  }

  @font-face {
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 400;
    font-display: swap;
    src: local('Poppins Regular'), local('Poppins-Regular'),
        url('/fonts/poppins-v20-latin-regular.woff2') format('woff2');
  }

  @font-face {
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 600;
    font-display: swap;
    src: local('Poppins SemiBold'), local('Poppins-SemiBold'),
        url('/fonts/poppins-v20-latin-600.woff2') format('woff2');
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;

    &::before {
      box-sizing: inherit;
    }

    &::after {
      box-sizing: inherit;
    }
  }

  ${({ theme, removeBg }) => css`
    html {
      font-size: 62.5%;
    }

    body {
      font-family: ${theme.font.family};
      font-size: ${theme.font.sizes.medium};
      &::-webkit-scrollbar {
        width: 10px;
        width: 10px;
      }
      &::-webkit-scrollbar-track {
        border-radius: 5px;
        background-color: #eaeaea;
      }

      &::-webkit-scrollbar-track:hover {
        background-color: #eaeaea;
      }

      &::-webkit-scrollbar-track:active {
        background-color: #eaeaea;
      }

      &::-webkit-scrollbar-thumb {
        border-radius: 5px;
        background: linear-gradient(180deg, #ff5f5f 0%, #f062c0 50%);
      }

      &::-webkit-scrollbar-thumb:hover {
        background: linear-gradient(180deg, #b14242 0%, #b64b93 50%);
      }

      &::-webkit-scrollbar-thumb:active {
        background: linear-gradient(180deg, #8e3434 0%, #a24282 50%);
      }
      ${!removeBg &&
      css`
        background-color: ${theme.colors.mainBg};
      `}
    }
  `}

`

export default GlobalStyles
