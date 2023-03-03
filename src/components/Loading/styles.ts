import styled, { css, keyframes } from 'styled-components'

const rotate = keyframes`
  0% { transform: rotate(0deg)  }
  100% { transform: rotate(360deg)  }
`

const openAndClose = keyframes`
  0% { height: 2rem; width: 4rem }
  25% { height: 1rem; width: 2rem }
  50% { height: 1rem; width: 1rem }
  75% { height: 1rem; width: 2rem }
  100% { height: 2rem; width: 4rem }
`

export const Wrapper = styled.div`
  height: 4.5rem;
  width: 4.5rem;
`

type CircleProps = {
  color?: 'primary' | 'secondary'
  bgColor?: 'black' | 'white'
}

export const Circle = styled.div<CircleProps>`
  ${({ theme, color, bgColor }) => css`
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    border-radius: 50%;
    border: ${theme.colors[color!]} 0.5rem solid;
    width: 100%;
    height: 100%;
    animation: ${rotate} 1s linear infinite;

    ::before {
      content: '';
      position: absolute;
      background-color: ${bgColor === 'black'
        ? theme.colors.mainBg
        : theme.colors.white};
      top: -0.7rem;
      border-radius: 50%;
      animation: ${openAndClose} 3s infinite reverse backwards;
    }
  `}
`
