import React, { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Animated } from 'react-native';

import LottieView from 'lottie-react-native';

import storage from '@react-native-firebase/storage';
import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';

import { theme } from '../../global/theme/styles';
import { Spacer } from '../Spacer';

import {
  Container,
  Title,
  Span,
  WrapperIcon,
  ProductImage,
  Offer,
  Image,
} from './styles';

type Props = {
  productInfo: FirebaseFirestoreTypes.DocumentData;
};

export const Product = ({ productInfo }: Props) => {
  const [hasFavorite, setHasFavorite] = useState(false);
  const [imageUri, setImageUri] = useState('');

  const { titleColor, primaryDark, primaryBlank } = theme.colors;
  const { titleFont100, titleFont50 } = theme.fonts;

  useEffect(() => {
    const handleImage = async () => {
      const reference = storage().ref(productInfo.types[0]);

      try {
        const uri = await reference.getDownloadURL();

        setImageUri(uri);
      } catch (error) {}
    };

    handleImage();
  }, []);

  const progress = useRef(new Animated.Value(0)).current;

  const handleFavoriteAnimation = () => {
    const newValue = hasFavorite ? 0 : 1;

    Animated.timing(progress, {
      toValue: newValue,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    setHasFavorite(!hasFavorite);
  };

  return (
    <Container>
      <Spacer height={45} />

      <WrapperIcon onPress={handleFavoriteAnimation}>
        <LottieView
          source={require('../../assets/animation/favorite.json')}
          progress={progress}
        />
      </WrapperIcon>

      {!!productInfo.offer && (
        <Offer>
          <Title font={titleFont100} color={primaryBlank} size={14}>
            {productInfo.offer}% OFF
          </Title>
        </Offer>
      )}

      <ProductImage>
        {imageUri ? (
          <Image source={{ uri: imageUri }} resizeMode='contain' />
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
