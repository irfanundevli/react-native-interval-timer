import React from "react";
import { View, Text } from "react-native";
import Header from "./header";
import Footer from "./footer";
import Step from "./step";

export default function IntervalTimer() {
  return (
    <View>
      <Header />

      <Step name={"Prepare"} time={"00:05"} />

      <Step name={"Exercise"} time={"00:30"} />

      <Footer />
    </View>
  );
}
