import React from 'react';

import { useUser } from '../../hooks/useUser';
import { AppProductType } from '../../context/userProvider';

import { Favorite } from '../Favorite';
import { Spacer } from '../Spacer';

import { theme } from '../../global/theme/styles';

import {
  Container,
  Title,
  Span,
  ImageContent,
  ProductImage,
  Image,
  ProductInformation,
  Info,
  Box,
} from './styles';

type Props = {
  itemInfo: AppProductType;
};

export const FavoriteItem = ({ itemInfo }: Props) => {
  const { titleFont100, titleFont50 } = theme.fonts;
  const { titleColor, primaryDark, available } = theme.colors;

  const { userData } = useUser();

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
        <Title font={titleFont100} color={titleColor} size={14}>
          {itemInfo.name.toUpperCase()}
        </Title>

        <Spacer height={5} />

        <Title font={titleFont50} color={titleColor} size={16}>
          <Span color={primaryDark}>$</Span>
          {itemInfo.price}
        </Title>

        <Info>
          <Title font={titleFont50} color={titleColor} size={16}>
            <Span color={available}>In stock</Span>
          </Title>
          <Favorite productInfo={itemInfo} />
        </Info>
      </ProductInformation>
    </Container>
  );
};
