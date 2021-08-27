import React from 'react';
import { FlatList } from 'react-native';

import SadHeartSvg from '../../assets/images/sad-heart.svg';

import { theme } from '../../global/theme/styles';
import { useUser } from '../../hooks/useUser';

import { Spacer } from '../../components/Spacer';
import { FavoriteItem } from '../../components/FavoriteItem';
import { SeparatorList } from '../../components/SeparatorList';

import { Container, Title, CenterMessage } from './styles';

export const Favorites = () => {
  const { userData } = useUser();

  const { subtitleFont } = theme.fonts;
  const { subtitleColor } = theme.colors;

  return (
    <Container>
      <Spacer height={40} />

      {userData.favorites.length === 0 ? (
        <CenterMessage>
          <Title font={subtitleFont} color={subtitleColor} size={18}>
            You haven't added to favorites yet
          </Title>

          <Spacer height={25} />

          <SadHeartSvg />
        </CenterMessage>
      ) : (
        <FlatList
          data={userData.favorites}
          keyExtractor={item => item.key}
          ItemSeparatorComponent={() => <SeparatorList />}
          renderItem={({ item }) => <FavoriteItem itemInfo={item} />}
        />
      )}
    </Container>
  );
};
