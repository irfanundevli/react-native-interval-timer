import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface Props {
  text: string;
}

export default function Badge({ text }: Props) {
  return (
    <View>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    color: "white",
  },
});
