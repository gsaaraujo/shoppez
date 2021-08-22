import React from 'react';

import { theme } from '../../global/theme/styles';

import { SvgProps } from 'react-native-svg';

import { Container } from './styles';

type Props = {
  icon: React.FC<SvgProps>;
  focused: boolean;
};

export const TabBarIcon = ({ icon: IconSvg, focused }: Props) => {
  const { titleColor, primaryDark, primaryBlank, background } = theme.colors;

  return (
    <Container backgroundColor={focused ? primaryDark : background}>
      <IconSvg stroke={focused ? primaryBlank : titleColor} />
    </Container>
  );
};
