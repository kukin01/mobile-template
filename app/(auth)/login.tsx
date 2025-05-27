import Button from '@/components/Button';
import InputField from '@/components/InputField';
import { useAuth } from '@/hooks/useAuth';
import { Link } from 'expo-router';
import React, { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function LoginScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ username: '', password: '' });
  const { login, isLoading } = useAuth();

  const validateForm = () => {
    let valid = true;
    const newErrors = { username: '', password: '' };

    if (!username.trim()) {
      newErrors.username = 'Username is required';
      valid = false;
    }

    if (!password) {
      newErrors.password = 'Password is required';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleLogin = async () => {
    if (validateForm()) {
      try {
        console.log('Attempting login with:', { username, password });
        await login(username, password);
      } catch (error) {
        const err = error as Error;
        console.error('Login error:', err);
        // Enhanced error message for mobile
        const errorMessage = err.message.includes('Network Error')
          ? 'Network error: Please check your internet connection and try again.'
          : err.message || 'An unexpected error occurred. Please try again.';
        Alert.alert('Login Error', errorMessage, [
          { text: 'OK', onPress: () => console.log('Alert closed') },
        ]);
      }
    } else {
      Alert.alert('Validation Error', 'Please correct the errors in the form.');
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 20} // Adjusted for Android
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled" // Ensures taps dismiss the keyboard
      >
        <View style={styles.headerContainer}>
          <Text style={styles.title}>XWZ Parking</Text>
          <Text style={styles.subtitle}>Welcome back! Please sign in to your account</Text>
        </View>

        <View style={styles.formContainer}>
          <InputField
            label="Username"
            value={username}
            onChangeText={setUsername}
            placeholder="Enter your username"
            keyboardType="email-address"
            error={errors.username}
            autoCapitalize="none" // Prevents auto-capitalization on mobile
          />

          <InputField
            label="Password"
            value={password}
            onChangeText={setPassword}
            placeholder="Enter your password"
            secureTextEntry
            error={errors.password}
            autoCapitalize="none" // Prevents auto-capitalization on mobile
          />

          <Button
            title="Sign In"
            onPress={handleLogin}
            loading={isLoading}
            disabled={isLoading} // Disable button during loading
            style={styles.loginButton}
          />

          <View style={styles.footerContainer}>
            <Text style={styles.footerText}>Don't have an account? </Text>
            <Link href="/register" asChild>
              <TouchableOpacity>
                <Text style={styles.signupText}>Sign Up</Text>
              </TouchableOpacity>
            </Link>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 24,
    justifyContent: 'center',
  },
  headerContainer: {
    marginBottom: 40,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 36,
    color: '#1E40AF',
    marginBottom: 12,
    letterSpacing: 0.5,
  },
  subtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 24,
  },
  formContainer: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  loginButton: {
    marginTop: 32,
    height: 50,
    borderRadius: 12,
    backgroundColor: '#1E40AF',
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 32,
    paddingTop: 24,
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
  },
  footerText: {
    fontFamily: 'Inter-Regular',
    color: '#64748B',
    fontSize: 15,
  },
  signupText: {
    fontFamily: 'Inter-SemiBold',
    color: '#1E40AF',
    fontSize: 15,
    marginLeft: 4,
  },
});