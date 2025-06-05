import { useCallback, useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { colors } from '@/constants/theme';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function AuthScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);

  const apiKey = "AIzaSyAd6E1wi5NZ-wpjelI2c2r-tVjErVHXn-E";

  const handleLogin = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`;
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          password,
          returnSecureToken: true,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        await AsyncStorage.setItem('idToken', data.idToken);
        router.replace('/(tabs)');
      } else {
        setError(data.error?.message || 'Login failed');
      }
    } catch (err: any) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  }, [email, password]);

  const handleSignUp = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`;
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          password,
          returnSecureToken: true,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        await AsyncStorage.setItem('idToken', data.idToken);
        router.replace('/(tabs)');
      } else {
        setError(data.error?.message || 'Sign up failed');
      }
    } catch (err: any) {
      setError(err.message || 'Sign up failed');
    } finally {
      setLoading(false);
    }
  }, [email, password]);

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      
      <View style={styles.header}>
        <Text style={styles.title}>Welcome to{'\n'}SmartGrocer</Text>
        <Text style={styles.subtitle}>Sign in to continue</Text>
      </View>

      <View style={styles.form}>
        <Animated.View entering={FadeInDown.delay(200).duration(400)}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="Enter your email"
            placeholderTextColor={colors.textTertiary}
            autoCapitalize="none"
            keyboardType="email-address"
          />
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(300).duration(400)} style={styles.passwordContainer}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            placeholder="Enter your password"
            placeholderTextColor={colors.textTertiary}
            secureTextEntry
          />
        </Animated.View>

        {error ? (
          <Text style={{ color: colors.error, marginTop: 16, marginBottom: 8, textAlign: 'center' }}>{error}</Text>
        ) : null}
        <Animated.View entering={FadeInDown.delay(400).duration(400)} style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={isSignUp ? handleSignUp : handleLogin}
            disabled={loading}
          >
            <Text style={styles.buttonText}>
              {loading
                ? isSignUp
                  ? 'Signing Up...'
                  : 'Signing In...'
                : isSignUp
                ? 'Sign Up'
                : 'Sign In'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ marginTop: 16, alignItems: 'center' }}
            onPress={() => {
              setIsSignUp((prev) => !prev);
              setError('');
            }}
            disabled={loading}
          >
            <Text style={{ color: colors.primary }}>
              {isSignUp
                ? 'Already have an account? Sign In'
                : "Don't have an account? Sign Up"}
            </Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 24,
  },
  header: {
    marginTop: 80,
    marginBottom: 48,
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: 32,
    color: colors.textPrimary,
    marginBottom: 8,
  },
  subtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: colors.textSecondary,
  },
  form: {
    flex: 1,
  },
  label: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: colors.textPrimary,
    marginBottom: 8,
  },
  input: {
    backgroundColor: colors.surfacePrimary,
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: colors.textPrimary,
    borderWidth: 1,
    borderColor: colors.divider,
  },
  passwordContainer: {
    marginTop: 24,
  },
  buttonContainer: {
    marginTop: 32,
  },
  button: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  buttonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: colors.surfacePrimary,
  },
});