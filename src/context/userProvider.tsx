import React, { useState, useEffect, createContext, ReactNode } from 'react';

import storage from '@react-native-firebase/storage';

import firestore from '@react-native-firebase/firestore';
import { useAuth } from '../hooks/useAuth';
import { firebase } from '@react-native-firebase/auth';
import { ProductsType } from '../screens/Home';

type Product = {
  name: string;
  category: string;
  price: string;
  description: string;
  offer: string;
  color: string;
  sizes: string[];
  types: string[];
};

type User = {
  name: string;
  favorites: string[];
  shopping_cart: ProductsType[];
  purchase_history: ProductsType[];
};

type ContextData = {
  userData: User;
  handleAddToShoppingCart: (newCart: ProductsType) => void;
};

type Props = {
  children: ReactNode;
};

export const UserContext = createContext<ContextData>({} as ContextData);

export const UserProvider = ({ children }: Props) => {
  const [userData, setUserData] = useState<User>({} as User);
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
            console.log('User added!');
          });
      }
    };
    handleCreateUser();
  }, []);

  const handleUserData = async () => {
    const userDocument: ProductsType = await firestore()
      .collection('Users')
      .doc(user?.uid)
      .get();

    if (userDocument.exists) {
      setUserData(userDocument.data());
    }
  };

  const handleAddToShoppingCart = async (newCart: ProductsType) => {
    const userDocument: ProductsType = await firestore()
      .collection('Users')
      .doc(user?.uid)
      .get();

    const shopping_cart = userDocument.data().shopping_cart;

    await firestore()
      .collection('Users')
      .doc(user?.uid)
      .update({
        shopping_cart: [...shopping_cart, newCart],
      });
  };

  const handleRemoveAllFromShoppingCart = async () => {
    await firestore().collection('Users').doc(user?.uid).delete();
  };

  const handleAddToPurchaseHistory = async (newProducts: ProductsType[]) => {
    const userDocument: ProductsType = await firestore()
      .collection('Users')
      .doc(user?.uid)
      .get();

    const purchase_history = userDocument.data().purchase_history;

    await firestore()
      .collection('Users')
      .doc(user?.uid)
      .update({
        purchase_history: [...purchase_history, ...newProducts],
      });
  };

  return (
    <UserContext.Provider value={{ userData, handleAddToShoppingCart }}>
      {children}
    </UserContext.Provider>
  );
};
