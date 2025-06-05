import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { Check, Trash2 } from 'lucide-react-native';
import { colors } from '@/constants/theme';

interface GroceryItemType {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  category: string;
  completed: boolean;
}

interface GroceryItemProps {
  item: GroceryItemType;
  onComplete: () => void;
  onDelete: () => void;
  onEdit?: () => void;
}

export default function GroceryItem({ item, onComplete, onDelete, onEdit }: GroceryItemProps) {
  const [isChecked, setIsChecked] = useState(false);
  
  const handleCheck = () => {
    setIsChecked(true);
    // Add a delay to show the animation before removing the item
    setTimeout(() => {
      onComplete();
    }, 300);
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.mainContent}>
        <TouchableOpacity
          style={[styles.checkbox, isChecked && styles.checkboxChecked]}
          onPress={handleCheck}
        >
          {isChecked && <Check size={16} color="#FFFFFF" />}
        </TouchableOpacity>
        
        <View style={styles.details}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.quantity}>
            {item.quantity} {item.unit}
          </Text>
        </View>
      </View>
      
      <View style={styles.actions}>
        <TouchableOpacity
          style={[styles.actionButton, styles.deleteButton]}
          onPress={onDelete}
        >
          <Trash2 size={16} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 12,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  mainContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: {
    backgroundColor: colors.primary,
  },
  details: {
    marginLeft: 16,
  },
  name: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: colors.textPrimary,
  },
  quantity: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 2,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  deleteButton: {
    backgroundColor: colors.error,
  },
});