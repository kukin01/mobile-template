import axios from 'axios';
import { addExpense, getExpenses } from '../expenseServices';

jest.mock('axios');

describe('Expense Services', () => {
  it('fetches expenses successfully', async () => {
    const mockExpenses = [
      { id: '1', name: 'Test Expense', amount: 100 }
    ];
    
    (axios.get as jest.Mock).mockResolvedValue({ data: mockExpenses });
    
    const result = await getExpenses();
    expect(result).toEqual(mockExpenses);
  });

  it('handles expense creation', async () => {
    const newExpense = {
      name: 'New Expense',
      amount: 200,
      description: 'Test description',
      category: 'Test',
      createdAt: new Date().toISOString(),
      id: ''
    };
    
    (axios.post as jest.Mock).mockResolvedValue({ data: { ...newExpense, id: '1' } });
    
    const result = await addExpense(newExpense);
    expect(result).toHaveProperty('id');
  });
});