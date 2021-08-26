import React from 'react';

import { Container, Image } from './styles';

export const PaymentMethod = () => {
  const url = [
    require('../../assets/images/americanExpressFlag.png'),
    require('../../assets/images/masterCardFlag.png'),
    require('../../assets/images/paypalFlag.png'),
    require('../../assets/images/visaFlag.png'),
  ];

  return (
    <Container>
      {url.map(each => (
        <Image source={each} />
      ))}
    </Container>
  );
};
