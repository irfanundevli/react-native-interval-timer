import { Colors } from '@/utils/constants';
import type { IntervalType } from '@/store';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface Props {
  name: string;
  testID?: string;
  time: string;
  type: IntervalType;
}

export default function IntervalCard({ name, testID, time, type }: Props) {
  const textColor = getTextColor(type);

  return (
    <View style={styles.container} testID={testID}>
      <View style={styles.content}>
        <Text style={[{ color: textColor }, styles.name]}>{name}</Text>
        <Text style={[{ color: textColor }, styles.time]}>{time}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    padding: 8,
  },
  content: {
    flex: 1,
    alignItems: 'flex-end',
  },
  name: {
    fontWeight: '200',
    fontSize: 48,
  },
  time: {
    textAlign: 'center',
    fontWeight: '700',
    fontSize: 132,
    width: '100%',
  },
});

function getTextColor(intervalType: IntervalType): string {
  switch (intervalType) {
    case 'exercise':
      return Colors.RED;
    case 'rest':
      return Colors.BLUE;
    default:
      return Colors.WHITE;
  }
}
