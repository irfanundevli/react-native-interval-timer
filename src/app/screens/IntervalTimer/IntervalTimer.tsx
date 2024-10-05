import React, { useState } from 'react';
import { View, StyleSheet, Text, Button } from 'react-native';
import IntervalCard from './card';
import { useCountdown } from '@/hooks/countdown';
import { getIntervals } from '@/store';
import { millisecondsToTime } from '@/utils/time';

export default function IntervalTimer() {
    const [currIntervalIdx, setCurrIntervalIdx] = useState(0);
    const intervals = getIntervals();
    const currInterval = intervals[currIntervalIdx];
    const nextInterval = intervals[currIntervalIdx + 1];

    const {
        formattedTime: currIntervalRemaining,
        isFinished: isCountdownFinished,
        restart: restartCountdown,
        start: startCountdown,
        state: countdownState,
        stop: stopCountdown,
        time: currIntervalRemainingTime,
    } = useCountdown(currInterval.duration);

    if (isCountdownFinished) {
        const nIdx = currIntervalIdx + 1;
        const nInterval = intervals[nIdx];
        if (nInterval) {
            restartCountdown(nInterval.duration);
            setCurrIntervalIdx(nIdx);
        }
    }

    const totalRemainingTime =
        currIntervalRemainingTime + intervals.slice(currIntervalIdx + 1).reduce((acc, i) => acc + i.duration, 0);

    return (
        <View style={styles.container}>
            <View style={styles.center} testID="total-remaining-time">
                <Text style={styles.whiteText}>Remaining</Text>
                <Text style={styles.whiteText}>{millisecondsToTime(totalRemainingTime)}</Text>
            </View>

            <IntervalCard
                name={currInterval.name}
                testID="current-interval"
                time={currIntervalRemaining}
                type={currInterval.type}
            />

            {nextInterval && (
                <IntervalCard
                    name={nextInterval.name}
                    testID="next-interval"
                    time={millisecondsToTime(nextInterval.duration)}
                    type={nextInterval.type}
                />
            )}

            <View style={styles.footer}>
                <Text>{'3 Rounds Left'}</Text>
                {countdownState === 'RUNNING' ? (
                    <Button title="Stop" testID="stop" onPress={stopCountdown} />
                ) : (
                    <Button title="Start" testID="play" onPress={startCountdown} />
                )}
                <Text>{'3 Cycles Left'}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    center: {
        alignItems: 'center',
    },
    container: {
        alignItems: 'center',
        backgroundColor: 'black',
        flex: 1,
        justifyContent: 'space-between',
        padding: 40,
    },
    footer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    whiteText: {
        color: 'white',
    },
});
