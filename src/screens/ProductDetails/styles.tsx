import styled from 'styled-components/native';

import { theme } from '../../global/theme/styles';

type TitleProps = {
  font: string;
  color: string;
  size: number;
  alignSelf?: string;
};

export const Container = styled.View`
  flex: 1;
  background-color: ${theme.colors.background};
  padding-left: 20px;
  padding-right: 20px;
`;

export const Content = styled.ScrollView``;

export const Title = styled.Text<TitleProps>`
  color: ${props => props.color};
  font-size: ${props => props.size}px;
  font-family: ${props => props.font};
  align-self: ${props => props.alignSelf || 'flex-start'};
`;

export const Subtitle = styled.Text`
  font-family: ${theme.fonts.subtitleFont};
  color: ${theme.colors.subtitleColor};
  font-size: 13px;
  line-height: 20px;
  letter-spacing: 0.5px;
`;

export const Span = styled.Text`
  color: ${theme.colors.primaryDark};
  font-family: ${theme.fonts.titleFont100};
  font-size: 20px;
`;

export const CircleLayout = styled.View`
  position: absolute;
  top: -300px;
  width: 550px;
  height: 550px;
  align-self: center;
  border-radius: 275px;
  background-color: ${theme.colors.primaryLight};
`;

export const ProductImage = styled.View`
  width: 200px;
  height: 200px;
  align-self: center;
`;

export const Image = styled.Image`
  width: 200px;
  height: 200px;
`;

export const TypesContent = styled.View`
  width: 60%;
  align-self: center;
  flex-direction: row;
  justify-content: space-between;
`;

export const Info = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const DetailedInfo = styled.View`
  flex: 1;
`;

export const SizesContent = styled.View`
  width: 310px;
  flex-direction: row;
  justify-content: space-between;
`;
