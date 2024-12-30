import React from 'react';
import { Pressable, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';

interface Props {
  onPress: () => void;
  style?: ViewStyle;
  textStyle?: TextStyle;
  title: string;
}

export default function Button({ title, onPress, style, textStyle }: Props) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.button, style, pressed && styles.pressed]}>
      <Text style={[styles.text, textStyle]}>{title}</Text>
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
