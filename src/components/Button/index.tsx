import React from 'react';
import { ActivityIndicator } from 'react-native';

import { theme } from '../../global/theme/styles';

import { Container, Title } from './styles';

type Props = {
  testID?: string;
  title: string;
  light?: boolean;
  isLoading?: boolean;
  handleOnPress: () => void;
};

export const Button = ({
  testID,
  title,
  light = false,
  isLoading = false,
  handleOnPress,
}: Props) => {
  const { primaryDark, primaryLight, touchFeedBack } = theme.colors;

  return (
    <Container
      testID={testID}
      android_ripple={{ color: touchFeedBack }}
      backgroundColor={light ? primaryLight : primaryDark}
      disabled={isLoading}
      onPress={handleOnPress}>
      {isLoading ? (
        <ActivityIndicator
          color={light ? primaryDark : primaryLight}
          size='large'
        />
      ) : (
        <Title color={light ? primaryDark : primaryLight}>{title}</Title>
      )}
    </Container>
  );
};
