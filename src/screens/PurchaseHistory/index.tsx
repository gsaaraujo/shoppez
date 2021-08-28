import React from 'react';
import { FlatList } from 'react-native';

import { theme } from '../../global/theme/styles';

import { useUser } from '../../hooks/useUser';

import SadBagSvg from '../../assets/images/sad-bag.svg';

import { Spacer } from '../../components/Spacer';
import { ProductItem } from '../../components/ProductItem';
import { SeparatorList } from '../../components/SeparatorList';

import { Container, CenterMessage, Title } from './styles';

export const PurchaseHistory = () => {
  const { subtitleFont } = theme.fonts;
  const { subtitleColor } = theme.colors;

  const { userData, handleRemoveFromPurchaseHistory } = useUser();

  return (
    <Container>
      <Spacer height={40} />

      {userData.purchase_history.length == 0 ? (
        <CenterMessage>
          <Title font={subtitleFont} color={subtitleColor} size={18}>
            You haven't added to cart yet
          </Title>

          <Spacer height={25} />

          <SadBagSvg />
        </CenterMessage>
      ) : (
        <FlatList
          data={userData.purchase_history}
          keyExtractor={item => item.key}
          renderItem={({ item }) => (
            <ProductItem
              itemInfo={item}
              onSwipe={handleRemoveFromPurchaseHistory}
            />
          )}
          ItemSeparatorComponent={() => <SeparatorList />}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}
    </Container>
  );
};
