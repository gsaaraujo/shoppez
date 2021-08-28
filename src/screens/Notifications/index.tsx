import React from 'react';

import RewardSvg from '../../assets/images/reward.svg';

import { Spacer } from '../../components/Spacer';

import {
  Container,
  Notification,
  Title,
  Subtitle,
  Wrapper,
  Info,
} from './styles';

export const Notifications = () => {
  return (
    <Container>
      <Spacer height={40} />

      <Notification>
        <Wrapper>
          <RewardSvg />
        </Wrapper>

        <Spacer height={20} />

        <Info>
          <Title>You just earn 5 reward points</Title>
          <Spacer height={10} />
          <Subtitle>Complete the challenge to get more</Subtitle>
        </Info>
      </Notification>
    </Container>
  );
};
