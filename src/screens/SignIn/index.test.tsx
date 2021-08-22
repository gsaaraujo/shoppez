import React from 'react';

import { theme } from '../../global/theme/styles';

import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { renderHook, act } from '@testing-library/react-hooks';
import '@testing-library/jest-native/extend-expect';

import { SignIn } from '.';
import { useAuth } from '../../hooks/useAuth';

jest.mock('@react-native-firebase/auth', () => {});
jest.mock('@react-native-google-signin/google-signin', () => {});

const mockedNavigate = jest.fn();

jest.mock('@react-navigation/native', () => {
  return {
    useNavigation: () => ({
      navigate: mockedNavigate,
    }),
  };
});

beforeEach(() => {
  mockedNavigate.mockClear();
});

it('should change border color on focus and on blur', async () => {
  const { getAllByTestId, toJSON } = render(<SignIn />);

  const credentialInput = getAllByTestId('CredentialInput');

  expect(credentialInput[0]).toBeTruthy();
  expect(credentialInput[1]).toBeTruthy();

  expect(credentialInput[0]).toHaveStyle({ borderColor: theme.colors.border });
  expect(credentialInput[1]).toHaveStyle({ borderColor: theme.colors.border });

  fireEvent(getAllByTestId('TextInput')[0], 'focus');
  fireEvent(getAllByTestId('TextInput')[1], 'focus');

  expect(credentialInput[0]).toHaveStyle({
    borderColor: theme.colors.primaryDark,
  });
  expect(credentialInput[1]).toHaveStyle({
    borderColor: theme.colors.primaryDark,
  });

  fireEvent(getAllByTestId('TextInput')[0], 'blur');
  fireEvent(getAllByTestId('TextInput')[1], 'blur');

  expect(credentialInput[0]).toHaveStyle({ borderColor: theme.colors.border });
  expect(credentialInput[1]).toHaveStyle({ borderColor: theme.colors.border });

  expect(toJSON()).toMatchSnapshot();
});

it('should change password visibility when hide/show eye icon is pressed', () => {
  const { getByTestId, getAllByTestId, toJSON, debug } = render(<SignIn />);

  const eyeIconButton = getByTestId('EyeIconButton');
  const credentialInput = getAllByTestId('TextInput');

  fireEvent.press(eyeIconButton);
  expect(credentialInput[1].props.secureTextEntry).toBeFalsy();

  fireEvent.press(eyeIconButton);
  expect(credentialInput[1].props.secureTextEntry).toBeTruthy();

  expect(toJSON()).toMatchSnapshot();
});

it('should show a warning message when login button is pressed with empty fields', () => {
  const { getByText, getAllByTestId, toJSON } = render(<SignIn />);

  const credentialInput = getAllByTestId('CredentialInput');
  const loginButton = getAllByTestId('Button');

  fireEvent.press(loginButton[0]);

  expect(credentialInput[0]).toHaveStyle({ borderColor: theme.colors.warning });
  expect(credentialInput[1]).toHaveStyle({ borderColor: theme.colors.warning });

  const warningMessage = getByText('Please all fields are required');
  expect(warningMessage).toBeTruthy();

  expect(toJSON()).toMatchSnapshot();
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

  const { getByText, getAllByTestId, toJSON } = render(<SignIn />);

  const loginButton = getAllByTestId('Button');
  const inputFields = getAllByTestId('TextInput');

  fireEvent.changeText(inputFields[0], fakeEmail);
  fireEvent.changeText(inputFields[1], fakePassword);
  fireEvent.press(loginButton[0]);

  await waitFor(() => {
    expect(result.current.handleEmailAndPasswordAuth).toBeCalledWith(
      fakeEmail,
      fakePassword,
    );
  });

  const warningMessage = getByText('Email or password invalid');
  expect(warningMessage).toBeTruthy();

  expect(toJSON()).toMatchSnapshot();
});

it('should go to Home screen when login button is pressed', async () => {
  const { result } = renderHook(() => useAuth());
  const fakeEmail = 'test';
  const fakePassword = '123';

  act(() => {
    result.current.handleEmailAndPasswordAuth = jest.fn(() =>
      Promise.resolve(0),
    );
  });

  const { getAllByTestId, toJSON } = render(<SignIn />);

  const inputFields = getAllByTestId('TextInput');
  const loginButton = getAllByTestId('Button');

  fireEvent.changeText(inputFields[0], fakeEmail);
  fireEvent.changeText(inputFields[1], fakePassword);
  fireEvent.press(loginButton[0]);

  await waitFor(() => {
    expect(result.current.handleEmailAndPasswordAuth).toBeCalledWith(
      fakeEmail,
      fakePassword,
    );
  });

  expect(toJSON()).toMatchSnapshot();
});

it('should go to Home screen when google button is pressed', async () => {
  const { result } = renderHook(() => useAuth());

  act(() => {
    result.current.handleSocialAuthGoogle = jest.fn();
  });

  const { getAllByTestId, toJSON } = render(<SignIn />);

  const googleButton = getAllByTestId('Button');

  fireEvent.press(googleButton[1]);

  await waitFor(() => {
    expect(result.current.handleSocialAuthGoogle).toBeCalledTimes(1);
  });

  expect(toJSON()).toMatchSnapshot();
});

it('should go to SignUp screen when (im a new user) button is pressed', () => {
  const { getByTestId, toJSON } = render(<SignIn />);

  const goToSignUpScreen = getByTestId('NavigationFooter');
  fireEvent.press(goToSignUpScreen);

  expect(mockedNavigate).toBeCalledTimes(1);

  expect(toJSON()).toMatchSnapshot();
});
