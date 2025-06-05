import { useCallback, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { useFonts, Poppins_700Bold, Poppins_500Medium } from '@expo-google-fonts/poppins';
import { Inter_400Regular, Inter_500Medium } from '@expo-google-fonts/inter';
import { SplashScreen, router } from 'expo-router';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';
import { StatusBar } from 'expo-status-bar';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import { colors } from '@/constants/theme';

SplashScreen.preventAutoHideAsync();

export default function SplashScreenApp() {
  const [fontsLoaded, fontError] = useFonts({
    'Poppins-Bold': Poppins_700Bold,
    'Poppins-Medium': Poppins_500Medium,
    'Inter-Regular': Inter_400Regular,
    'Inter-Medium': Inter_500Medium,
  });

  useFrameworkReady();

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  const onLayoutRootView = useCallback(() => {
    if (fontsLoaded || fontError) {
      setTimeout(() => {
        router.replace('/auth');
      }, 2000);
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <View style={styles.container} onLayout={onLayoutRootView}>
      <StatusBar style="dark" />
      <Animated.View 
        entering={FadeIn.duration(1000)}
        style={styles.content}
      >
        <Animated.View 
          entering={FadeInDown.delay(300).duration(800)}
          style={styles.logoContainer}
        >
          <Text style={styles.logo}>SmartGrocer</Text>
          <Text style={styles.tagline}>Shop Smarter. Eat Better.</Text>
        </Animated.View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
  },
  logo: {
    fontFamily: 'Poppins-Bold',
    fontSize: 40,
    color: colors.primary,
    marginBottom: 16,
  },
  tagline: {
    fontFamily: 'Inter-Medium',
    fontSize: 18,
    color: colors.textSecondary,
    letterSpacing: 0.5,
  },
});