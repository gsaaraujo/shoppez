import React from 'react';
import {
  AppProductType,
  ShoppingCartType,
  PurchaseHistoryType,
} from '../../context/userProvider';

import { theme } from '../../global/theme/styles';
import { Spacer } from '../Spacer';

import {
  Container,
  ImageContent,
  ProductImage,
  ProductInformation,
  Image,
  Title,
  Info,
  Box,
  Span,
} from './styles';

type Props = {
  itemInfo: ShoppingCartType | PurchaseHistoryType;
};

export const ProductItem = ({ itemInfo }: Props) => {
  const { titleFont100, titleFont50 } = theme.fonts;
  const {} = theme.colors;

  return (
    <Container>
      <ImageContent>
        <ProductImage>
          <Image
            source={{
              uri: itemInfo.types[0],
            }}
          />
        </ProductImage>
      </ImageContent>

      <ProductInformation>
        <Title font={titleFont100} size={14}>
          {itemInfo.name.toUpperCase()}
        </Title>

        <Spacer height={22} />

        <Info>
          <Box>
            <Title font={titleFont50} size={16}>
              x{itemInfo.quantity}
            </Title>
          </Box>

          <Title font={titleFont50} size={16}>
            <Span>$</Span>
            {itemInfo.price}
          </Title>
        </Info>
      </ProductInformation>
    </Container>
  );
};
