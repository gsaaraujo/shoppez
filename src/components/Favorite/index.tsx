import React, { useState, useRef } from 'react';
import { Animated } from 'react-native';

import LottieView from 'lottie-react-native';

import { theme } from '../../global/theme/styles';
import { useUser } from '../../hooks/useUser';

import { Container } from './styles';
import { useEffect } from 'react';
import { AppProductType } from '../../context/userProvider';

type Props = {
  productInfo: AppProductType;
};

export const Favorite = ({ productInfo }: Props) => {
  const [animatedValue, setAnimatedValue] = useState(0);
  const [hasFavorite, setHasFavorite] = useState(false);

  const { userData, handleFavorite } = useUser();

  const progress = useRef(new Animated.Value(0));

  useEffect(() => {
    if (userData.favorites) {
      const exists = userData.favorites.find(
        each => each.key === productInfo.key,
      );

      const value = exists ? 1 : 0;

      progress.current = new Animated.Value(value);
      setHasFavorite(!!value);
    }
  }, [userData]);

  const handleFavoriteAnimation = () => {
    const newValue = hasFavorite ? 0 : 1;

    Animated.timing(progress.current, {
      toValue: newValue,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    setHasFavorite(!hasFavorite);
  };

  return (
    <Container
      hitSlop={50}
      onPress={() => {
        handleFavoriteAnimation(), handleFavorite(productInfo);
      }}>
      <LottieView
        source={require('../../assets/animation/favorite.json')}
        progress={progress.current}
      />
    </Container>
  );
};
