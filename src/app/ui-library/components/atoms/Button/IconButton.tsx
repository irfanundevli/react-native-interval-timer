import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { Colors } from '@/ui/styles';

type Icon = 'play' | 'stop';

interface Props {
  color?: Colors;
  icon: Icon;
  onPress: () => void;
  size?: number;
  testID?: string;
}

export default function IconButton({ color = Colors.WHITE, icon, onPress, size = 24, testID }: Props) {
  return (
    <TouchableOpacity style={[styles.button, { borderColor: color }]} onPress={onPress} testID={testID}>
      <FontAwesome5 name={icon} size={size} color={color} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 24,
    borderWidth: 1,
    padding: 10,
  },
});
