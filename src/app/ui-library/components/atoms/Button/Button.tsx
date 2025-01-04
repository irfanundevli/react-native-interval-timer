import React from 'react';
import { Pressable, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';

interface Props {
  children?: React.ReactNode;
  onPress: () => void;
  style?: ViewStyle;
  testID?: string;
  textStyle?: TextStyle;
  title?: string;
}

export default function Button({ children, title, onPress, style, testID, textStyle }: Props) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.button, style, pressed && styles.pressed]}
      testID={testID}
    >
      {title && <Text style={[styles.text, textStyle]}>{title}</Text>}
      {children}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: 'black',
    padding: 10,
    width: '100%',
  },
  pressed: {
    opacity: 0.75,
  },
  text: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
