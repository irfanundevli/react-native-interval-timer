import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Colors } from '@/ui/styles';

export type Icon = 'play' | 'refresh' | 'stop';
type Type = 'clean' | 'outline';

interface Props {
  color?: Colors;
  icon: Icon;
  onPress: () => void;
  size?: number;
  testID?: string;
  type?: Type;
}

export default function IconButton({
  color = Colors.WHITE,
  icon,
  onPress,
  size = 24,
  testID,
  type = 'outline',
}: Props) {
  const typeStyle = type === 'outline' ? { borderColor: color, borderRadius: 24, borderWidth: 1 } : {};

  return (
    <TouchableOpacity style={[styles.button, typeStyle]} onPress={onPress} testID={testID}>
      {icon === 'refresh' ? (
        <Ionicons name="refresh" size={size} color={color} />
      ) : (
        <FontAwesome5 name={icon} size={size} color={color} />
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 10,
  },
});
