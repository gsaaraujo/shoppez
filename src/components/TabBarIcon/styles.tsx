import styled from 'styled-components/native';

import { theme } from '../../global/theme/styles';

type ContainerProps = {
  backgroundColor: string;
};

export const Container = styled.View<ContainerProps>`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.backgroundColor};
`;
