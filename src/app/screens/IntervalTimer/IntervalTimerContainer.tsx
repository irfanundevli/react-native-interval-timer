import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { useWorkout } from './useWorkout';
import IntervalTimer from './IntervalTimer';

export default function IntervalTimerContainer() {
  const navigation = useNavigation();
  const workout = useWorkout();

  if (!workout) return null;

  return <IntervalTimer onTimerConfigPress={() => navigation.navigate('IntervalSettings')} workout={workout} />;
}
