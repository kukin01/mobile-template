import { render } from '@testing-library/react-native';
import Button from '../Button';

describe('Button Component', () => {
  it('renders with primary style', () => {
    const { getByText } = render(
      <Button title="Test Button" onPress={() => {}} type="primary" />
    );
    expect(getByText('Test Button')).toBeTruthy();
  });

  it('handles disabled state', () => {
    const { getByText } = render(
      <Button title="Test Button" onPress={() => {}} disabled={true} />
    );
    const button = getByText('Test Button');
    expect(button.props.style).toContainEqual(expect.objectContaining({
      opacity: expect.any(Number)
    }));
  });
}); 