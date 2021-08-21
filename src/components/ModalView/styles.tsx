import styled from 'styled-components/native';

import { theme } from '../../global/theme/styles';

type OverlayProps = {
  justifyContent?: string;
};

export const Container = styled.Modal``;

export const Overlay = styled.View<OverlayProps>`
  flex: 1;
  align-items: center;
  justify-content: ${props => props.justifyContent || 'flex-end'};
  background-color: ${theme.colors.overlay};
`;
