import styled from 'styled-components/native';

import { theme } from '../../global/theme/styles';

type TitleProps = {
  font: string;
  size: number;
  color: string;
};

export const Container = styled.Pressable`
  width: 45%;
  height: 272px;
  padding-left: 15px;
  padding-right: 15px;
  align-items: center;
  border-radius: 20px;
  background-color: ${theme.colors.primaryLight};
`;

export const Title = styled.Text<TitleProps>`
  text-align: center;
  color: ${props => props.color};
  font-size: ${props => props.size}px;
  font-family: ${props => props.font};
`;

export const Span = styled.Text`
  color: ${theme.colors.primaryDark};
  font-family: ${theme.fonts.titleFont100};
  font-size: 16px;
`;

export const Wrapper = styled.Pressable`
  position: absolute;
  top: 0px;
  right: 0px;
  z-index: 20;
`;

export const ProductImage = styled.View`
  width: 90px;
  height: 90px;
  border-radius: 45px;
  align-items: center;
  justify-content: center;
  background-color: ${theme.colors.background};
`;

export const Offer = styled.View`
  position: absolute;
  top: 15px;
  left: 0px;
  width: 90px;
  height: 25px;
  align-items: center;
  justify-content: center;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  background-color: ${theme.colors.primaryDark};
`;

export const Image = styled.Image`
  width: 140px;
  height: 140px;
`;
