import styled from 'styled-components/native';

import { theme } from '../../global/theme/styles';

export const Container = styled.Pressable`
  width: 70px;
  height: 40px;
  border-radius: 10px;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  border: 1.5px solid ${theme.colors.border};
`;

export const Title = styled.Text`
  font-size: 16px;
  color: ${theme.colors.subtitleColor};
  font-family: ${theme.fonts.titleFont50};
`;
