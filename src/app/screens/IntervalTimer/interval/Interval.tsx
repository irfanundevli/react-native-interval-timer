import { Colors } from '@/ui/styles';
import type { IntervalType } from '@/store';
import { View, Text, StyleSheet } from 'react-native';
import type { TextStyle } from 'react-native';

type Size = 'md' | '2xl';
interface Props {
  name: string;
  size: Size;
  testID?: string;
  time: string;
  type: IntervalType;
}

export default function IntervalCard({ name, size, testID, time, type }: Props) {
  const nameSize = getNameSizeStyle(size);
  const timeSize = getTimeSizeStyle(size);

  return (
    <View style={styles.container} testID={testID}>
      <View style={styles.content}>
        <Text style={[{ color: Colors.WHITE }, nameSize]}>{name}</Text>
        <Text style={[{ color: Colors.WHITE }, styles.time, timeSize]}>{time}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  content: {
    flex: 1,
    alignItems: 'center',
  },
  time: {
    textAlign: 'center',
    width: '100%',
  },
});

function getNameSizeStyle(size: Size): Partial<TextStyle> {
  switch (size) {
    case '2xl':
      return {
        fontSize: 48,
        fontWeight: '200',
      };
    default:
      return {
        fontSize: 24,
        fontWeight: '200',
      };
  }
}

function getTimeSizeStyle(size: Size): Partial<TextStyle> {
  switch (size) {
    case '2xl':
      return { fontWeight: '700', fontSize: 112 };
    default:
      return {
        fontSize: 64,
        fontWeight: '200',
      };
  }
}
