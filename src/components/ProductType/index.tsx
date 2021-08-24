import React from 'react';

import { theme } from '../../global/theme/styles';

import { Container, Image } from './styles';

type Props = {
  imageUri: string;
  isSelected: boolean;
  handleOnPress: (type: string) => void;
};

export const ProductType = ({ imageUri, isSelected, handleOnPress }: Props) => {
  const {} = theme.fonts;
  const { primaryDark, border } = theme.colors;

  return (
    <Container
      hitSlop={15}
      borderColor={isSelected ? primaryDark : border}
      onPress={() => handleOnPress(imageUri)}>
      {!!imageUri && (
        <Image
          width={50}
          height={50}
          source={{ uri: imageUri }}
          resizeMode='contain'
        />
      )}
    </Container>
  );
};
