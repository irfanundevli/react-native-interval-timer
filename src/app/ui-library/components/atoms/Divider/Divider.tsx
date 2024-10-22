import { View, StyleSheet } from 'react-native';
import { Colors } from '../../../styles';

interface Props {
  color?: string;
}

export default function Divider({ color = Colors.WHITE }: Props) {
  return <View style={[styles.divider, { backgroundColor: color }]}></View>;
}

const styles = StyleSheet.create({
  divider: {
    height: 1,
    width: '100%',
  },
});
