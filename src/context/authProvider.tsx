import React, { useState, useEffect, createContext, ReactNode } from 'react';

import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { Alert } from 'react-native';

type Props = {
  children: ReactNode;
};

type User = {
  photoURL: string | null;
};

type Data = {
  user: User;
  isLoading: boolean;
  handleSocialAuthGoogle: () => void;
  handleEmailAndPasswordAuth: (
    email: string,
    password: string,
  ) => Promise<string | number>;
};

export const AuthContext = createContext<Data>({} as Data);

export const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useState<User>({} as User);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    handleOnAuthStateChange();
  }, [isLoading]);

  const handleOnAuthStateChange = () => {
    const unsubscribe = auth().onAuthStateChanged(user => {
      if (user) {
        setUser(user);
      }
    });

    return unsubscribe();
  };

  const handleSocialAuthGoogle = async () => {
    GoogleSignin.configure({
      webClientId:
        '105666275734-ks7enl7id3l46kq8dfujlrqtbmvbu90q.apps.googleusercontent.com',
    });

    try {
      const { idToken } = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      setIsLoading(true);
      await auth().signInWithCredential(googleCredential);
    } catch (error) {
      Alert.alert(
        'Sorry for the inconvenience',
        'Failed to Login, please try again later',
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailAndPasswordAuth = async (
    email: string,
    password: string,
  ): Promise<string | number> => {
    try {
      setIsLoading(true);
      await auth().signInWithEmailAndPassword(email, password);
    } catch (error) {
      return 'Email or password invalid';
    } finally {
      setIsLoading(false);
    }
    return 0;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        handleSocialAuthGoogle,
        handleEmailAndPasswordAuth,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
