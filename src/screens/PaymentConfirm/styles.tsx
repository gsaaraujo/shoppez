import styled from 'styled-components/native';

import { theme } from '../../global/theme/styles';

export const Container = styled.View`
  flex: 1;
  padding-left: 20px;
  padding-right: 20px;
  background-color: ${theme.colors.background};
`;

export const Content = styled.View`
  flex: 1;
`;

export const Title = styled.Text`
  font-size: 16px;
  color: ${theme.colors.titleColor};
  font-family: ${theme.fonts.titleFont100};
`;

export const Subtitle = styled.Text`
  font-size: 14px;
  color: ${theme.colors.subtitleColor};
  font-family: ${theme.fonts.subtitleFont};
`;
