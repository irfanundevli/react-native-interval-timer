import { Text, View, Modal, StyleSheet } from 'react-native';
import { Button, IconButton } from '@/ui/components';
import TimePicker from '@/ui/components/third-party/TimePicker/TimePicker';
import { Colors } from '@/ui/styles';
import { useState } from 'react';

interface Props {
  description?: string;
  initialValue?: number;
  title: string;
  visible: boolean;
  onApply: (value: number) => void;
  toggleVisibility: () => void;
}

export default function NumberPickerModal({
  description = 'Choose duration',
  initialValue = 1,
  onApply,
  title,
  toggleVisibility,
  visible,
}: Props) {
  const [value, setValue] = useState(initialValue);

  const handleApply = () => {
    onApply(value);
    toggleVisibility();
  };

  const handleValueChange = (pickerValue: { seconds: number }) => {
    setValue(pickerValue.seconds);
  };

  return (
    <Modal animationType="slide" visible={visible} onRequestClose={toggleVisibility} transparent>
      <View style={styles.modalView}>
        <Text style={styles.title} testID="numberPickerModalTitle">
          {title}
        </Text>
        <Text style={styles.description}>{description}</Text>
        <View style={{ position: 'absolute', right: 4, top: 12 }}>
          <IconButton icon="close" onPress={toggleVisibility} color={Colors.BLACK} type="clean" />
        </View>

        <TimePicker initialValue={{ seconds: initialValue }} onTimeChange={handleValueChange} hideMinutes />

        <Button title="Apply" onPress={handleApply} />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalView: {
    alignItems: 'center',
    backgroundColor: 'white',
    height: 300,
    width: '100%',
    padding: 20,
    position: 'absolute',
    bottom: 0,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
  },
  description: {
    fontSize: 14,
    fontWeight: '400',
    color: 'gray',
  },
});
