import axios from 'axios';

// Define the User interface
interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: 'admin' | 'attendant';
}

// Base URL for JSONPlaceholder API
const API_URL = 'https://67ac71475853dfff53dab929.mockapi.io/api/v1';

// Function to fetch users and simulate login
export const loginUser = async (username: string, password: string): Promise<{ user: User; token: string }> => {
  try {
    // Fetch user by username
    const response = await axios.get(`${API_URL}/users?username=${username}`);
    const users = response.data;

    // Find user by username
    const userData = users[0]; // Since we're querying by username, we should get at most one user

    if (!userData) {
      throw new Error('Username not found');
    }

    // Simulate password check (in a real app, this would be an API endpoint)
    const storedPassword = userData.password;
    if (!storedPassword || storedPassword !== password) {
      throw new Error('Incorrect password');
    }

    // Map API user data to our User interface
    const safeUser: User = {
      id: userData.id.toString(),
      firstName: userData.firstName || userData.name || '',
      lastName: userData.lastName || '',
      email: userData.email || userData.username,
      role: userData.role || 'attendant', // Default to attendant if role not specified
    };

    // Mock JWT token
    const token = `jwt-token-${Date.now()}-${userData.id}`;

    return {
      user: safeUser,
      token,
    };
  } catch (error: unknown) {
    console.error('Login error:', error);
    // If it's our custom error (username not found or incorrect password), throw it directly
    if (error instanceof Error && (error.message === 'Username not found' || error.message === 'Incorrect password or username')) {
      throw error;
    }
    // For other errors (like network errors), throw a generic error
    if (axios.isAxiosError(error)) {
      throw new Error('Network error. Please check your connection.');
    }
    throw new Error('An unexpected error occurred');
  }
};