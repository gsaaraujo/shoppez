import React, { useState, useRef } from 'react';
import { Animated } from 'react-native';

import LottieView from 'lottie-react-native';

import { theme } from '../../global/theme/styles';

import { Container } from './styles';

export const Favorite = () => {
  const [hasFavorite, setHasFavorite] = useState(false);

  const progress = useRef(new Animated.Value(0)).current;

  const {} = theme.fonts;
  const {} = theme.colors;

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
    <Container hitSlop={50} onPress={handleFavoriteAnimation}>
      <LottieView
        source={require('../../assets/animation/favorite.json')}
        progress={progress}
      />
    </Container>
  );
};
