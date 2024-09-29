import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import Header from "./header";
import Footer from "./footer";
import IntervalCard from "./card";
import { useCountdown } from "@/hooks/countdown";
import { getIntervals } from "@/store";
import { millisecondsToTime } from "@/utils/time";

export default function IntervalTimer() {
  const [currIntervalIdx] = useState(0);
  const intervals = getIntervals();
  const currInterval = intervals[currIntervalIdx];
  const nextInterval = intervals[currIntervalIdx + 1];

  const { start: startCountdown, time: currIntervalRemaining } = useCountdown(
    currInterval.duration
  );

  return (
    <View style={styles.container}>
      <Header />

      <IntervalCard
        name={currInterval.name}
        time={currIntervalRemaining}
        type={currInterval.type}
      />

      {nextInterval && (
        <IntervalCard
          name={nextInterval.name}
          time={millisecondsToTime(nextInterval.duration)}
          type={nextInterval.type}
        />
      )}

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
