import React, { ReactNode } from 'react';
import { StatusBar } from 'react-native';

import { theme } from '../../global/theme/styles';

import { Container, Overlay } from './styles';

type Props = {
  children: ReactNode;
  isVisible?: boolean;
  justifyContent?: string;
};

export const ModalView = ({
  children,
  isVisible = false,
  justifyContent,
}: Props) => {
  const { overlay } = theme.colors;

  return (
    <Container
      testID='ModalView'
      transparent
      visible={isVisible}
      animationType='fade'>
      <StatusBar backgroundColor={overlay} />
      <Overlay justifyContent={justifyContent}>{children}</Overlay>
    </Container>
  );
};
