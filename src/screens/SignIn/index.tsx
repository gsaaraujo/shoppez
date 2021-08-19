import React, { useState } from 'react';
import { Keyboard } from 'react-native';

import { theme } from '../../global/theme/styles';

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
  const { titleColor, primaryDark, border, warning, touchFeedBack } =
    theme.colors;

  const handleEmail = (email: string) => setEmail(email);
  const handlePassword = (password: string) => setPassword(password);

  const handleOnSubmit = () => {
    let errorMessage: string[] = [];
    let whosIsEmpty: string[] = [];

    const isEmailEmpty = email.trim().length;
    const isPasswordEmpty = password.trim().length;

    const isFieldsEmpty = !(isEmailEmpty && isPasswordEmpty);

    if (isFieldsEmpty) {
      errorMessage.push('Please all fields are required');

      isEmailEmpty === 0 && whosIsEmpty.push('email');
      isPasswordEmpty === 0 && whosIsEmpty.push('password');
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
          title='Email'
          value={email}
          isWarning={emptyFields.includes('email')}
          handleOnChangeText={handleEmail}
        />

        <Spacer height={25} />

        <CredentialInput
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

        <Button title='Login' handleOnPress={handleOnSubmit} />
        <Spacer height={10} />
        <Button title='Connect with Google' light handleOnPress={() => {}} />
        <Spacer height={10} />
        <Button title='Connect with Facebook' light handleOnPress={() => {}} />
      </FormInput>

      <Footer hitSlop={25} style={({ pressed }) => pressed && { opacity: 0.3 }}>
        <Title
          font={titleFont50}
          color={titleColor}
          size={18}
          alignSelf='center'>
          I'm a new user. <Span>Sign Up</Span>
        </Title>
      </Footer>
    </Container>
  );
};
