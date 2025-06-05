import { useState, useCallback } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { X, Check } from 'lucide-react-native';
import { router } from 'expo-router';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { colors } from '@/constants/theme';
import CategoryPicker from '@/components/grocery/CategoryPicker';
import { useShoppingList } from '../contexts/ShoppingListContext';

const categories = [
  { id: '1', name: 'Fruits & Veggies', color: '#4CAF50' },
  { id: '2', name: 'Dairy & Eggs', color: '#FFC107' },
  { id: '3', name: 'Bakery', color: '#FF9800' },
  { id: '4', name: 'Meat & Fish', color: '#F44336' },
  { id: '5', name: 'Beverages', color: '#2196F3' },
  { id: '6', name: 'Snacks', color: '#9C27B0' },
  { id: '7', name: 'Frozen', color: '#00BCD4' },
  { id: '8', name: 'Pantry', color: '#795548' },
];

const units = ['each', 'lb', 'oz', 'kg', 'g', 'bunch', 'dozen', 'gallon', 'liter', 'ml'];

export default function AddItemScreen() {
  const insets = useSafeAreaInsets();
  const { addToList } = useShoppingList();
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('1');
  const [selectedUnit, setSelectedUnit] = useState('each');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [note, setNote] = useState('');

  const handleSave = useCallback(() => {
    if (!selectedCategory) return;
    addToList({
      id: Date.now().toString(),
      name,
      unit: selectedUnit,
      category: selectedCategory,
      price: 0,
      image: '',
    });
    router.push('/list');
  }, [name, quantity, selectedUnit, selectedCategory, addToList]);

  const handleCancel = useCallback(() => {
    router.back();
  }, []);

  const isFormValid = name.trim().length > 0 && selectedCategory !== null;

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
    >
      <StatusBar style="dark" />
      
      <View style={[styles.header, { paddingTop: insets.top + 8 }]}>
        <TouchableOpacity 
          style={styles.headerButton} 
          onPress={handleCancel}
        >
          <X size={24} color={colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Add Item</Text>
        <TouchableOpacity
          style={[
            styles.headerButton, 
            styles.saveButton,
            !isFormValid && styles.saveButtonDisabled
          ]}
          onPress={handleSave}
          disabled={!isFormValid}
        >
          <Check size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
      
      <ScrollView 
        style={styles.content}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View 
          entering={FadeInUp.duration(300).delay(100)}
          style={styles.formGroup}
        >
          <Text style={styles.label}>Item Name</Text>
          <TextInput 
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="e.g., Apples"
            placeholderTextColor={colors.textTertiary}
          />
        </Animated.View>
        
        <Animated.View 
          entering={FadeInUp.duration(300).delay(200)}
          style={styles.formGroup}
        >
          <Text style={styles.label}>Category</Text>
          <CategoryPicker 
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
        </Animated.View>
        
        <Animated.View 
          entering={FadeInUp.duration(300).delay(300)}
          style={styles.formRow}
        >
          <View style={[styles.formGroup, styles.quantityContainer]}>
            <Text style={styles.label}>Quantity</Text>
            <TextInput 
              style={styles.input}
              value={quantity}
              onChangeText={setQuantity}
              keyboardType="numeric"
              placeholder="1"
              placeholderTextColor={colors.textTertiary}
            />
          </View>
          
          <View style={[styles.formGroup, styles.unitContainer]}>
            <Text style={styles.label}>Unit</Text>
            <View style={styles.unitSelector}>
              <ScrollView 
                horizontal 
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.unitOptions}
              >
                {units.map(unit => (
                  <TouchableOpacity 
                    key={unit}
                    style={[
                      styles.unitOption,
                      selectedUnit === unit && styles.unitOptionSelected
                    ]}
                    onPress={() => setSelectedUnit(unit)}
                  >
                    <Text 
                      style={[
                        styles.unitOptionText,
                        selectedUnit === unit && styles.unitOptionTextSelected
                      ]}
                    >
                      {unit}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          </View>
        </Animated.View>
        
        <Animated.View 
          entering={FadeInUp.duration(300).delay(400)}
          style={styles.formGroup}
        >
          <Text style={styles.label}>Note (Optional)</Text>
          <TextInput 
            style={[styles.input, styles.noteInput]}
            value={note}
            onChangeText={setNote}
            placeholder="Add any special instructions..."
            placeholderTextColor={colors.textTertiary}
            multiline
            numberOfLines={3}
            textAlignVertical="top"
          />
        </Animated.View>
      </ScrollView>
    </KeyboardAvoidingView>
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
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.05)',
    backgroundColor: '#FFFFFF',
  },
  headerTitle: {
    fontFamily: 'Poppins-Medium',
    fontSize: 18,
    color: colors.textPrimary,
  },
  headerButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.05)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveButton: {
    backgroundColor: colors.primary,
  },
  saveButtonDisabled: {
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  formGroup: {
    marginBottom: 24,
  },
  formRow: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  quantityContainer: {
    flex: 2,
    marginRight: 12,
  },
  unitContainer: {
    flex: 3,
  },
  label: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: colors.textPrimary,
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
    fontFamily: 'Inter-Regular',
    color: colors.textPrimary,
  },
  noteInput: {
    height: 100,
    paddingTop: 12,
  },
  unitSelector: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
  },
  unitOptions: {
    paddingVertical: 8,
    paddingHorizontal: 8,
  },
  unitOption: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    marginRight: 8,
  },
  unitOptionSelected: {
    backgroundColor: colors.primaryLight,
  },
  unitOptionText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: colors.textPrimary,
  },
  unitOptionTextSelected: {
    fontFamily: 'Inter-Medium',
    color: colors.primary,
  },
});