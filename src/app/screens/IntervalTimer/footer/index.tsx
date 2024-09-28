import React from "react";
import { View, Button, StyleSheet, Text } from "react-native";

export default function Footer() {
  return (
    <View style={styles.container}>
      <Text>{"3 Rounds Left"}</Text>
      <Button title="Start" />
      <Text>{"3 Cycles Left"}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
