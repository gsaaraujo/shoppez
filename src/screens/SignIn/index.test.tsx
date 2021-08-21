import React from 'react';

import { theme } from '../../global/theme/styles';

import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { renderHook, act } from '@testing-library/react-hooks';
import '@testing-library/jest-native/extend-expect';

import { SignIn } from '.';
import { useAuth } from '../../hooks/useAuth';

const mockedNavigate = jest.fn();

jest.mock('@react-native-firebase/auth', () => {});
jest.mock('@react-native-google-signin/google-signin', () => {});

jest.mock('@react-navigation/native', () => {
  return {
    useNavigation: () => ({
      navigate: mockedNavigate,
    }),
  };
});

it('should change border color on focus and on blur', async () => {
  const { getByTestId, getAllByTestId, toJSON } = render(<SignIn />);

  const emailField = getByTestId('CredentialInputName');
  const passwordField = getByTestId('CredentialInputPassword');

  expect(emailField).toBeTruthy();
  expect(passwordField).toBeTruthy();

  expect(emailField).toHaveStyle({ borderColor: theme.colors.border });
  expect(passwordField).toHaveStyle({ borderColor: theme.colors.border });

  fireEvent(getAllByTestId('TextInput')[0], 'focus');
  fireEvent(getAllByTestId('TextInput')[1], 'focus');

  expect(emailField).toHaveStyle({ borderColor: theme.colors.primaryDark });
  expect(passwordField).toHaveStyle({ borderColor: theme.colors.primaryDark });

  fireEvent(getAllByTestId('TextInput')[0], 'blur');
  fireEvent(getAllByTestId('TextInput')[1], 'blur');

  expect(emailField).toHaveStyle({ borderColor: theme.colors.border });
  expect(passwordField).toHaveStyle({ borderColor: theme.colors.border });
});

it('should show a warning message when login with field empty', () => {
  const { getByText, getByTestId, toJSON } = render(<SignIn />);

  const emailField = getByTestId('CredentialInputName');
  const passwordField = getByTestId('CredentialInputPassword');
  const loginButton = getByTestId('Button.Login');

  fireEvent.press(loginButton);

  expect(emailField).toHaveStyle({ borderColor: theme.colors.warning });
  expect(passwordField).toHaveStyle({ borderColor: theme.colors.warning });

  const warningMessage = getByText('Please all fields are required');
  expect(warningMessage).toBeTruthy();
});

it('should show a warning message when email/password is invalid', async () => {
  const { result } = renderHook(() => useAuth());
  const fakeEmail = 'test';
  const fakePassword = '123';

  act(() => {
    result.current.handleEmailAndPasswordAuth = jest.fn(() =>
      Promise.resolve('Email or password invalid'),
    );
  });

  const { getByText, getByTestId, getAllByTestId, toJSON } = render(<SignIn />);

  const loginButton = getByTestId('Button.Login');
  const inputFields = getAllByTestId('TextInput');

  fireEvent.changeText(inputFields[0], fakeEmail);
  fireEvent.changeText(inputFields[1], fakePassword);
  fireEvent.press(loginButton);

  await waitFor(() => {
    expect(result.current.handleEmailAndPasswordAuth).toBeCalledWith(
      fakeEmail,
      fakePassword,
    );
  });

  const warningMessage = getByText('Email or password invalid');
  expect(warningMessage).toBeTruthy();
});

it('should go to SignUp screen when button is pressed', () => {
  const { getByTestId, toJSON } = render(<SignIn />);

  const goToSignUpScreen = getByTestId('Footer.Button');
  fireEvent.press(goToSignUpScreen);

  expect(mockedNavigate).toBeCalledTimes(1);
});
