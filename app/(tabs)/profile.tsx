import { useState } from 'react';
import { StyleSheet, Text, View, Switch, TouchableOpacity, ScrollView, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Moon, Sun, ChevronRight, Bell, PaintBucket, CreditCard, CircleHelp as HelpCircle, LogOut } from 'lucide-react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import { colors } from '@/constants/theme';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { db } from '../../firebaseConfig';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { useEffect } from 'react';

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();
  const [darkMode, setDarkMode] = useState(false);
  const [purchases, setPurchases] = useState<any[]>([]);
  const [loadingPurchases, setLoadingPurchases] = useState(true);
  const [purchaseError, setPurchaseError] = useState('');

  useEffect(() => {
    const fetchPurchases = async () => {
      setLoadingPurchases(true);
      setPurchaseError('');
      try {
        const idToken = await AsyncStorage.getItem('idToken');
        if (!idToken) throw new Error('Not logged in');
        const base64Url = idToken.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        const { user_id } = JSON.parse(jsonPayload);
        const purchasesRef = collection(db, 'users', user_id, 'purchases');
        const q = query(purchasesRef, orderBy('purchasedAt', 'desc'));
        const snapshot = await getDocs(q);
        const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setPurchases(items);
      } catch (e: any) {
        setPurchaseError(e.message || 'Failed to load purchases');
      } finally {
        setLoadingPurchases(false);
      }
    };
    fetchPurchases();
  }, []);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('idToken'); // Remove token or session
      router.replace('/auth');
    } catch (err) {
      alert('Logout failed. Please try again.');
    }
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar style="dark" />
      
      <View style={styles.header}>
        <Text style={styles.title}>Profile</Text>
      </View>
      
      <ScrollView 
        style={styles.content}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.userContainer}>
          <Image 
            source={{ uri: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' }}
            style={styles.avatar}
          />
          <View style={styles.userInfo}>
            <Text style={styles.userName}>Alex Johnson</Text>
            <Text style={styles.userEmail}>alex@example.com</Text>
          </View>
        </View>

        <View style={{ marginVertical: 24 }}>
          <Text style={styles.sectionTitle}>Purchase History</Text>
          {loadingPurchases ? (
            <Text style={{ color: colors.textSecondary, marginTop: 8 }}>Loading...</Text>
          ) : purchaseError ? (
            <Text style={{ color: colors.error, marginTop: 8 }}>{purchaseError}</Text>
          ) : purchases.length === 0 ? (
            <Text style={{ color: colors.textSecondary, marginTop: 8 }}>No purchases yet.</Text>
          ) : (
            <ScrollView style={{ maxHeight: 220 }}>
              {purchases.map((item, idx) => (
                <View key={item.id || idx} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 14 }}>
                  <Image source={{ uri: item.image }} style={{ width: 40, height: 40, borderRadius: 8, marginRight: 12 }} />
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontWeight: 'bold', color: colors.textPrimary }}>{item.name}</Text>
                    <Text style={{ color: colors.textSecondary, fontSize: 12 }}>
                      Qty: {item.quantity || 1} | Price: ${item.price}
                    </Text>
                    <Text style={{ color: colors.textTertiary, fontSize: 11 }}>
                      {item.purchasedAt ? new Date(item.purchasedAt).toLocaleString() : ''}
                    </Text>
                  </View>
                </View>
              ))}
            </ScrollView>
          )}
        </View>
        
        <Animated.View 
          entering={FadeIn.delay(100).duration(400)}
          style={styles.section}
        >
          <Text style={styles.sectionTitle}>Preferences</Text>
          
          <View style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <View style={[styles.iconContainer, { backgroundColor: colors.primaryLight }]}>
                <Moon size={20} color={colors.primary} />
              </View>
              <Text style={styles.settingText}>Dark Mode</Text>
            </View>
            <Switch
              trackColor={{ false: '#E0E0E0', true: colors.primaryLight }}
              thumbColor={darkMode ? colors.primary : '#FFFFFF'}
              ios_backgroundColor="#E0E0E0"
              onValueChange={toggleDarkMode}
              value={darkMode}
            />
          </View>
          
          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <View style={[styles.iconContainer, { backgroundColor: '#FFF0E0' }]}>
                <Bell size={20} color="#FF9800" />
              </View>
              <Text style={styles.settingText}>Notifications</Text>
            </View>
            <ChevronRight size={20} color={colors.textSecondary} />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <View style={[styles.iconContainer, { backgroundColor: '#E8F5E9' }]}>
                <PaintBucket size={20} color="#4CAF50" />
              </View>
              <Text style={styles.settingText}>Appearance</Text>
            </View>
            <ChevronRight size={20} color={colors.textSecondary} />
          </TouchableOpacity>
        </Animated.View>
        
        <Animated.View 
          entering={FadeIn.delay(200).duration(400)}
          style={styles.section}
        >
          <Text style={styles.sectionTitle}>Account</Text>
          
          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <View style={[styles.iconContainer, { backgroundColor: '#E3F2FD' }]}>
                <CreditCard size={20} color="#2196F3" />
              </View>
              <Text style={styles.settingText}>Payment Methods</Text>
            </View>
            <ChevronRight size={20} color={colors.textSecondary} />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <View style={[styles.iconContainer, { backgroundColor: '#E8EAF6' }]}>
                <HelpCircle size={20} color="#3F51B5" />
              </View>
              <Text style={styles.settingText}>Help & Support</Text>
            </View>
            <ChevronRight size={20} color={colors.textSecondary} />
          </TouchableOpacity>
        </Animated.View>
        
        <Animated.View entering={FadeIn.delay(300).duration(400)}>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <LogOut size={20} color={colors.error} />
            <Text style={styles.logoutText}>Log Out</Text>
          </TouchableOpacity>
        </Animated.View>
        
        <View style={styles.versionContainer}>
          <Text style={styles.versionText}>Version 1.0.0</Text>
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
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: 28,
    color: colors.textPrimary,
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 40,
  },
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginVertical: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
  },
  userInfo: {
    marginLeft: 16,
  },
  userName: {
    fontFamily: 'Poppins-Medium',
    fontSize: 18,
    color: colors.textPrimary,
  },
  userEmail: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 4,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontFamily: 'Poppins-Medium',
    fontSize: 18,
    color: colors.textPrimary,
    marginBottom: 16,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  settingText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: colors.textPrimary,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(239, 83, 80, 0.1)',
    padding: 16,
    borderRadius: 12,
    marginTop: 24,
  },
  logoutText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: colors.error,
    marginLeft: 12,
  },
  versionContainer: {
    alignItems: 'center',
    marginTop: 40,
  },
  versionText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: colors.textTertiary,
  },
});