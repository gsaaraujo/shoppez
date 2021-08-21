import styled from 'styled-components/native';

type TitleProps = {
  font: string;
  color: string;
  size: number;
  alignSelf?: string;
};

export const Container = styled.Pressable`
  flex: 1;
  padding: 110px 40px 64px;
  justify-content: space-between;
`;

export const Title = styled.Text<TitleProps>`
  color: ${props => props.color};
  font-size: ${props => props.size}px;
  font-family: ${props => props.font};
  align-self: ${props => props.alignSelf || 'flex-start'};
`;

export const FormInput = styled.View`
  width: 100%;
`;

export const WarningMessageContent = styled.View`
  width: 100%;
  height: 40px;
`;
