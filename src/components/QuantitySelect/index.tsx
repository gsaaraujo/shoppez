import React, { useState } from 'react';

import ChevronDownSvg from '../../assets/images/chevron-down.svg';

import { theme } from '../../global/theme/styles';

import { ModalView } from '../ModalView';
import { QuantityOptions } from '../QuantityOptions';

import { Container, Title } from './styles';

type Props = {
  quantity: string;
  handleOnPress: (quantity: string) => void;
};

export const QuantitySelect = ({ quantity, handleOnPress }: Props) => {
  const [modalVisibility, setModalVisibility] = useState(false);

  const { titleColor } = theme.colors;

  const handleModalVisibility = () => setModalVisibility(!modalVisibility);

  return (
    <Container
      style={({ pressed }) => pressed && { opacity: 0.3 }}
      onPress={handleModalVisibility}>
      <Title>{quantity}</Title>
      <ChevronDownSvg color={titleColor} />

      <ModalView isVisible={modalVisibility}>
        <QuantityOptions
          handleOnPressModal={handleModalVisibility}
          handleOnPressQuantity={handleOnPress}
        />
      </ModalView>
    </Container>
  );
};
