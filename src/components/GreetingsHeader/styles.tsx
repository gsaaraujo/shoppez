import styled from 'styled-components/native';

import { theme } from '../../global/theme/styles';

type TitleProps = {
  font: string;
  size: number;
};

export const Container = styled.View`
  width: 100%;
`;

export const Title = styled.Text<TitleProps>`
  color: ${theme.colors.titleColor};
  font-size: ${props => props.size}px;
  font-family: ${props => props.font};
`;
