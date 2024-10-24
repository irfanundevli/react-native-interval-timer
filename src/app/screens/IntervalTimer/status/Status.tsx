import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface Props {
  name: string;
  testID: string;
  value: string;
}

export default function Status({ name, testID, value }: Props) {
  return (
    <View style={styles.center} testID={testID}>
      <Text style={[styles.white, styles.value]}>{value}</Text>
      <Text style={[styles.white, styles.name]}>{name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: {
    fontSize: 10,
    fontWeight: '300',
  },
  white: {
    color: 'white',
  },
  value: {
    fontSize: 20,
    fontWeight: '600',
  },
});
