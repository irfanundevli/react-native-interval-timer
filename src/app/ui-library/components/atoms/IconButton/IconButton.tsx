import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Colors } from '@/ui/styles';

export type Icon = 'play' | 'refresh' | 'stop' | 'timer-cog-outline' | 'close';
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
      {getIcon(color, icon, size)}
    </TouchableOpacity>
  );
}

function getIcon(color: Colors, icon: Icon, size: number) {
  switch (icon) {
    case 'refresh':
      return <Ionicons name={icon} size={size} color={color} />;
    case 'play':
    case 'stop':
      return <FontAwesome5 name={icon} size={size} color={color} />;
    case 'close':
    case 'timer-cog-outline':
      return <MaterialCommunityIcons name={icon} size={size} color={color} />;
    default:
      return null;
  }
}

const styles = StyleSheet.create({
  button: {
    padding: 10,
  },
});
