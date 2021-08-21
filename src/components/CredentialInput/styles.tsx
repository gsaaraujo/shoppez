import styled from 'styled-components/native';

import { theme } from '../../global/theme/styles';

type ContainerProps = {
  highLight: string;
};

type TitleProps = ContainerProps;

export const Container = styled.View<ContainerProps>`
  width: 100%;
  height: 45px;
  border-radius: 10px;
  border: 1.5px solid ${props => props.highLight};
`;

export const TextInput = styled.TextInput`
  width: 100%;
  height: 100%;
  font-size: 14px;
  padding-left: 22px;
  padding-right: 22px;
  color: ${theme.colors.titleColor};
  font-family: ${theme.fonts.subtitleFont};
`;

export const TitleContent = styled.View`
  top: -10px;
  left: 22px;
  height: 15px;
  position: absolute;
  align-items: center;
  background-color: #ffffff;
`;

export const Title = styled.Text<TitleProps>`
  font-size: 12px;
  padding-left: 5px;
  padding-right: 5px;
  color: ${props => props.highLight};
  font-family: ${theme.fonts.titleFont50};
`;

export const Wrapper = styled.Pressable`
  top: 13px;
  right: 0px;
  position: absolute;
  padding-right: 20px;
`;
