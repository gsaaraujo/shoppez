import styled from 'styled-components/native';

import { theme } from '../../global/theme/styles';

type TitleProps = {
  textAlign?: string;
};

export const Container = styled.Pressable`
  width: 100%;
`;

export const Title = styled.Text<TitleProps>`
  color: ${theme.colors.titleColor};
  font-size: 18px;
  font-family: ${theme.fonts.titleFont50};
  text-align: ${props => props.textAlign || 'left'};
`;

export const Span = styled.Text`
  font-size: 18px;
  color: ${theme.colors.primaryDark};
  font-family: ${theme.fonts.titleFont100};
`;
