import React from "react";
import { View, Button } from "react-native";
import Badge from "../badge";

export default function Footer() {
  return (
    <View>
      <Badge text="3 Rounds Left" />
      <Button title="Start" />
      <Badge text="3 Cycles Left" />
    </View>
  );
}
