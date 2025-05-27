import axios from 'axios';


const API_URL = 'https://67ac71475853dfff53dab929.mockapi.io/api/v1/expenses';

export interface Expense {
  id: string;
  name: string;
  amount: number;
  description: string;
  userId?: string;
  category: string;
  createdAt: string;
}

export const addExpense = async (expenseData: Expense): Promise<Expense> => {
  try {
    const response = await axios.post(API_URL, expenseData);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Failed to add expense');
    }
    throw new Error('An unexpected error occurred');
  }
};

export const getExpenses = async (): Promise<Expense[]> => {
  try {
    console.log('Fetching expenses from:', API_URL);
    const response = await axios.get(API_URL);
    console.log('API Response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching expenses:', error);
    if (axios.isAxiosError(error)) {
      console.error('Axios error details:', {
        status: error.response?.status,
        data: error.response?.data,
        headers: error.response?.headers
      });
      throw new Error(error.response?.data?.message || 'Failed to fetch expenses');
    }
    throw new Error('An unexpected error occurred');
  }
};

export const deleteExpense = async (expenseId: string): Promise<void> => {
  try {
    await axios.delete(`${API_URL}/${expenseId}`);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Failed to delete expense');
    }
    throw new Error('An unexpected error occurred');
  }
}; 