import React from 'react';

import { theme } from '../../global/theme/styles';

import { render, fireEvent } from '@testing-library/react-native';
import { renderHook, act } from '@testing-library/react-hooks';
import '@testing-library/jest-native/extend-expect';

import { SignUp } from '.';
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

jest.useFakeTimers();

it('should change border color on focus and on blur', async () => {
  const { getAllByTestId, toJSON } = render(<SignUp />);

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

it('should show a warning message when login button is pressed with empty fields', () => {
  const { getByText, getAllByTestId, toJSON } = render(<SignUp />);

  const credentialInput = getAllByTestId('CredentialInput');
  const loginButton = getAllByTestId('Button');

  fireEvent.press(loginButton[0]);

  expect(credentialInput[0]).toHaveStyle({ borderColor: theme.colors.warning });
  expect(credentialInput[1]).toHaveStyle({ borderColor: theme.colors.warning });

  const warningMessage = getByText('Please all fields are required');
  expect(warningMessage).toBeTruthy();

  expect(toJSON()).toMatchSnapshot();
});

describe('should show a warning message when one of the situations bellow occour', () => {
  it('Email address is already in use', async () => {
    const { result } = renderHook(() => useAuth());
    const fakeEmail = 'example@test.com';
    const fakePassword = 'test123';

    act(() => {
      result.current.handleCreateUserWithEmailAndPassword = jest.fn(() =>
        Promise.resolve('Email address is already in use'),
      );
    });

    const { getByText, getByTestId, getAllByTestId, toJSON } = render(
      <SignUp />,
    );

    const createAccountButton = getByTestId('Button');
    const inputFields = getAllByTestId('TextInput');

    fireEvent.changeText(inputFields[0], fakeEmail);
    fireEvent.changeText(inputFields[1], fakePassword);

    await act(async () => {
      fireEvent.press(createAccountButton);
    });

    const warningMessage = getByText('Email address is already in use');
    expect(warningMessage).toBeTruthy();

    expect(toJSON()).toMatchSnapshot();
  });

  it('Email address is invalid', async () => {
    const { result } = renderHook(() => useAuth());
    const fakeEmail = 'example@test.com';
    const fakePassword = 'test123';

    act(() => {
      result.current.handleCreateUserWithEmailAndPassword = jest.fn(() =>
        Promise.resolve('Email address is invalid'),
      );
    });

    const { getByText, getByTestId, getAllByTestId, toJSON } = render(
      <SignUp />,
    );

    const createAccountButton = getByTestId('Button');
    const inputFields = getAllByTestId('TextInput');

    fireEvent.changeText(inputFields[0], fakeEmail);
    fireEvent.changeText(inputFields[1], fakePassword);

    await act(async () => {
      fireEvent.press(createAccountButton);
    });

    const warningMessage = getByText('Email address is invalid');
    expect(warningMessage).toBeTruthy();

    expect(toJSON()).toMatchSnapshot();
  });

  it('The password is not strong enough', async () => {
    const { result } = renderHook(() => useAuth());
    const fakeEmail = 'example@test.com';
    const fakePassword = 'test123';

    act(() => {
      result.current.handleCreateUserWithEmailAndPassword = jest.fn(() =>
        Promise.resolve('The password is not strong enough'),
      );
    });

    const { getByText, getByTestId, getAllByTestId, toJSON } = render(
      <SignUp />,
    );

    const createAccountButton = getByTestId('Button');
    const inputFields = getAllByTestId('TextInput');

    fireEvent.changeText(inputFields[0], fakeEmail);
    fireEvent.changeText(inputFields[1], fakePassword);

    await act(async () => {
      fireEvent.press(createAccountButton);
    });

    const warningMessage = getByText('The password is not strong enough');
    expect(warningMessage).toBeTruthy();

    expect(toJSON()).toMatchSnapshot();
  });
});
