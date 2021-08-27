import styled from 'styled-components/native';

import { theme } from '../../global/theme/styles';

type TitleProps = {
  font: string;
  color: string;
  size: number;
  alignSelf?: string;
};

export const Container = styled.View`
  flex: 1;
  padding-left: 20px;
  padding-right: 20px;
  background-color: ${theme.colors.background};
`;

export const Title = styled.Text<TitleProps>`
  color: ${theme.colors.titleColor};
  font-size: ${props => props.size}px;
  font-family: ${props => props.font};
`;

export const CenterMessage = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;
