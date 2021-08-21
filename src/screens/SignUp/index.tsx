import React, { useState } from 'react';
import { Keyboard } from 'react-native';

import { useAuth } from '../../hooks/useAuth';
import { useNavigation } from '@react-navigation/native';

import { Spacer } from '../../components/Spacer';
import { Button } from '../../components/Button';
import { WarningMessage } from '../../components/WarningMessage';
import { CredentialInput } from '../../components/CredentialInput';
import { GreetingsHeader } from '../../components/GreetingsHeader';
import { NavigationFooter } from '../../components/NavigationFooter';

import { Container, FormInput, WarningMessageContent } from './styles';
import { ModalView } from '../../components/ModalView';
import { SuccessCenterCard } from '../../components/SuccessCenterCard';

export const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emptyFields, setEmptyFields] = useState<string[]>([]);
  const [warningMessages, setWarningMessages] = useState<string[]>([]);
  const [modalVisibility, setModalVisibility] = useState(false);

  const { isLoading, handlecreateUserWithEmailAndPassword } = useAuth();

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
      const error = await handlecreateUserWithEmailAndPassword(email, password);

      error
        ? errorMessage.push(error as string)
        : setModalVisibility(!modalVisibility);
    }

    setEmptyFields(whosIsEmpty);
    setWarningMessages(errorMessage);
  };

  const handleGoToSignIn = () => navigation.navigate('SignIn');

  const handleGoToSignInModal = () => {
    setModalVisibility(!modalVisibility);
    navigation.navigate('SignIn');
  };

  return (
    <Container onPress={() => Keyboard.dismiss()}>
      <GreetingsHeader
        title='Sign up to continue,'
        subtitle='It only takes a minute'
      />

      <FormInput>
        <CredentialInput
          testID='CredentialInputEmail'
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

        <Spacer height={15} />

        <WarningMessageContent>
          {warningMessages.map((message, index) => (
            <WarningMessage key={index} title={message} />
          ))}
        </WarningMessageContent>

        <Spacer height={35} />

        <Button
          testID='Button.Login'
          title='Create account'
          isLoading={isLoading}
          handleOnPress={handleOnSubmit}
        />
      </FormInput>

      <NavigationFooter
        testID={'Footer.Button'}
        title={`I’m already a user.`}
        subtitle='Sign In'
        textAlign='center'
        handleOnPress={handleGoToSignIn}
      />

      <ModalView isVisible={modalVisibility} justifyContent='center'>
        <SuccessCenterCard
          title='Your account has been successfully created'
          handleOnTimeOut={handleGoToSignInModal}
        />
      </ModalView>
    </Container>
  );
};
