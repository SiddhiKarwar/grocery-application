import { useState, useCallback, useContext, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Check, Trash2, CreditCard as Edit2, ShoppingBag } from 'lucide-react-native';
import Animated, { FadeInLeft, FadeOutRight } from 'react-native-reanimated';
import { colors } from '@/constants/theme';
import GroceryItem from '@/components/grocery/GroceryItem';
import EmptyState from '@/components/common/EmptyState';
import { useShoppingList } from '../contexts/ShoppingListContext';

export default function GroceryListScreen() {
  const insets = useSafeAreaInsets();
  const { shoppingList, removeFromList, markAsPurchased } = useShoppingList();
  const [purchaseCompleted, setPurchaseCompleted] = useState(false);

  const toggleComplete = useCallback((id: string) => {
    setPurchaseCompleted(true);
    setTimeout(() => setPurchaseCompleted(false), 2000);
    markAsPurchased(id);
  }, [markAsPurchased]);

  const deleteItem = useCallback((id: string) => {
    removeFromList(id);
  }, [removeFromList]);

  const deleteCompletedItem = useCallback((id: string) => {
    // Implementation of deleteCompletedItem
  }, []);

  const moveBackToList = useCallback((id: string) => {
    // Implementation of moveBackToList
  }, []);

  const renderListHeader = useCallback(() => {
    return (
      <View style={styles.listHeader}>
        <Text style={styles.listTitle}>Shopping List</Text>
        <Text style={styles.listSubtitle}>{shoppingList.length} items</Text>
      </View>
    );
  }, [shoppingList.length]);

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar style="dark" />
      
      {purchaseCompleted && (
        <View style={{ backgroundColor: colors.success, padding: 12, alignItems: 'center', borderRadius: 8, margin: 16 }}>
          <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16 }}>Purchase Completed!</Text>
        </View>
      )}
      
      {shoppingList.length > 0 ? (
        <FlatList
          data={shoppingList}
          keyExtractor={item => item.id}
          ListHeaderComponent={renderListHeader}
          contentContainerStyle={styles.listContent}
          renderItem={({ item, index }) => (
            <Animated.View
              entering={FadeInLeft.delay(index * 100).duration(300)}
              exiting={FadeOutRight.duration(200)}
            >
              <GroceryItem
                item={item}
                onComplete={() => toggleComplete(item.id)}
                onDelete={() => deleteItem(item.id)}
              />
            </Animated.View>
          )}
        />
      ) : (
        <EmptyState
          icon={<ShoppingBag size={48} color={colors.textSecondary} />}
          title="Your shopping list is empty"
          description="Add items to your list to start shopping"
        />
      )}
      
      {/* Existing completed items section */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDFBF6',
  },
  listHeader: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  listTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 28,
    color: colors.textPrimary,
  },
  listSubtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: colors.textSecondary,
    marginTop: 4,
  },
  listContent: {
    paddingVertical: 16,
  },
  completedContainer: {
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.05)',
  },
  completedTitle: {
    fontFamily: 'Poppins-Medium',
    fontSize: 18,
    color: colors.textPrimary,
    marginBottom: 12,
  },
  completedItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.05)',
  },
  completedItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.success,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  completedItemText: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: colors.textSecondary,
    textDecorationLine: 'line-through',
  },
  completedItemActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(0,0,0,0.05)',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  deleteButton: {
    backgroundColor: colors.error,
  },
});