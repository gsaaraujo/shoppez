import { TextInput } from 'react-native';
import styled from 'styled-components/native';

import { theme } from '../../global/theme/styles';

type TitleProps = {
  font: string;
  color: string;
  size: number;
  alignSelf?: string;
};

export const Container = styled.Pressable`
  flex: 1;
  padding-left: 20px;
  padding-right: 20px;
  background-color: ${theme.colors.background};
`;

export const Title = styled.Text<TitleProps>`
  color: ${theme.colors.titleColor};
  font-size: ${props => props.size}px;
  font-family: ${props => props.font};
  align-self: ${props => props.alignSelf || 'flex-start'};
`;

export const Header = styled.View`
  width: 100%;
  flex-direction: row;
`;

export const SearchInputContent = styled.View`
  flex: 1;
  justify-content: center;
`;

export const SearchIcon = styled.View`
  position: absolute;
  z-index: 1;
  padding-left: 10px;
`;

export const SearchInput = styled.TextInput.attrs<TextInput>({
  placeholder: 'Search products',
  placeholderTextColor: theme.colors.titleColor,
  maxLength: 40,
})`
  width: 100%;
  padding-left: 45px;
  border-radius: 20px;
  color: ${theme.colors.titleColor};
  background-color: ${theme.colors.primaryLight};
`;

export const Profile = styled.Pressable`
  width: 50px;
  height: 50px;
  margin-left: 10px;
  align-items: center;
  justify-content: center;
`;

export const ProfileImage = styled.Image`
  width: 50px;
  height: 50px;
  border-radius: 25px;
`;

export const LoadingFlatlist = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;
