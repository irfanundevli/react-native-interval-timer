import { View } from 'react-native';
import { TimerPicker } from 'react-native-timer-picker';
import { LinearGradient } from 'expo-linear-gradient';
import { Audio } from 'expo-av';
import * as Haptics from 'expo-haptics';

interface Props {
  hideHours?: boolean;
}

export default function TimePicker({ hideHours = true }: Props) {
  return (
    <View style={{ alignItems: 'center', justifyContent: 'center', right: -10, paddingVertical: 10 }}>
      <TimerPicker
        padWithNItems={2}
        hideHours={hideHours}
        hourLabel=":"
        minuteLabel=":"
        secondLabel=""
        Audio={Audio}
        LinearGradient={LinearGradient}
        Haptics={Haptics}
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
