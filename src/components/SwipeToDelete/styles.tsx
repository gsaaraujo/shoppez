import styled from 'styled-components/native';

import { theme } from '../../global/theme/styles';

export const Container = styled.View`
  width: 30%;
  align-items: flex-end;
  background-color: ${theme.colors.background};
`;

export const Box = styled.Pressable`
  width: 80px;
  height: 100%;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  background-color: ${theme.colors.primaryDark};
`;
