import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Header() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Remaining</Text>
            <Text style={styles.text}>00:35</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
    text: {
        color: 'white',
    },
});
