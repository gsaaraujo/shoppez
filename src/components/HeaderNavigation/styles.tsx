import styled from 'styled-components/native';

import { theme } from '../../global/theme/styles';

export const Container = styled.View`
  width: 100%;
  height: 50px;
  z-index: 10;
  margin-top: 20px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const Wrapper = styled.Pressable`
  align-items: center;
  justify-content: center;
`;
