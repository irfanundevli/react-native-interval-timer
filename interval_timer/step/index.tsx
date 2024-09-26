import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface Props {
  name: string;
  time: string;
}

export default function Step({ name, time }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{name}</Text>
      <Text style={styles.text}>{time}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  text: {
    color: "white",
  },
});
