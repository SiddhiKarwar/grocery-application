import { StyleSheet, Text, View, Image, TouchableOpacity, Modal, TextInput } from 'react-native';
import { Plus } from 'lucide-react-native';
import { colors } from '@/constants/theme';
import React, { useState } from 'react';

interface BrowseItemProps {
  id: string;
  name: string;
  price: number;
  unit: string;
  image: string;
  onAdd?: (item: { id: string; name: string; price: number; unit: string; image: string; quantity: string }) => void;
}

export default function BrowseItem({ id, name, price, unit, image, onAdd }: BrowseItemProps) {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedQuantity, setSelectedQuantity] = useState('1');
  const [selectedUnit, setSelectedUnit] = useState(unit);
  const units = ['each', 'bunch', 'dozen', 'gallon', 'lb', 'pack', 'block', 'liter'];

  const handleAdd = () => {
    setModalVisible(false);
    if (onAdd) {
      onAdd({
        id,
        name,
        price,
        unit: selectedUnit,
        image,
        quantity: selectedQuantity,
      });
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Image 
          source={{ uri: image }}
          style={styles.image}
          resizeMode="cover"
        />
        <View style={styles.content}>
          <Text style={styles.name} numberOfLines={1}>{name}</Text>
          <TouchableOpacity 
            style={styles.addButton}
            onPress={() => setModalVisible(true)}
          >
            <Plus size={16} color="#FFFFFF" />
            <Text style={styles.addButtonText}>Add</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    height: 220,
  },
  image: {
    width: '100%',
    height: 120,
  },
  content: {
    padding: 12,
    flex: 1,
    justifyContent: 'space-between',
  },
  name: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: colors.textPrimary,
  },
  priceContainer: {
    marginVertical: 4,
  },
  price: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: colors.textPrimary,
  },
  unit: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: colors.textSecondary,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginTop: 4,
  },
  addButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#FFFFFF',
    marginLeft: 6,
  },
});