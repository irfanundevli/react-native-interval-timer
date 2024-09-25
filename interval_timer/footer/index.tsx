import React from "react";
import { View, Button, StyleSheet } from "react-native";
import Badge from "../badge";

export default function Footer() {
  return (
    <View style={styles.container}>
      <Badge text="3 Rounds Left" />
      <Button title="Start" />
      <Badge text="3 Cycles Left" />
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
