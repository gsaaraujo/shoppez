import styled from 'styled-components/native';

import { theme } from '../../global/theme/styles';

type ButtonProps = {
  backgroundColor: string;
};

type TitleProps = {
  color: string;
  size: number;
};

export const Container = styled.View`
  width: 100%;
  height: 230px;
  padding-left: 20px;
  padding-right: 20px;
  justify-content: center;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  background-color: ${theme.colors.background};
`;

export const Wrapper = styled.Pressable`
  position: absolute;
  top: 20px;
  right: 20px;
`;

export const Title = styled.Text<TitleProps>`
  font-size: 16px;
  color: ${props => props.color};
  font-family: ${theme.fonts.titleFont100};
  text-align: center;
`;

export const Button = styled.Pressable<ButtonProps>`
  width: 90px;
  height: 50px;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.backgroundColor};
`;

export const OptionsContent = styled.View`
  flex-direction: row;
  justify-content: center;
`;
