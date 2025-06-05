import { StyleSheet, Text, View, Image, TouchableOpacity, Modal, TextInput } from 'react-native';
import { Plus } from 'lucide-react-native';
import { colors } from '@/constants/theme';
import React, { useState } from 'react';

interface RecommendedItemProps {
  name: string;
  price: number;
  unit: string;
  image: string;
  onAddToList?: (item: { name: string; price: number; unit: string; image: string; quantity: string }) => void;
}

export default function RecommendedItem({ name, price, unit, image, onAddToList }: RecommendedItemProps) {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedQuantity, setSelectedQuantity] = useState('1');
  const [selectedUnit, setSelectedUnit] = useState(unit);
  const units = ['each', 'bunch', 'dozen', 'gallon', 'lb', 'pack', 'block', 'liter'];

  const handleAdd = () => {
    setModalVisible(false);
    if (onAddToList) {
      onAddToList({
        name,
        price,
        unit: selectedUnit,
        image,
        quantity: selectedQuantity,
      });
    }
  };

  return (
    <TouchableOpacity 
      style={styles.container}
      activeOpacity={0.7}
    >
      <View style={styles.imageContainer}>
        <Image 
          source={{ uri: image }}
          style={styles.image}
          resizeMode="cover"
        />
      </View>
      <View style={styles.content}>
        <Text style={styles.name} numberOfLines={1}>{name}</Text>
        <TouchableOpacity 
          style={styles.addButton}
          onPress={() => setModalVisible(true)}
        >
          <Plus size={16} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.3)' }}>
          <View style={{ backgroundColor: '#fff', borderRadius: 16, padding: 24, width: 300 }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 12 }}>Select Quantity</Text>
            <TextInput
              style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 8, marginBottom: 16 }}
              keyboardType="numeric"
              value={selectedQuantity}
              onChangeText={setSelectedQuantity}
              placeholder="Enter quantity"
            />
            <Text style={{ fontSize: 16, marginBottom: 8 }}>Select Unit</Text>
            {units.map(u => (
              <TouchableOpacity key={u} onPress={() => setSelectedUnit(u)} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 6 }}>
                <View style={{ width: 20, height: 20, borderRadius: 10, borderWidth: 1, borderColor: '#ccc', marginRight: 8, backgroundColor: selectedUnit === u ? colors.primary : '#fff' }} />
                <Text style={{ fontSize: 16 }}>{u}</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity onPress={handleAdd} style={{ marginTop: 16, backgroundColor: colors.primary, borderRadius: 8, padding: 12, alignItems: 'center' }}>
              <Text style={{ color: '#fff', fontWeight: 'bold' }}>Add to List</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setModalVisible(false)} style={{ marginTop: 8, alignItems: 'center' }}>
              <Text style={{ color: colors.textSecondary }}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  imageContainer: {
    height: 120,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  content: {
    padding: 12,
  },
  addButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
});