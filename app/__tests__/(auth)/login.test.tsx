import { fireEvent, render, waitFor } from '@testing-library/react-native';
import React from 'react';
import LoginScreen from '../../../app/(auth)/login';
import { AuthProvider } from '../../../hooks/useAuth';

const renderWithAuth = (component: React.ReactNode) => {
  return render(
    <AuthProvider>
      {component}
    </AuthProvider>
  );
};

describe('Login Screen', () => {
  it('validates form inputs', async () => {
    const { getByPlaceholderText, getByText } = renderWithAuth(<LoginScreen />);
    
    const usernameInput = getByPlaceholderText('Username');
    const passwordInput = getByPlaceholderText('Password');
    
    fireEvent.changeText(usernameInput, '');
    fireEvent.changeText(passwordInput, '');
    fireEvent.press(getByText('Login'));
    
    await waitFor(() => {
      expect(getByText('Username is required')).toBeTruthy();
      expect(getByText('Password is required')).toBeTruthy();
    });
  });
}); 