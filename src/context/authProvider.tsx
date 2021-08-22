import React, { useState, useEffect, createContext, ReactNode } from 'react';

import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { Alert } from 'react-native';

type Props = {
  children: ReactNode;
};

type Data = {
  user: FirebaseAuthTypes.User | null;
  isLoading: boolean;
  handleSocialAuthGoogle: () => void;
  handleEmailAndPasswordAuth: (
    email: string,
    password: string,
  ) => Promise<string | number>;
  handleCreateUserWithEmailAndPassword: (
    email: string,
    password: string,
  ) => Promise<string | number>;
  handleLogOut: () => void;
};

export const AuthContext = createContext<Data>({} as Data);

export const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleOnAuthStateChange = (user: FirebaseAuthTypes.User | null) => {
    setUser(user);
    setIsLoading(false);
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(handleOnAuthStateChange);
    return subscriber;
  }, []);

  const handleSocialAuthGoogle = async () => {
    setIsLoading(true);

    GoogleSignin.configure({
      webClientId:
        '105666275734-ks7enl7id3l46kq8dfujlrqtbmvbu90q.apps.googleusercontent.com',
    });

    try {
      const { idToken } = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      await auth().signInWithCredential(googleCredential);
    } catch (error) {
      Alert.alert(
        'Sorry for the inconvenience',
        'Failed to login, please try again later',
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailAndPasswordAuth = async (
    email: string,
    password: string,
  ): Promise<string | number> => {
    setIsLoading(true);

    try {
      await auth().signInWithEmailAndPassword(email, password);
    } catch (error) {
      return 'Email or password invalid';
    } finally {
      setIsLoading(false);
    }
    return 0;
  };

  const handleCreateUserWithEmailAndPassword = async (
    email: string,
    password: string,
  ): Promise<string | number> => {
    setIsLoading(true);

    try {
      await auth().createUserWithEmailAndPassword(email, password);
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        return 'Email address is already in use';
      }

      if (error.code === 'auth/invalid-email') {
        return 'Email address is invalid';
      }

      if (error.code === 'auth/weak-password') {
        return 'The password is not strong enough';
      }

      return 'Failed to sign up, please try again later';
    } finally {
      setIsLoading(false);
    }
    return 0;
  };

  const handleLogOut = async () => {
    setIsLoading(true);

    try {
      await auth().signOut();
    } catch (error) {
      Alert.alert(
        'Sorry for the inconvenience',
        'Failed to login, please try again later',
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        handleSocialAuthGoogle,
        handleEmailAndPasswordAuth,
        handleCreateUserWithEmailAndPassword,
        handleLogOut,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
