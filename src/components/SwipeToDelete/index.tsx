import React from 'react';
import { ActivityIndicator } from 'react-native';

import TrashSvg from '../../assets/images/trash.svg';

import { theme } from '../../global/theme/styles';
import { useUser } from '../../hooks/useUser';

import { Container, Box } from './styles';

type Props = {
  itemID: string;
  onSwipe: (removeID: string) => void;
};

export const SwipeToDelete = ({ itemID, onSwipe }: Props) => {
  const { primaryDark, primaryBlank } = theme.colors;
  const { isLoading, handleRemoveFromShoppingCart } = useUser();

  return (
    <Container>
      <Box
        style={({ pressed }) => pressed && { opacity: 0.3 }}
        onPress={() => onSwipe(itemID)}
        disabled={isLoading}>
        {isLoading ? (
          <ActivityIndicator color={primaryBlank} size='large' />
        ) : (
          <TrashSvg color={primaryBlank} />
        )}
      </Box>
    </Container>
  );
};
