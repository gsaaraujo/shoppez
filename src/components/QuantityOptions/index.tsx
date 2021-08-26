import React from 'react';

import ExitSvg from '../../assets/images/x-circle.svg';

import { theme } from '../../global/theme/styles';

import { Spacer } from '../Spacer';

import { Container, Wrapper, Title, QuantityContent } from './styles';

type Props = {
  handleOnPressModal: () => void;
  handleOnPressQuantity: (quantity: number) => void;
};

export const QuantityOptions = ({
  handleOnPressModal,
  handleOnPressQuantity,
}: Props) => {
  const { titleFont100, titleFont50 } = theme.fonts;
  const { titleColor, subtitleColor, primaryDark, border } = theme.colors;

  const quantities = [1, 2, 3, 4, 5, 6];

  return (
    <Container>
      <Spacer height={70} />

      <Wrapper
        hitSlop={25}
        style={({ pressed }) => pressed && { opacity: 0.3 }}
        onPress={handleOnPressModal}>
        <ExitSvg color={primaryDark} />
      </Wrapper>

      <Title font={titleFont100} color={titleColor} size={16}>
        Select the quantity
      </Title>

      <Spacer height={15} />

      {quantities.map((quantity, index) => (
        <QuantityContent
          style={({ pressed }) => pressed && { opacity: 0.3 }}
          key={index}
          onPress={() => {
            handleOnPressQuantity(quantity), handleOnPressModal();
          }}>
          <Title font={titleFont50} color={subtitleColor} size={14}>
            {quantity} units
          </Title>
        </QuantityContent>
      ))}
    </Container>
  );
};
