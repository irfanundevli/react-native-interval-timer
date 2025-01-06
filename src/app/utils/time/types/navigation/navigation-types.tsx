export type RootStackParamList = {
  IntervalTimer: undefined;
  IntervalSettings: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
