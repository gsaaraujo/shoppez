import styled from 'styled-components/native';

import { PressableProps } from 'react-native';
import { theme } from '../../global/theme/styles';

type ContainerProps = PressableProps & {
  backgroundColor: string;
};

type TitleProps = {
  color: string;
};

export const Container = styled.Pressable<ContainerProps>`
  width: 100%;
  height: 50px;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.backgroundColor};
`;

export const Title = styled.Text<TitleProps>`
  font-size: 16px;
  color: ${props => props.color};
  font-family: ${theme.fonts.titleFont100};
`;
