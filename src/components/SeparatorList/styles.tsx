import styled from 'styled-components/native';

import { theme } from '../../global/theme/styles';

export const Container = styled.View`
  width: 67%;
  height: 2px;
  margin-top: 20px;
  margin-bottom: 20px;
  align-self: flex-end;
  background-color: ${theme.colors.primaryLight};
`;
