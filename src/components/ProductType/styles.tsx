import styled from 'styled-components/native';

type ContainerProps = {
  borderColor: string;
};

export const Container = styled.Pressable<ContainerProps>`
  width: 100%;
  width: 50px;
  height: 50px;
  border-radius: 10px;
  align-items: center;
  border: 1.5px solid ${props => props.borderColor};
  justify-content: space-evenly;
`;

export const Image = styled.Image`
  width: 50px;
  height: 50px;
`;
