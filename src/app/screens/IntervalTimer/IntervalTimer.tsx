import React from "react";
import { View, StyleSheet } from "react-native";
import Header from "./header";
import Footer from "./footer";
import IntervalCard from "./card";
import { useCountdown } from "@/hooks/countdown";

export default function IntervalTimer() {
  const { start: startCountdown, time } = useCountdown(60 * 1000);

  return (
    <View style={styles.container}>
      <Header />

      <IntervalCard name={"Prepare"} time={time} />

      <IntervalCard name={"Exercise"} time={"00:30"} />

      <Footer onStart={startCountdown} />
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
