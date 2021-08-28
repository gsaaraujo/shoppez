import React, { useState, useEffect, createContext, ReactNode } from 'react';
import { Alert } from 'react-native';

import storage from '@react-native-firebase/storage';
import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';

import uuid from 'react-native-uuid';

import { useAuth } from '../hooks/useAuth';
import { firebase } from '@react-native-firebase/auth';

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
  favorites: AppProductType[];
  shopping_cart: ShoppingCartType[];
  purchase_history: PurchaseHistoryType[];
};

type ContextData = {
  userData: UserPreferences;
  isLoading: boolean;
  handleAddToShoppingCart: (newCart: ShoppingCartType) => void;
  handleAddToPurchaseHistory: (newProducts: ShoppingCartType[]) => void;
  handleFavorite: (productInfo: AppProductType) => void;
  handleRemoveFromShoppingCart: (removeID: string) => void;
  handleRemoveFromPurchaseHistory: (removeID: string) => void;
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

    newCart.key = uuid.v4() as string;

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

  const handleRemoveFromShoppingCart = async (removeID: string) => {
    setIsLoading(true);

    try {
      const userDocument = await firestore()
        .collection('Users')
        .doc(user?.uid)
        .get();

      let result = userDocument.data()?.shopping_cart;
      result = result.filter((each: any) => each.key !== removeID);

      await firestore().collection('Users').doc(user?.uid).update({
        shopping_cart: result,
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

  const handleRemoveFromPurchaseHistory = async (removeID: string) => {
    setIsLoading(true);

    try {
      const userDocument = await firestore()
        .collection('Users')
        .doc(user?.uid)
        .get();

      let result = userDocument.data()?.purchase_history;
      result = result.filter((each: any) => each.key !== removeID);

      await firestore().collection('Users').doc(user?.uid).update({
        purchase_history: result,
      });
    } catch (error) {
      Alert.alert('Sorry for the inconvenience', 'Please try again later');
    } finally {
      setIsLoading(false);
    }
  };

  const handleFavorite = async (productInfo: AppProductType) => {
    try {
      const userDocument = await firestore()
        .collection('Users')
        .doc(user?.uid)
        .get();

      let result = userDocument.data()?.favorites;

      const alreadyExists = result.find(
        (each: any) => each.key === productInfo.key,
      );

      if (alreadyExists) {
        const remove = result.filter(
          (each: any) => each.key !== productInfo.key,
        );

        await firestore().collection('Users').doc(user?.uid).update({
          favorites: remove,
        });
      } else {
        await firestore()
          .collection('Users')
          .doc(user?.uid)
          .update({
            favorites: [...result, productInfo],
          });
      }
    } catch (error) {
      Alert.alert('Sorry for the inconvenience', 'Please try again later');
    }

    handleUserData();
  };

  return (
    <UserContext.Provider
      value={{
        userData,
        isLoading,
        handleAddToShoppingCart,
        handleAddToPurchaseHistory,
        handleFavorite,
        handleRemoveFromShoppingCart,
        handleRemoveFromPurchaseHistory,
      }}>
      {children}
    </UserContext.Provider>
  );
};
