import React, { useState, useEffect, createContext, ReactNode } from 'react';

import storage from '@react-native-firebase/storage';
import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';

import { useAuth } from '../hooks/useAuth';
import { firebase } from '@react-native-firebase/auth';
import { Alert } from 'react-native';

export type AppProductType = {
  key: string;
  name: string;
  category: string;
  price: string;
  description: string;
  offer: string;
  color: string;
  sizes: string[];
  types: string[];
};

export type ShoppingCartType = AppProductType & {
  quantity: number;
};

export type PurchaseHistoryType = AppProductType & {
  quantity: number;
};

export type UserPreferences = {
  name: string;
  favorites: string[];
  shopping_cart: ShoppingCartType[];
  purchase_history: PurchaseHistoryType[];
};

type ContextData = {
  userData: UserPreferences;
  isLoading: boolean;
  handleAddToShoppingCart: (newCart: ShoppingCartType) => void;
  handleAddToPurchaseHistory: (newProducts: ShoppingCartType[]) => void;
};

type Props = {
  children: ReactNode;
};

export const UserContext = createContext<ContextData>({} as ContextData);

export const UserProvider = ({ children }: Props) => {
  const [userData, setUserData] = useState<UserPreferences>(
    {} as UserPreferences,
  );
  const [isLoading, setIsLoading] = useState(false);

  const { user } = useAuth();

  useEffect(() => {
    const handleCreateUser = async () => {
      const getUser = await firestore()
        .collection('Users')
        .doc(user?.uid)
        .get();

      if (!getUser.exists) {
        firestore()
          .collection('Users')
          .doc(user?.uid)
          .set({
            name: user?.displayName,
            favorites: [],
            shopping_cart: [],
            purchase_history: [],
          })
          .then(() => {
            handleUserData();
          });
      }
    };
    handleCreateUser();
  }, []);

  useEffect(() => {
    handleUserData();
  }, [isLoading]);

  const handleUserData = async () => {
    try {
      const userDocument = await firestore()
        .collection('Users')
        .doc(user?.uid)
        .get();

      if (userDocument.exists) {
        setUserData(userDocument.data() as UserPreferences);
      }
    } catch (error) {
      Alert.alert('Sorry for the inconvenience', 'Please try again later');
    }
  };

  const handleAddToShoppingCart = async (newCart: ShoppingCartType) => {
    setIsLoading(true);

    try {
      await firestore()
        .collection('Users')
        .doc(user?.uid)
        .update({
          shopping_cart: firebase.firestore.FieldValue.arrayUnion(newCart),
        });
    } catch (error) {
      Alert.alert('Sorry for the inconvenience', 'Please try again later');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddToPurchaseHistory = async (
    newProducts: ShoppingCartType[],
  ) => {
    setIsLoading(true);
    try {
      const userDocument = await firestore()
        .collection('Users')
        .doc(user?.uid)
        .get();

      const purchase_history = userDocument.data()?.purchase_history;

      await firestore()
        .collection('Users')
        .doc(user?.uid)
        .update({
          shopping_cart: [],
          purchase_history: [...purchase_history, ...newProducts],
        });
    } catch (error) {
      Alert.alert('Sorry for the inconvenience', 'Please try again later');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <UserContext.Provider
      value={{
        userData,
        isLoading,
        handleAddToShoppingCart,
        handleAddToPurchaseHistory,
      }}>
      {children}
    </UserContext.Provider>
  );
};
