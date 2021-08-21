import styled from 'styled-components/native';

import { theme } from '../../global/theme/styles';

export const Container = styled.Pressable`
  width: 80%;
  height: 193px;
  border-radius: 20px;
  background-color: ${theme.colors.primaryBlank};
`;

export const Content = styled.View`
  flex: 1;
  padding-left: 43px;
  padding-right: 43px;
  align-items: center;
  justify-content: center;
`;

export const Wrapper = styled.View`
  width: 100px;
  height: 100px;
`;

export const Title = styled.Text`
  font-size: 18px;
  color: ${theme.colors.primaryDark};
  font-family: ${theme.fonts.titleFont100};
`;
