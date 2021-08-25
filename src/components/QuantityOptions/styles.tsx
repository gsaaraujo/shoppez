import styled from 'styled-components/native';

import { theme } from '../../global/theme/styles';

type TitleProps = {
  font: string;
  color: string;
  size: number;
};

export const Container = styled.View`
  width: 100%;
  height: 485px;
  padding-left: 20px;
  padding-right: 20px;
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
  background-color: ${theme.colors.background};
`;

export const Title = styled.Text<TitleProps>`
  color: ${props => props.color};
  font-size: ${props => props.size}px;
  font-family: ${props => props.font};
`;

export const Wrapper = styled.Pressable`
  position: absolute;
  top: 20px;
  right: 20px;
`;

export const QuantityContent = styled.Pressable`
  width: 100%;
  height: 50px;
  margin-bottom: 5px;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  border: 1.5px solid ${theme.colors.border};
`;
