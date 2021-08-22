import React from 'react';

import { Container, Title, Span } from './styles';

type Props = {
  title: string;
  subtitle: string;
  textAlign?: string;
  handleOnPress: () => void;
};

export const NavigationFooter = ({
  title,
  subtitle,
  textAlign,
  handleOnPress,
}: Props) => {
  return (
    <Container
      testID={'NavigationFooter'}
      hitSlop={25}
      style={({ pressed }) => pressed && { opacity: 0.3 }}
      onPress={handleOnPress}>
      <Title textAlign={textAlign}>
        {title}
        <Span> {subtitle}</Span>
      </Title>
    </Container>
  );
};
