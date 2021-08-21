import React from 'react';

import { theme } from '../../global/theme/styles';

import { Container, Title } from './styles';

type Props = {
  title: string;
  subtitle: string;
};

export const GreetingsHeader = ({ title, subtitle }: Props) => {
  const { titleFont100, titleFont50 } = theme.fonts;

  return (
    <Container>
      <Title font={titleFont100} size={24}>
        {title}
      </Title>
      <Title font={titleFont50} size={18}>
        {subtitle}
      </Title>
    </Container>
  );
};
