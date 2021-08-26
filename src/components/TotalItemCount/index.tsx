import React from 'react';

import { theme } from '../../global/theme/styles';

import { Container, Title, Span } from './styles';

type Props = {
  productQuantity: number;
  productPriceSum: number;
};

export const TotalItemCount = ({ productQuantity, productPriceSum }: Props) => {
  const { subtitleFont } = theme.fonts;
  const { subtitleColor } = theme.colors;

  return (
    <Container>
      <Title font={subtitleFont} color={subtitleColor} size={18}>
        <Span>{productQuantity}</Span> items
      </Title>

      <Title font={subtitleFont} color={subtitleColor} size={18}>
        <Span>$</Span>
        {productPriceSum}
      </Title>
    </Container>
  );
};
