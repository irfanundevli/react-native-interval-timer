import { Colors } from "@/utils/constants";
import type { IntervalType } from "@/store";
import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface Props {
  type: IntervalType;
  name: string;
  time: string;
}

export default function IntervalCard({ name, time, type }: Props) {
  const textColor = getTextColor(type);

  return (
    <View style={styles.container}>
      <Text style={{ color: textColor }}>{name}</Text>
      <Text style={{ color: textColor }}>{time}</Text>
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

function getTextColor(intervalType: IntervalType): string {
  switch (intervalType) {
    case "exercise":
      return Colors.RED;
    case "rest":
      return Colors.BLUE;
    default:
      return Colors.WHITE;
  }
}
