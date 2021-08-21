import React, { useState } from 'react';
import { Keyboard } from 'react-native';

import { theme } from '../../global/theme/styles';

import { useAuth } from '../../hooks/useAuth';
import { useNavigation } from '@react-navigation/native';

import { Spacer } from '../../components/Spacer';
import { Button } from '../../components/Button';
import { WarningMessage } from '../../components/WarningMessage';
import { CredentialInput } from '../../components/CredentialInput';

import {
  Container,
  Header,
  Title,
  FormInput,
  WarningMessageContent,
  Footer,
  Span,
} from './styles';

export const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emptyFields, setEmptyFields] = useState<string[]>([]);
  const [warningMessages, setWarningMessages] = useState<string[]>([]);

  const { titleFont100, titleFont50 } = theme.fonts;
  const { titleColor, primaryDark } = theme.colors;

  const { isLoading, handleSocialAuthGoogle, handleEmailAndPasswordAuth } =
    useAuth();

  const navigation: any = useNavigation();

  const handleEmail = (email: string) => setEmail(email);
  const handlePassword = (password: string) => setPassword(password);

  const handleOnSubmit = async () => {
    let errorMessage: string[] = [];
    let whosIsEmpty: string[] = [];

    const isEmailEmpty = email.trim().length;
    const isPasswordEmpty = password.trim().length;

    const isFieldsEmpty = !(isEmailEmpty && isPasswordEmpty);

    if (isFieldsEmpty) {
      errorMessage.push('Please all fields are required');

      isEmailEmpty === 0 && whosIsEmpty.push('email');
      isPasswordEmpty === 0 && whosIsEmpty.push('password');
    } else {
      const errorLogin = await handleEmailAndPasswordAuth(email, password);

      errorLogin && errorMessage.push(errorLogin as string);
    }

    setEmptyFields(whosIsEmpty);
    setWarningMessages(errorMessage);
  };

  return (
    <Container onPress={() => Keyboard.dismiss()}>
      <Header>
        <Title font={titleFont100} color={titleColor} size={24}>
          Welcome,
        </Title>
        <Title font={titleFont50} color={titleColor} size={18}>
          Sign in to continue
        </Title>
      </Header>
      <FormInput>
        <CredentialInput
          testID='CredentialInputName'
          title='Email'
          value={email}
          isWarning={emptyFields.includes('email')}
          handleOnChangeText={handleEmail}
        />

        <Spacer height={25} />

        <CredentialInput
          testID='CredentialInputPassword'
          title='Password'
          value={password}
          hasIcon
          isWarning={emptyFields.includes('password')}
          handleOnChangeText={handlePassword}
        />

        <Title
          alignSelf='flex-end'
          font={titleFont100}
          color={primaryDark}
          size={12}>
          Forgot password?
        </Title>

        <WarningMessageContent>
          {warningMessages.map((message, index) => (
            <WarningMessage key={index} title={message} />
          ))}
        </WarningMessageContent>

        <Spacer height={35} />

        <Button
          testID='Button.Login'
          title='Login'
          isLoading={isLoading}
          handleOnPress={handleOnSubmit}
        />
        <Spacer height={10} />
        <Button
          title='Connect with Google'
          light
          isLoading={isLoading}
          handleOnPress={handleSocialAuthGoogle}
        />
        <Spacer height={10} />
      </FormInput>

      <Footer
        testID='Footer.Button'
        hitSlop={25}
        style={({ pressed }) => pressed && { opacity: 0.3 }}
        onPress={() => navigation.navigate('SignUp')}>
        <Title
          font={titleFont50}
          color={titleColor}
          size={18}
          alignSelf='center'>
          I'm a new user.<Span> Sign Up</Span>
        </Title>
      </Footer>
    </Container>
  );
};
