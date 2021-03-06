import styled from 'styled-components/native';

import { theme } from '../../global/theme/styles';

type SpanProps = {
  color: string;
};

export const Container = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: ${theme.colors.background};
`;

type TitleProps = {
  font: string;
  color: string;
  size: number;
  alignSelf?: string;
};

export const Title = styled.Text<TitleProps>`
  color: ${theme.colors.titleColor};
  font-size: ${props => props.size}px;
  font-family: ${props => props.font};
`;

export const ProductImage = styled.View`
  width: 50px;
  height: 50px;
  border-radius: 25px;
  align-items: center;
  justify-content: center;
  background-color: ${theme.colors.primaryLight};
`;

export const Image = styled.Image`
  width: 90px;
  height: 90px;
`;

export const ImageContent = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const Span = styled.Text<SpanProps>`
  color: ${props => props.color};
  font-family: ${theme.fonts.titleFont100};
  font-size: 16px;
`;

export const Info = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const ProductInformation = styled.View`
  flex: 2;
`;

export const Box = styled.View`
  width: 30px;
  height: 30px;
  border-radius: 5px;
  align-items: center;
  justify-content: center;
  background-color: ${theme.colors.primaryLight};
`;
