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

      await auth().signInWithCredential(googleCredential);
      setIsLoading(true);
    } catch (error) {
      Alert.alert(
        'Sorry for the inconvenience',
        'Failed to Login, please try again later',
      );

      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, handleSocialAuthGoogle }}>
      {children}
    </AuthContext.Provider>
  );
};
