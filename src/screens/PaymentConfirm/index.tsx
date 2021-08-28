import React, { useState } from 'react';

import { useUser } from '../../hooks/useUser';
import { useNavigation } from '@react-navigation/native';

import { Spacer } from '../../components/Spacer';
import { Button } from '../../components/Button';
import { PaymentMethod } from '../../components/PaymentMethod';
import { TotalItemCount } from '../../components/TotalItemCount';
import { HeaderNavigation } from '../../components/HeaderNavigation';
import { SuccessCenterCard } from '../../components/SuccessCenterCard';

import { Container, Content, Title, Subtitle } from './styles';
import { ModalView } from '../../components/ModalView';

export const PaymentConfirm = ({ route }: any) => {
  const [modalVisibility, setModalVisibility] = useState(false);

  const paymentInfo = route.params;
  const navigation: any = useNavigation();
  const { userData, isLoading, handleAddToPurchaseHistory } = useUser();

  const handleGoToHome = () => {
    setModalVisibility(!modalVisibility);
    handleAddToPurchaseHistory(userData.shopping_cart);

    setTimeout(() => {
      navigation.navigate('Home');
    }, 3000);
  };

  return (
    <Container>
      <Content>
        <HeaderNavigation />

        <Spacer height={40} />

        <Title>Address</Title>
        <Spacer height={15} />
        <Subtitle>Hyule, Kakariko Village 64</Subtitle>

        <Spacer height={40} />
        <Title>Payment method</Title>
        <Spacer height={15} />

        <PaymentMethod />
      </Content>

      <TotalItemCount
        productQuantity={paymentInfo.quantity}
        productPriceSum={paymentInfo.price}
      />

      <Spacer height={40} />

      <Button
        title='Buy now'
        isLoading={isLoading}
        handleOnPress={handleGoToHome}
      />

      <ModalView isVisible={modalVisibility} justifyContent='center'>
        <SuccessCenterCard title='PAYMENT SUCCESSFULY DONE !' />
      </ModalView>

      <Spacer height={60} />
    </Container>
  );
};
