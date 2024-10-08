import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet } from 'react-native';
import { IntervalTimer } from '@/screens/IntervalTimer';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function App() {
    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
                <IntervalTimer />
                <StatusBar style="auto" />
            </SafeAreaView>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
