import { StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import RNDateTimePicker, {
    DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Typography from "../Typography/Typography";
import { cn } from "../../lib/cn";
import colors from "../../config/colors";

export default function DateTimePickers({
    date,
    onChange,
    title
}: {
    date: Date;
    onChange: (date: DateTimePickerEvent) => void;
    title:string
}) {
    const [show, setShow] = useState(false);

    const hanldeChange = (selectedDate: DateTimePickerEvent) => {
        setShow(false);
        if (onChange) {
            onChange(selectedDate);
        }
    };

    const showMode = () => {
        setShow(true);
    };
    return (
        <View>
            <View style={styles.container}>
                <View className={cn('my-1 relative bg-white border-[1px] placeholder:text-sm font-Poppins placeholder:font-Poppins text-sm border-black rounded-md w-full justify-between items-center py-3 px-3 placeholder:text-black flex-row')} style={{ gap: 1 }}>
                    <Typography variant='xsm' class='absolute z-10 left-3 -top-2 bg-white'>{title}</Typography>
                <TouchableOpacity onPress={showMode} className="flex-1 flex-row justify-between items-center" style={{gap:10}}>
                    <Typography variant="sm">
                        {date ? date.toLocaleDateString() : "Please select Date"}
                    </Typography>
                    <MaterialCommunityIcons name="calendar-month-outline" size={24} color={colors.primaryGreen} />
                </TouchableOpacity>
                </View>
            </View>
            {show && (
                <RNDateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode={"date"}
                    onChange={(e) => {
                        hanldeChange(e);
                    }}
                    // minimumDate={new Date()}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
    },
});
