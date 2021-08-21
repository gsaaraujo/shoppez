import React from 'react';

import { Container, Title, Span } from './styles';

type Props = {
  testID: string;
  title: string;
  subtitle: string;
  textAlign?: string;
  handleOnPress: () => void;
};

export const NavigationFooter = ({
  testID,
  title,
  subtitle,
  textAlign,
  handleOnPress,
}: Props) => {
  return (
    <Container
      testID={testID}
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
