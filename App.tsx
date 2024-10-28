import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet } from 'react-native';
import { IntervalTimer } from '@/screens/IntervalTimer';
import { IntervalSettings } from '@/screens/IntervalSettings';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { getWorkout } from '@/store';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function App() {
  const workout = getWorkout();

  return (
    <NavigationContainer>
      <SafeAreaProvider>
        <SafeAreaView style={styles.container}>
          <Stack.Navigator initialRouteName="IntervalTimer">
            <Stack.Screen name="IntervalTimer">{() => <IntervalTimer workout={workout} />}</Stack.Screen>
            <Stack.Screen name="IntervalSettings" component={IntervalSettings} />
          </Stack.Navigator>
          <StatusBar style="auto" />
        </SafeAreaView>
      </SafeAreaProvider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
