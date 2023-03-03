import styled, { css } from 'styled-components'

export const Content = styled.main`
  display: flex;
  flex-direction: column;
  text-align: center;
`

export const CheckMark = styled.div`
  ${({ theme }) => css`
    margin: ${theme.spacings.xsmall} 0;
  `}
`

export const Text = styled.p`
  ${({ theme }) => css`
    color: ${theme.colors.lightGray};

    & > a {
      text-decoration: none;
      color: ${theme.colors.primary};
    }
  `}
`
