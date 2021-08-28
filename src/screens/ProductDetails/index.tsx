import React, { useState, useEffect } from 'react';
import { ActivityIndicator, StatusBar } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import storage from '@react-native-firebase/storage';

import { theme } from '../../global/theme/styles';

import RatingSvg from '../../assets/images/rating.svg';

import { useUser } from '../../hooks/useUser';

import { Spacer } from '../../components/Spacer';
import { Button } from '../../components/Button';
import { ProductType } from '../../components/ProductType';
import { AvailableSize } from '../../components/AvailableSize';
import { QuantitySelect } from '../../components/QuantitySelect';
import { HeaderNavigation } from '../../components/HeaderNavigation';

import {
  Container,
  Content,
  Title,
  Subtitle,
  Span,
  ProductImage,
  Image,
  TypesContent,
  Info,
  DetailedInfo,
  SizesContent,
} from './styles';

export const ProductDetails = ({ route }: any) => {
  const { productDetails } = route.params;

  const [typeSelected, setTypeSelected] = useState(productDetails.types[0]);
  const [sizeSelected, setSizeSelected] = useState(productDetails.sizes[0]);
  const [quantitySelected, setQuantitySelected] = useState(1);

  const { titleFont100, titleFont50, subtitleFont } = theme.fonts;
  const { titleColor, subtitleColor, primaryDark, primaryLight, available } =
    theme.colors;

  const navigation: any = useNavigation();
  const { isLoading, handleAddToShoppingCart } = useUser();

  useEffect(() => {
    productDetails.quantity = quantitySelected;
  }, [quantitySelected]);

  const handleTypeSelected = (type: string) => setTypeSelected(type);
  const handleSizeSelected = (size: string) => setSizeSelected(size);

  const handleQuantitySelected = (quantity: number) =>
    setQuantitySelected(quantity);

  const handleGoBack = () =>
    navigation.navigate('BottomTab', { screen: 'ShoppingCart' });

  const handleGoToPaymentConfirm = () =>
    navigation.navigate('PaymentConfirm', {
      quantity: quantitySelected,
      price: productDetails.price * quantitySelected,
    });

  return (
    <Container>
      <Content showsVerticalScrollIndicator={false} style={{ zIndex: -1 }}>
        <HeaderNavigation />

        <ProductImage>
          <Image
            source={{ uri: typeSelected || productDetails.types[0] }}
            resizeMode='contain'
          />
        </ProductImage>

        <TypesContent>
          {productDetails.types.map((image: string, index: number) => (
            <ProductType
              key={index}
              imageUri={image}
              isSelected={image === typeSelected}
              handleOnPress={handleTypeSelected}
            />
          ))}
        </TypesContent>

        <Spacer height={60} />

        <Info>
          <DetailedInfo>
            <Title font={titleFont50} color={titleColor} size={18}>
              {productDetails.name.toUpperCase()}
            </Title>
            <Spacer height={15} />
            <Title font={titleFont100} color={available} size={16}>
              In stock
            </Title>
          </DetailedInfo>

          <DetailedInfo>
            <Title
              font={titleFont50}
              color={titleColor}
              size={20}
              alignSelf='flex-end'>
              <Span>$</Span>
              {productDetails.price}
            </Title>
            <Spacer height={5} />
            <RatingSvg style={{ alignSelf: 'flex-end' }} />
            <Spacer height={15} />
            <Title
              font={titleFont100}
              color={primaryDark}
              size={16}
              alignSelf='flex-end'>
              Payment methods
            </Title>
          </DetailedInfo>
        </Info>

        <Spacer height={40} />

        <Title font={titleFont100} color={titleColor} size={16}>
          Available sizes
        </Title>

        <Spacer height={15} />

        <SizesContent>
          {productDetails.sizes.map((size: string, index: number) => (
            <AvailableSize
              key={index}
              title={size}
              isSelected={size === sizeSelected}
              handleOnPress={handleSizeSelected}
            />
          ))}
        </SizesContent>

        <Spacer height={40} />
        <Title font={titleFont100} color={titleColor} size={16}>
          Description
        </Title>

        <Spacer height={15} />
        <Subtitle>{productDetails.description}</Subtitle>
        <Spacer height={40} />

        <Title font={titleFont100} color={titleColor} size={16}>
          Arives in
        </Title>

        <Spacer height={15} />
        <Subtitle>Aug 30 - Sep 9</Subtitle>
        <Spacer height={40} />

        <Title font={titleFont100} color={titleColor} size={16}>
          Quantity
        </Title>
        <Spacer height={15} />

        <QuantitySelect
          quantity={quantitySelected}
          handleOnPress={handleQuantitySelected}
        />

        <Spacer height={40} />

        <Button
          title='Add to cart'
          light
          isLoading={isLoading}
          handleOnPress={() => {
            handleAddToShoppingCart(productDetails);
            handleGoBack();
          }}
        />
        <Spacer height={15} />
        <Button
          title='Buy now'
          isLoading={isLoading}
          handleOnPress={() => {
            handleAddToShoppingCart(productDetails);
            handleGoToPaymentConfirm();
          }}
        />

        <Spacer height={40} />
      </Content>
    </Container>
  );
};
