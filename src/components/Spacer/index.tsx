import React from 'react';

import { Container } from './styles';

type Props = {
  width?: number;
  height?: number;
};

export const Spacer = ({ width, height }: Props) => {
  return <Container width={width} height={height} />;
};
