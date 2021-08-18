import styled from 'styled-components/native';

import { theme } from '../../global/theme/styles';

export const Container = styled.View`
  width: 100%;
`;

export const Title = styled.Text`
  font-size: 12px;
  color: ${theme.colors.warning};
  font-family: ${theme.fonts.titleFont100};
`;
