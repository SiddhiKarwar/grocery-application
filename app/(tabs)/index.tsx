import { useCallback, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity, FlatList } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Search, Bell } from 'lucide-react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '@/constants/theme';
import CategoryCard from '@/components/home/CategoryCard';
import RecommendedItem from '@/components/home/RecommendedItem';
import SearchBar from '@/components/common/SearchBar';
import { router } from 'expo-router';
import { useShoppingList } from '../contexts/ShoppingListContext';

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const [searchVisible, setSearchVisible] = useState(false);
  const { addToList, recentlyPurchased } = useShoppingList();

  const toggleSearch = useCallback(() => {
    setSearchVisible(prev => !prev);
  }, []);

  const handleCategoryPress = (category: string) => {
    router.push({ pathname: '/browse', params: { category } });
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar style="dark" />
      
      <View style={styles.header}>
        <View>
          <Text style={styles.welcomeText}>Welcome back,</Text>
          <Text style={styles.nameText}>Alex</Text>
        </View>
        <View style={styles.headerIcons}>
          <TouchableOpacity 
            style={styles.iconButton} 
            onPress={toggleSearch}
          >
            <Search size={24} color={colors.textPrimary} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Bell size={24} color={colors.textPrimary} />
            <View style={styles.notificationBadge} />
          </TouchableOpacity>
        </View>
      </View>
      
      {searchVisible && (
        <Animated.View 
          entering={FadeInUp.duration(300)}
          style={styles.searchContainer}
        >
          <SearchBar placeholder="Search for items..." />
        </Animated.View>
      )}

      <ScrollView 
        style={styles.content} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Categories</Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesContainer}
          >
            <CategoryCard 
              title="Fruits & Veggies" 
              count={32} 
              image="https://images.pexels.com/photos/1132047/pexels-photo-1132047.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              color="#4CAF50"
              onPress={() => handleCategoryPress('Fruits & Veggies')}
            />
            <CategoryCard 
              title="Dairy & Eggs" 
              count={18} 
              image="https://images.pexels.com/photos/8964015/pexels-photo-8964015.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              color="#FFC107"
              onPress={() => handleCategoryPress('Dairy & Eggs')}
            />
            <CategoryCard 
              title="Bakery" 
              count={24} 
              image="https://images.pexels.com/photos/1775043/pexels-photo-1775043.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              color="#FF9800"
              onPress={() => handleCategoryPress('Bakery')}
            />
            <CategoryCard 
              title="Meat & Fish" 
              count={15} 
              image="https://images.pexels.com/photos/699953/pexels-photo-699953.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              color="#F44336"
              onPress={() => handleCategoryPress('Meat & Fish')}
            />
          </ScrollView>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recommended For You</Text>
          <View style={styles.recommendedContainer}>
            <RecommendedItem 
              name="Organic Bananas" 
              price={2.99} 
              unit="bunch" 
              image="https://images.pexels.com/photos/1093038/pexels-photo-1093038.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              onAddToList={({ name, price, unit, image, quantity }) => addToList({
                id: name + '-' + unit + '-' + quantity,
                name,
                price,
                unit,
                image,
                category: "Fruits & Veggies",
                quantity
              })}
            />
            <RecommendedItem 
              name="Avocado" 
              price={1.49} 
              unit="each" 
              image="https://images.pexels.com/photos/2228553/pexels-photo-2228553.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              onAddToList={({ name, price, unit, image, quantity }) => addToList({
                id: name + '-' + unit + '-' + quantity,
                name,
                price,
                unit,
                image,
                category: "Fruits & Veggies",
                quantity
              })}
            />
            <RecommendedItem 
              name="Milk" 
              price={3.49} 
              unit="gallon" 
              image="https://www.healthkart.com/connect/wp-content/uploads/2022/07/900x500_thumbnail_HK-Vitamins-and-Minerals-in-Milk-.png"
              onAddToList={({ name, price, unit, image, quantity }) => addToList({
                id: name + '-' + unit + '-' + quantity,
                name,
                price,
                unit,
                image,
                category: "Dairy & Eggs",
                quantity
              })}
            />
            <RecommendedItem 
              name="Eggs" 
              price={4.29} 
              unit="dozen" 
              image="https://images.pexels.com/photos/162712/egg-white-food-protein-162712.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              onAddToList={({ name, price, unit, image, quantity }) => addToList({
                id: name + '-' + unit + '-' + quantity,
                name,
                price,
                unit,
                image,
                category: "Dairy & Eggs",
                quantity
              })}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recently Purchased</Text>
          <View style={styles.recentlyPurchasedContainer}>
            {recentlyPurchased.length === 0 ? (
              <Text style={{ color: colors.textSecondary, marginLeft: 8 }}>No recent purchases yet.</Text>
            ) : (
              recentlyPurchased.map((item, index) => (
                <Animated.View 
                  key={item.id} 
                  style={styles.recentTag}
                  entering={FadeInUp.delay(index * 100).duration(400)}
                >
                  <Text style={styles.recentTagText}>{item.name}</Text>
                  <TouchableOpacity style={styles.addButton} onPress={() => addToList(item)}>
                    <Text style={styles.addButtonText}>+</Text>
                  </TouchableOpacity>
                </Animated.View>
              ))
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDFBF6',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  welcomeText: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: colors.textSecondary,
  },
  nameText: {
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
    color: colors.textPrimary,
    marginTop: 4,
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.05)',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 12,
  },
  notificationBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.error,
  },
  searchContainer: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 24,
  },
  section: {
    marginTop: 24,
  },
  sectionTitle: {
    fontFamily: 'Poppins-Medium',
    fontSize: 18,
    color: colors.textPrimary,
    marginLeft: 16,
    marginBottom: 16,
  },
  categoriesContainer: {
    paddingLeft: 16,
    paddingRight: 8,
  },
  recommendedContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
  },
  recentlyPurchasedContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    gap: 8,
  },
  recentTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginRight: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.05)',
  },
  recentTagText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: colors.textPrimary,
  },
  addButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
    lineHeight: 20,
    textAlign: 'center',
  },
});