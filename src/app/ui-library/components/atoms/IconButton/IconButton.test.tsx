import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react-native';
import IconButton, { type Icon } from './IconButton';
import { Colors } from '@/ui/styles';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

describe('IconButton', () => {
  const testID = 'icon-button';
  const iconButton = () => screen.getByTestId(testID);
  const icon = () => iconButton().findByType(FontAwesome5);

  it.each([
    ['stop', 'stop'],
    ['play', 'play'],
  ])('renders with the correct icon %s', (iconName, expectedIcon) => {
    render(<IconButton icon={iconName as Icon} onPress={() => {}} testID={testID} />);

    expect(icon()).toHaveProp('name', expectedIcon);
  });

  it('calls onPress when pressed', () => {
    const onPressMock = jest.fn();
    render(<IconButton icon="play" onPress={onPressMock} testID={testID} />);
    fireEvent.press(iconButton());

    expect(onPressMock).toHaveBeenCalledTimes(1);
  });

  it.each([
    [Colors.RED, Colors.RED],
    [Colors.GREEN, Colors.GREEN],
  ])('applies the correct color %s', (colorName, expectedColor) => {
    render(<IconButton icon="play" onPress={() => {}} color={colorName} testID={testID} />);

    expect(icon()).toHaveProp('color', expectedColor);
  });

  it('applies the correct size', () => {
    render(<IconButton icon="play" onPress={() => {}} size={48} testID={testID} />);

    expect(icon()).toHaveProp('size', 48);
  });

  it('renders with the correct type', () => {
    render(<IconButton icon="play" onPress={() => {}} testID={testID} type="clean" />);

    expect(iconButton()).toHaveStyle({ borderColor: undefined, borderRadius: undefined, borderWidth: undefined });
  });
});
