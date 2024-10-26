import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react-native';
import IconButton from './IconButton';
import { Colors } from '@/ui/styles';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

describe('IconButton', () => {
  it('renders with the correct icon', () => {
    const { getByTestId } = render(<IconButton icon="stop" onPress={() => {}} testID="icon-button" />);

    const icon = getByTestId('icon-button').findByType(FontAwesome5);
    expect(icon.props.name).toBe('stop');
  });

  it('calls onPress when pressed', () => {
    const onPressMock = jest.fn();
    render(<IconButton icon="play" onPress={onPressMock} testID="icon-button" />);
    fireEvent.press(screen.getByTestId('icon-button'));

    expect(onPressMock).toHaveBeenCalledTimes(1);
  });

  it('applies the correct color', () => {
    render(<IconButton icon="play" onPress={() => {}} color={Colors.RED} testID="icon-button" />);

    const button = screen.getByTestId('icon-button');
    expect(button.props.style.borderColor).toBe(Colors.RED);
  });

  it('applies the correct size', () => {
    render(<IconButton icon="play" onPress={() => {}} size={48} testID="icon-button" />);

    const icon = screen.getByTestId('icon-button').findByType(FontAwesome5);
    expect(icon.props.size).toBe(48);
  });
});
