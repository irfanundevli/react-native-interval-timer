import { View } from 'react-native';
import { TimerPicker } from 'react-native-timer-picker';
import { LinearGradient } from 'expo-linear-gradient';
import { Audio } from 'expo-av';
import * as Haptics from 'expo-haptics';

interface Time {
  minutes: number;
  seconds: number;
}

interface Props {
  initialValue?: Time;
  onTimeChange?: (time: Time) => void;
}

export default function TimePicker({ initialValue, onTimeChange }: Props) {
  return (
    <View style={{ alignItems: 'center', justifyContent: 'center', right: -10, paddingVertical: 10 }}>
      <TimerPicker
        Audio={Audio}
        Haptics={Haptics}
        hideHours
        initialValue={initialValue}
        LinearGradient={LinearGradient}
        minuteLabel=":"
        onDurationChange={onTimeChange}
        padWithNItems={2}
        secondLabel=""
        styles={{
          backgroundColor: 'transparent',
          pickerContainer: {
            margin: 0,
          },
          pickerItemContainer: {
            width: 30,
            height: 30,
          },
          pickerItem: {
            fontSize: 14,
          },
          pickerLabelContainer: {
            right: -4,
            bottom: 6,
          },
          pickerLabel: {
            fontSize: 12,
          },
        }}
      />
    </View>
  );
}
