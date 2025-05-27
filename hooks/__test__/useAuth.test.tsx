import AsyncStorage from '@react-native-async-storage/async-storage';
import { act, renderHook } from '@testing-library/react';
import { useAuth } from '../useAuth';

jest.mock('@react-native-async-storage/async-storage');

describe('useAuth Hook', () => {
  beforeEach(() => {
    AsyncStorage.clear();
  });

  it('handles login successfully', async () => {
    const { result } = renderHook(() => useAuth());
    
    await act(async () => {
      await result.current.login('test@example.com', 'password123');
    });
    
    expect(result.current.user).toBeTruthy();
    expect(AsyncStorage.setItem).toHaveBeenCalledWith('user', expect.any(String));
  });
});