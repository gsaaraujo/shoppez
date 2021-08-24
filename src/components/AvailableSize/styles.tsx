import styled from 'styled-components/native';

import { theme } from '../../global/theme/styles';

type ContainerProps = {
  borderColor: string;
  backgroundColor: string;
};

type TitleProps = {
  color: string;
};

export const Container = styled.Pressable<ContainerProps>`
  width: 70px;
  height: 40px;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  border: 1.5px solid ${props => props.borderColor};
  background-color: ${props => props.backgroundColor};
`;

export const Title = styled.Text<TitleProps>`
  font-size: 16px;
  color: ${props => props.color};
  font-family: ${theme.fonts.titleFont50};
`;
