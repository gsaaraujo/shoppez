import styled from 'styled-components/native';

import { theme } from '../../global/theme/styles';

type TitleProps = {
  font: string;
  color: string;
  size: number;
  alignSelf?: string;
};

export const Container = styled.Pressable`
  flex: 1;
  padding: 110px 40px 64px;
  justify-content: space-between;
`;

export const Header = styled.View`
  width: 100%;
`;

export const Title = styled.Text<TitleProps>`
  color: ${props => props.color};
  font-size: ${props => props.size}px;
  font-family: ${props => props.font};
  align-self: ${props => props.alignSelf || 'flex-start'};
`;

export const FormInput = styled.View`
  width: 100%;
`;

export const Footer = styled.Pressable`
  width: 100%;
`;

export const Span = styled.Text`
  font-size: 18px;
  color: ${theme.colors.primaryDark};
  font-family: ${theme.fonts.titleFont100};
`;

export const WarningMessageContent = styled.View`
  width: 100%;
  height: 40px;
`;
