import React, { createContext, useState, useContext } from 'react';
import { db } from '../../firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type ShoppingListItem = {
  id: string;
  name: string;
  price: number;
  unit: string;
  image: string;
  category: string;
  quantity?: string;
};

interface ShoppingListContextType {
  shoppingList: ShoppingListItem[];
  addToList: (item: ShoppingListItem) => void;
  removeFromList: (id: string) => void;
  recentlyPurchased: ShoppingListItem[];
  markAsPurchased: (id: string) => void;
}

const ShoppingListContext = createContext<ShoppingListContextType | undefined>(undefined);

export const ShoppingListProvider = ({ children }: { children: React.ReactNode }) => {
  const [shoppingList, setShoppingList] = useState<ShoppingListItem[]>([]);
  const [recentlyPurchased, setRecentlyPurchased] = useState<ShoppingListItem[]>([]);
  const addToList = (item: ShoppingListItem) => {
    setShoppingList((prev) => [...prev, item]);
  };
  const removeFromList = (id: string) => {
    setShoppingList((prev) => prev.filter(item => item.id !== id));
  };
  const markAsPurchased = (id: string) => {
    setShoppingList((prev) => {
      const item = prev.find(i => i.id === id);
      if (item) setRecentlyPurchased(rp => [item, ...rp]);
      return prev.filter(i => i.id !== id);
    });
  };

  return (
    <ShoppingListContext.Provider value={{ shoppingList, addToList, removeFromList, recentlyPurchased, markAsPurchased }}>
      {children}
    </ShoppingListContext.Provider>
  );
};

export const useShoppingList = () => {
  const context = useContext(ShoppingListContext);
  if (!context) throw new Error('useShoppingList must be used within a ShoppingListProvider');
  return context;
}; 