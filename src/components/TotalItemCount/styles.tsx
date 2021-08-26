import styled from 'styled-components/native';

import { theme } from '../../global/theme/styles';

type TitleProps = {
  font: string;
  color: string;
  size: number;
};

export const Container = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const Title = styled.Text<TitleProps>`
  color: ${theme.colors.titleColor};
  font-size: ${props => props.size}px;
  font-family: ${props => props.font};
`;

export const Span = styled.Text`
  color: ${theme.colors.primaryDark};
  font-family: ${theme.fonts.titleFont100};
  font-size: 20px;
`;
