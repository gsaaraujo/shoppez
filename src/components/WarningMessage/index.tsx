import React from 'react';

import { Container, Title } from './styles';

type Props = {
  title: string;
};

export const WarningMessage = ({ title }: Props) => {
  return (
    <Container>
      <Title>{title}</Title>
    </Container>
  );
};
