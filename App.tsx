import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet } from 'react-native';
import { IntervalTimer } from '@/screens/IntervalTimer';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { getWorkout } from './src/app/store';

export default function App() {
  const workout = getWorkout();

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <IntervalTimer workout={workout} />
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
