import { type Workout } from '@/store';

export type RootStackParamList = {
  IntervalTimer: { workout: Workout };
  IntervalSettings: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
