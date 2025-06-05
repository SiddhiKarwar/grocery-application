import { useState, useContext, createContext } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Plus, Filter } from 'lucide-react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import { colors } from '@/constants/theme';
import SearchBar from '@/components/common/SearchBar';
import BrowseItem from '@/components/grocery/BrowseItem';
import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { useShoppingList } from '../contexts/ShoppingListContext';

const items = [
  { id: '1', name: 'Apple', category: 'Fruits & Veggies', price: 1.99, unit: 'lb', image: 'https://images.pexels.com/photos/102104/pexels-photo-102104.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
  { id: '2', name: 'Banana', category: 'Fruits & Veggies', price: 0.59, unit: 'lb', image: 'https://images.pexels.com/photos/461208/pexels-photo-461208.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
  { id: '3', name: 'Strawberry', category: 'Fruits & Veggies', price: 4.99, unit: 'pack', image: 'https://images.pexels.com/photos/302478/pexels-photo-302478.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
  { id: '4', name: 'Ladyfinger', category: 'Fruits & Veggies', price: 2.49, unit: 'lb', image: 'https://i.pinimg.com/originals/87/48/0a/87480a3980de07e9ccb4d52029f15d2a.jpg' },
  { id: '5', name: 'Potato', category: 'Fruits & Veggies', price: 1.29, unit: 'lb', image: 'https://www.photos-public-domain.com/wp-content/uploads/2010/11/potatoes.jpg' },
  { id: '6', name: 'Milk', category: 'Dairy & Eggs', price: 3.49, unit: 'gallon', image: 'https://www.healthkart.com/connect/wp-content/uploads/2022/07/900x500_thumbnail_HK-Vitamins-and-Minerals-in-Milk-.png' },
  { id: '7', name: 'Eggs', category: 'Dairy & Eggs', price: 4.29, unit: 'dozen', image: 'https://images.pexels.com/photos/162712/egg-white-food-protein-162712.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
  { id: '8', name: 'Bread', category: 'Bakery', price: 2.99, unit: 'loaf', image: 'https://images.pexels.com/photos/1775043/pexels-photo-1775043.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
  { id: '9', name: 'Chicken Breast', category: 'Meat & Fish', price: 5.99, unit: 'lb', image: 'https://images.pexels.com/photos/616354/pexels-photo-616354.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
  { id: '10', name: 'Salmon', category: 'Meat & Fish', price: 12.99, unit: 'lb', image: 'https://kasilofseafoods.com/wp-content/uploads/2016/04/wild-alaskan-salmon-scaled.jpg' },
  { id: '11', name: 'Cheese', category: 'Dairy & Eggs', price: 6.49, unit: 'block', image: 'http://ghk.h-cdn.co/assets/cm/15/11/54ff1f7753c29-ghk-best-diet-advice-cheese-s2.jpg' },
  { id: '12', name: 'Orange Juice', category: 'Beverages', price: 3.99, unit: 'liter', image: 'https://images.pexels.com/photos/96974/pexels-photo-96974.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
  { id: '13', name: 'Bagels', category: 'Bakery', price: 2.49, unit: 'pack', image: 'https://images.pexels.com/photos/461382/pexels-photo-461382.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
  { id: '14', name: 'Spinach', category: 'Fruits & Veggies', price: 1.99, unit: 'bunch', image: 'https://eadn-wc01-4177395.nxedge.io/wp-content/uploads/2020/05/iStock-916931074-2-scaled.jpg' },
  { id: '15', name: 'Cake', category: 'Bakery', price: 8.99, unit: 'each', image: 'https://www.janespatisserie.com/wp-content/uploads/2019/05/IMG_0074_1.jpg' },
  { id: '16', name: 'Biscuits', category: 'Bakery', price: 2.99, unit: 'pack', image: 'https://www.spendwithpennies.com/wp-content/uploads/2022/04/Chocolate-Chip-Cookies-SpendWithPennies-2.jpg' },
];

type ShoppingListItem = {
  id: string;
  name: string;
  price: number;
  unit: string;
  image: string;
  category: string;
};

interface ShoppingListContextType {
  shoppingList: ShoppingListItem[];
  addToList: (item: ShoppingListItem) => void;
}

const ShoppingListContext = createContext<ShoppingListContextType>({
  shoppingList: [],
  addToList: () => {},
});

export function ShoppingListProvider({ children }: { children: React.ReactNode }) {
  const [shoppingList, setShoppingList] = useState<ShoppingListItem[]>([]);
  const addToList = (item: ShoppingListItem) => {
    setShoppingList((prev) => [...prev, item]);
  };
  return (
    <ShoppingListContext.Provider value={{ shoppingList, addToList }}>
      {children}
    </ShoppingListContext.Provider>
  );
}

function BrowseScreen(props: any) {
  const insets = useSafeAreaInsets();
  const [searchQuery, setSearchQuery] = useState('');
  const params = useLocalSearchParams();
  const selectedCategory = params.category as string | undefined;
  const { addToList } = useShoppingList();
  
  const filteredItems = searchQuery.trim() === ''
    ? (selectedCategory ? items.filter(item => item.category === selectedCategory) : items)
    : items.filter(item => 
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase())
      );

  return (
    <SafeAreaView style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar style="dark" />
      
      <View style={styles.header}>
        <Text style={styles.title}>Browse Items</Text>
      </View>
      
      <View style={styles.searchContainer}>
        <SearchBar
          placeholder="Search items..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          style={styles.search}
        />
        
        <TouchableOpacity style={styles.filterButton}>
          <Filter size={20} color={colors.textPrimary} />
        </TouchableOpacity>
      </View>
      
      <FlatList
        data={filteredItems}
        keyExtractor={item => item.id}
        numColumns={2}
        contentContainerStyle={styles.gridContainer}
        columnWrapperStyle={styles.columnWrapper}
        renderItem={({ item, index }) => (
          <Animated.View
            entering={FadeIn.delay(index * 50).duration(300)}
            style={styles.gridItem}
          >
            <BrowseItem
              id={item.id}
              name={item.name}
              price={item.price}
              unit={item.unit}
              image={item.image}
              onAdd={({ id, name, price, unit, image, quantity }) => addToList({
                id: id + '-' + unit + '-' + quantity,
                name,
                price,
                unit,
                image,
                category: item.category,
                quantity
              })}
            />
          </Animated.View>
        )}
      />
    </SafeAreaView>
  );
}

export default BrowseScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDFBF6',
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: 28,
    color: colors.textPrimary,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  search: {
    flex: 1,
    marginRight: 12,
  },
  filterButton: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: 'rgba(0,0,0,0.05)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  gridContainer: {
    paddingHorizontal: 8,
    paddingBottom: 24,
  },
  columnWrapper: {
    justifyContent: 'space-between',
    paddingHorizontal: 8,
  },
  gridItem: {
    width: '48%',
    marginBottom: 16,
  },
});