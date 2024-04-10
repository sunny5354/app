import { Pressable, StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Typography from "../Typography/Typography";
import { cn } from "../../lib/cn";
import colors from "../../config/colors";
import DateTimePickerModal from "react-native-modal-datetime-picker";



export default function TimePicker({
  time,
  onChange,
  title
}: {
  time: string;
  onChange: (date: string) => void;
  title: string
}) {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date: Date) => {
    const str = (new Date(date).toTimeString()).slice(0, 5);
    onChange(str);
    hideDatePicker();
    setDatePickerVisibility(false);
  };

  return (
    <View>
      <View style={styles.container}>
        <View className={cn('my-1 relative bg-white border-[1px] placeholder:text-sm font-Poppins placeholder:font-Poppins text-sm border-black rounded-md w-full justify-between items-center py-3 px-3 placeholder:text-black flex-row')} style={{ gap: 1 }}>
          <Typography variant='xsm' class='absolute z-10 left-3 -top-2 bg-white'>{title}</Typography>
          <Pressable onPress={showDatePicker} className="flex-1 flex-row justify-between items-center" style={{ gap: 10 }}>
            <Typography variant="sm">
              {time ? time : "Please select"}
            </Typography>
            <MaterialCommunityIcons name="clock" size={24} color={colors.primaryGreen} />
          </Pressable>
        </View>
      </View>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="time"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
  },
});
