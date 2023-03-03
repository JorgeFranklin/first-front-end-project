import * as S from './styles'

export type LoadingProps = {
  color?: 'primary' | 'secondary'
  bgColor?: 'black' | 'white'
}

const Loading = ({ color = 'primary', bgColor = 'black' }: LoadingProps) => (
  <S.Wrapper>
    <S.Circle color={color} bgColor={bgColor} />
  </S.Wrapper>
)

export default Loading
