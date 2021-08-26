import React from 'react';
import { useNavigation } from '@react-navigation/native';

import ChevronLeftSvg from '../../assets/images/chevron-left.svg';

import { theme } from '../../global/theme/styles';
import { Favorite } from '../Favorite';

import { Container, Wrapper } from './styles';

type Props = {
  hasFavorite?: boolean;
};

export const HeaderNavigation = ({ hasFavorite = false }: Props) => {
  const { titleColor } = theme.colors;
  const navigation = useNavigation();

  return (
    <Container>
      <Wrapper hitSlop={50} onPress={() => navigation.goBack()}>
        <ChevronLeftSvg color={titleColor} />
      </Wrapper>
      {hasFavorite && <Favorite />}
    </Container>
  );
};
