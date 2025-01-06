import { View, StyleSheet, ViewStyle } from 'react-native';
import { Colors } from '../../../styles';

interface Props {
  color?: string;
  spaceStyle?: Pick<ViewStyle, 'marginVertical' | 'paddingHorizontal'>;
  height?: number;
}

export default function Divider({ color = Colors.WHITE, height = 1, spaceStyle }: Props) {
  return (
    <View style={[styles.container, spaceStyle]}>
      <View style={[styles.divider, { backgroundColor: color }, { height }]}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  divider: {
    height: 1,
    width: '100%',
  },
});
