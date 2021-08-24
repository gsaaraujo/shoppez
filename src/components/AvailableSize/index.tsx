import React from 'react';

import { theme } from '../../global/theme/styles';

import { Container, Title } from './styles';

type Props = {
  title: string;
  isSelected: boolean;
  handleOnPress: (sizeSelected: string) => void;
};

export const AvailableSize = ({ title, isSelected, handleOnPress }: Props) => {
  const {} = theme.fonts;
  const { titleColor, primaryDark, primaryBlank, border } = theme.colors;

  return (
    <Container
      borderColor={isSelected ? primaryDark : border}
      backgroundColor={isSelected ? primaryDark : primaryBlank}
      onPress={() => handleOnPress(title)}>
      <Title color={isSelected ? primaryBlank : titleColor}>US {title}</Title>
    </Container>
  );
};
