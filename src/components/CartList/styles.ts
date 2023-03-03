import { tint } from 'polished'
import styled, { css } from 'styled-components'
import media from 'styled-media-query'

import * as EmptyStyles from 'components/Empty/styles'

export const LoadingWrapper = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    padding: ${theme.spacings.medium};
    color: ${theme.colors.gray};
    font-weight: bold;

    ${media.greaterThan('medium')`
      min-width: 56rem;
    `}

    min-height: 32.6rem;
  `}
`

type WrapperProps = {
  isEmpty?: boolean
}

export const Wrapper = styled.main<WrapperProps>`
  ${({ theme, isEmpty }) => css`
    background: ${theme.colors.white};
    display: flex;
    flex-direction: column;
    align-self: start;

    ${isEmpty &&
    css`
      ${EmptyStyles.Wrapper} {
        padding-bottom: ${theme.spacings.medium};
      }
      ${EmptyStyles.Image} {
        max-width: 20rem;
      }
      ${EmptyStyles.Title} {
        font-size: ${theme.font.sizes.large};
      }
      ${EmptyStyles.Description} {
        color: ${theme.colors.black};
        font-size: ${theme.font.sizes.medium};
      }
    `}
  `}
`

export const GamesList = styled.div`
  max-height: 32.6rem;
  overflow-y: auto;
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

export const Footer = styled.div`
  ${({ theme }) => css`
    background: ${tint(0.2, theme.colors.lightGray)};
    color: ${theme.colors.black};
    font-weight: ${theme.font.bold};
    font-size: ${theme.font.sizes.small};
    padding: 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    ${media.greaterThan('medium')`
      font-size: ${theme.font.sizes.medium};
      padding: ${theme.spacings.small};
    `};
  `}
`

export const Total = styled.span`
  ${({ theme }) => css`
    color: ${theme.colors.primary};
  `}
`

export const EmptyWrapper = styled.div`
  ${({ theme }) => css`
    ${media.greaterThan('medium')`
      min-width: 56rem;
    `}
    padding: 0 ${theme.spacings.xsmall};
    min-height: 32.6rem;
  `}
`
