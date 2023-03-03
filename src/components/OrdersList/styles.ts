import styled, { css } from 'styled-components'

import * as GameItemStyles from 'components/GameItem/styles'
import * as HeadingStyles from 'components/Heading/styles'
import * as EmptyStyles from 'components/Empty/styles'

export const Wrapper = styled.div`
  ${({ theme }) => css`
    ${GameItemStyles.Wrapper} {
      &:last-child {
        border-bottom: none;
      }
    }
    ${HeadingStyles.Wrapper} {
      margin-bottom: 1.3rem;
    }
    ${EmptyStyles.Description} {
      color: ${theme.colors.black};
    }
  `}
`

export const Content = styled.div`
  overflow-x: hidden;
  overflow-y: auto;
  max-height: 42.5rem;
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
    background: linear-gradient(180deg, #ff5f5f 0%, #f062c0 50%);
  }

  &::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(180deg, #b14242 0%, #b64b93 50%);
  }

  &::-webkit-scrollbar-thumb:active {
    background: linear-gradient(180deg, #8e3434 0%, #a24282 50%);
  }
`
