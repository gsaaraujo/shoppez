import React, { useEffect } from 'react';
import LottieView from 'lottie-react-native';

import { Container, Content, Wrapper, Title } from './styles';

type Props = {
  title: string;
};

export const SuccessCenterCard = ({ title }: Props) => {
  return (
    <Container>
      <Content>
        <Title>{title.toUpperCase()}</Title>

        <Wrapper>
          <LottieView
            source={require('../../assets/animation/check-square.json')}
            autoPlay
            loop={false}
            resizeMode='contain'
          />
        </Wrapper>
      </Content>
    </Container>
  );
};
