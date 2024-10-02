import React from 'react';
import { View, Button, StyleSheet, Text } from 'react-native';

interface Props {
    onStart: () => void;
}

export default function Footer({ onStart }: Props) {
    return (
        <View style={styles.container}>
            <Text>{'3 Rounds Left'}</Text>
            <Button title="Start" testID="play" onPress={onStart} />
            <Text>{'3 Cycles Left'}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
});
