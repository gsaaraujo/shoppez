import React from 'react';
import {
  AppProductType,
  ShoppingCartType,
  PurchaseHistoryType,
} from '../../context/userProvider';

import { Swipeable, PanGestureHandler } from 'react-native-gesture-handler';

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
import { SwipeToDelete } from '../SwipeToDelete';

type Props = {
  itemInfo: ShoppingCartType | PurchaseHistoryType;
  onSwipe: (removeID: string) => void;
};

export const ProductItem = ({ itemInfo, onSwipe }: Props) => {
  const { titleFont100, titleFont50 } = theme.fonts;
  const {} = theme.colors;

  return (
    <Swipeable
      renderRightActions={() => (
        <SwipeToDelete itemID={itemInfo.key} onSwipe={onSwipe} />
      )}
      overshootFriction={8}
      friction={2}>
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
    </Swipeable>
  );
};
