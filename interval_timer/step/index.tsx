import React from "react";
import { View, Text } from "react-native";

interface Props {
  name: string;
  time: string;
}

export default function Step({ name, time }: Props) {
  return (
    <View>
      <Text>{name}</Text>
      <Text>time</Text>
    </View>
  );
}
