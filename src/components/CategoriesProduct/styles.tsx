import styled from 'styled-components/native';

import { theme } from '../../global/theme/styles';

type ContainerProps = {
  borderColor: string;
};

type TitleProps = {
  color: string;
};

export const Container = styled.Pressable<ContainerProps>`
  margin-right: 10px;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  border: 2px solid ${props => props.borderColor};
`;

export const Title = styled.Text<TitleProps>`
  font-size: 12px;
  margin-left: 12px;
  margin-right: 12px;
  text-align: center;
  color: ${props => props.color};
  font-family: ${theme.fonts.titleFont50};
`;
