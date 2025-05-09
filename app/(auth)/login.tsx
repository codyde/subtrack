import { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  KeyboardAvoidingView, 
  Platform
} from 'react-native';
import { router } from 'expo-router';
import { useSharedValue, useAnimatedStyle, withTiming, Easing } from 'react-native-reanimated';
import Animated from 'react-native-reanimated';
import { Lock, Mail } from 'lucide-react-native';
import { useSubscription } from '@/contexts/SubscriptionContext';

export default function LoginScreen() {
  const [email, setEmail] = useState('demo@subtrack.com');
  const [password, setPassword] = useState('password');
  const [error, setError] = useState<string | null>(null);
  const { initializeUserData } = useSubscription();

  const formOpacity = useSharedValue(0);
  const formTranslateY = useSharedValue(20);

  // Start animation when component mounts
  useState(() => {
    formOpacity.value = withTiming(1, { 
      duration: 800, 
      easing: Easing.out(Easing.cubic) 
    });
    formTranslateY.value = withTiming(0, { 
      duration: 800, 
      easing: Easing.out(Easing.cubic) 
    });
  });

  const formAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: formOpacity.value,
      transform: [{ translateY: formTranslateY.value }]
    };
  });

  const handleLogin = () => {
    // Simple validation
    if (!email.trim() || !password.trim()) {
      setError('Please enter both email and password');
      return;
    }

    // Initialize user data based on email
    initializeUserData(email);

    // Navigate to tabs
    router.replace('/(tabs)');
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.header}>
        <Text style={styles.title}>subTrack</Text>
        <Text style={styles.subtitle}>Sign in to manage your subscriptions</Text>
      </View>

      <Animated.View style={[styles.formContainer, formAnimatedStyle]}>
        <View style={styles.inputContainer}>
          <Mail color="#777" size={20} />
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#999"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
          />
        </View>

        <View style={styles.inputContainer}>
          <Lock color="#777" size={20} />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#999"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>

        {error && <Text style={styles.errorText}>{error}</Text>}

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>

        <View style={styles.demoInfo}>
          <Text style={styles.demoText}>
            Demo credentials are pre-filled for you
          </Text>
        </View>
      </Animated.View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 24,
  },
  header: {
    marginTop: 80,
    marginBottom: 40,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontFamily: 'Inter-SemiBold',
    color: '#0A84FF',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#666',
    textAlign: 'center',
  },
  formContainer: {
    width: '100%',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 8,
    marginBottom: 16,
    paddingHorizontal: 12,
    height: 56,
    backgroundColor: '#F9F9F9',
  },
  input: {
    flex: 1,
    height: '100%',
    paddingHorizontal: 12,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#333',
  },
  button: {
    backgroundColor: '#0A84FF',
    borderRadius: 8,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
    shadowColor: '#0A84FF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Inter-Medium',
  },
  errorText: {
    color: '#FF453A',
    marginBottom: 16,
    fontFamily: 'Inter-Regular',
  },
  demoInfo: {
    marginTop: 32,
    alignItems: 'center',
  },
  demoText: {
    fontSize: 14,
    color: '#666',
    fontFamily: 'Inter-Regular',
  }
});