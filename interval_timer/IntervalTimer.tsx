import React from "react";
import { View, StyleSheet } from "react-native";
import Header from "./header";
import Footer from "./footer";
import Step from "./step";

export default function IntervalTimer() {
  return (
    <View style={styles.container}>
      <Header />

      <Step name={"Prepare"} time={"00:05"} />

      <Step name={"Exercise"} time={"00:30"} />

      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
    flex: 1,
    justifyContent: "space-between",
    padding: 40,
  },
});
