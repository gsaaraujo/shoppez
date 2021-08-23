import React from 'react';

import { theme } from '../../global/theme/styles';

import { Container, Title } from './styles';

type Props = {
  title: string;
  isSelected: boolean;
  handleOnPress: (category: string) => void;
};

export const CategoriesProduct = ({
  title,
  isSelected,
  handleOnPress,
}: Props) => {
  const {} = theme.fonts;
  const { border, primaryDark } = theme.colors;

  return (
    <Container
      borderColor={isSelected ? primaryDark : border}
      onPress={() => handleOnPress(title)}>
      <Title color={isSelected ? primaryDark : border}>{title}</Title>
    </Container>
  );
};
