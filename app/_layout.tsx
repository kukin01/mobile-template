import { Stack } from "expo-router";
import { ToastProvider } from 'react-native-toast-notifications';
import { AuthProvider } from '../hooks/useAuth';
import "./globals.css";

export default function RootLayout() {
  return (
    <AuthProvider>
      <ToastProvider>
        <Stack>
          <Stack.Screen
            name="index"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="(auth)/login"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="(tabs)"
            options={{ headerShown: false }}
          />
        </Stack>
      </ToastProvider>
    </AuthProvider>
  );
}