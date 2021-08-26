import React, { useState, useEffect } from 'react';
import { FlatList } from 'react-native';

import SadCartSvg from '../../assets/images/sad-cart.svg';

import { theme } from '../../global/theme/styles';

import { useUser } from '../../hooks/useUser';
import { UserPreferences } from '../../context/userProvider';

import { Spacer } from '../../components/Spacer';
import { Button } from '../../components/Button';
import { ProductItem } from '../../components/ProductItem';
import { SeparatorList } from '../../components/SeparatorList';

import { Container, Title, CenterMessage } from './styles';
import { TotalItemCount } from '../../components/TotalItemCount';

export const ShoppingCart = () => {
  const [productPriceSum, setProductPriceSum] = useState(0);
  const [productQuantity, setProductQuantity] = useState(0);

  const { subtitleFont } = theme.fonts;
  const { subtitleColor } = theme.colors;

  const { userData, isLoading } = useUser();

  useEffect(() => {
    handleProductPriceSum(userData);
    handleProductQuantity(userData);
  }, [userData]);

  const handleProductPriceSum = (userData: UserPreferences) => {
    if (userData.shopping_cart.length != 0) {
      let sum = 0;
      userData.shopping_cart.forEach(
        each => (sum += Number(each.price) * each.quantity),
      );

      setProductPriceSum(sum);
    } else {
      setProductPriceSum(0);
    }
  };

  const handleProductQuantity = (userData: UserPreferences) => {
    if (userData.shopping_cart.length != 0) {
      let quantity = 0;
      userData.shopping_cart.forEach(each => (quantity += each.quantity));

      setProductQuantity(quantity);
    } else {
      setProductQuantity(0);
    }
  };

  return (
    <Container>
      <Spacer height={40} />

      {userData.shopping_cart.length == 0 ? (
        <CenterMessage>
          <Title font={subtitleFont} color={subtitleColor} size={18}>
            You haven't added to cart yet
          </Title>

          <Spacer height={25} />

          <SadCartSvg />
        </CenterMessage>
      ) : (
        <FlatList
          data={userData.shopping_cart}
          keyExtractor={item => item.key}
          renderItem={({ item }) => <ProductItem itemInfo={item} />}
          ItemSeparatorComponent={() => <SeparatorList />}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}

      <Spacer height={20} />

      <TotalItemCount
        productPriceSum={productPriceSum}
        productQuantity={productQuantity}
      />

      <Spacer height={40} />

      {userData.shopping_cart.length != 0 && (
        <Button
          title='Buy now'
          isLoading={isLoading}
          handleOnPress={() => {}}
        />
      )}

      <Spacer height={20} />
    </Container>
  );
};
