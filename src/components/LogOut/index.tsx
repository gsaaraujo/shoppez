import React from 'react';

import { theme } from '../../global/theme/styles';

import ExitSvg from '../../assets/images/x-circle.svg';

import { useAuth } from '../../hooks/useAuth';

import { Spacer } from '../Spacer';

import { Container, Wrapper, Title, Button, OptionsContent } from './styles';

type Props = {
  handleOnPress: () => void;
};

export const LogOut = ({ handleOnPress }: Props) => {
  const { titleColor, primaryDark, primaryLight, touchFeedBack } = theme.colors;

  const { handleLogOut } = useAuth();

  return (
    <Container>
      <Wrapper
        hitSlop={25}
        style={({ pressed }) => pressed && { opacity: 0.3 }}
        onPress={handleOnPress}>
        <ExitSvg color={primaryDark} />
      </Wrapper>

      <Title color={titleColor} size={16}>
        Would you like to leave?
      </Title>

      <Spacer height={40} />

      <OptionsContent>
        <Button
          backgroundColor={primaryLight}
          android_ripple={{ color: touchFeedBack }}
          onPress={handleLogOut}>
          <Title color={primaryDark} size={18}>
            Yes
          </Title>
        </Button>

        <Spacer height={40} />

        <Button
          backgroundColor={primaryDark}
          android_ripple={{ color: touchFeedBack }}
          onPress={handleOnPress}>
          <Title color={primaryLight} size={18}>
            No
          </Title>
        </Button>
      </OptionsContent>
    </Container>
  );
};
