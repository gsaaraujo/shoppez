import React, { useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';

import storage from '@react-native-firebase/storage';
import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';

import { useUser } from '../../hooks/useUser';
import { AppProductType } from '../../context/userProvider';

import { Spacer } from '../Spacer';
import { Favorite } from '../Favorite';

import { theme } from '../../global/theme/styles';

import {
  Container,
  Title,
  Span,
  Wrapper,
  ProductImage,
  Offer,
  Image,
} from './styles';

type Props = {
  productInfo: AppProductType;
  handleOnPress: (productDetails: AppProductType) => void;
};

export const Product = ({ productInfo, handleOnPress }: Props) => {
  const [imageUri, setImageUri] = useState('');

  const { titleColor, primaryDark, primaryBlank } = theme.colors;
  const { titleFont100, titleFont50 } = theme.fonts;

  useEffect(() => {
    const handleImage = async () => {
      setImageUri(productInfo.types[0]);
    };

    handleImage();
  }, []);

  return (
    <Container onPress={() => handleOnPress(productInfo)}>
      <Spacer height={45} />

      <Wrapper>
        <Favorite />
      </Wrapper>

      {!!productInfo.offer && (
        <Offer>
          <Title font={titleFont100} color={primaryBlank} size={14}>
            {productInfo.offer}% OFF
          </Title>
        </Offer>
      )}

      <ProductImage>
        {imageUri ? (
          <Image source={{ uri: productInfo.types[0] }} resizeMode='contain' />
        ) : (
          <ActivityIndicator color={primaryDark} size='large' />
        )}
      </ProductImage>

      <Spacer height={35} />

      <Title font={titleFont100} color={titleColor} size={14}>
        {productInfo.name.toUpperCase()}
      </Title>

      <Spacer height={22} />

      <Title font={titleFont50} color={titleColor} size={16}>
        <Span>$</Span>
        {productInfo.price}
      </Title>
    </Container>
  );
};
