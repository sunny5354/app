import { View } from "react-native";
import React, { useState } from "react";
import Slider from "@react-native-community/slider";

//
import colors from "../../config/colors";
import Typography from "../Typography/Typography";

const RangeSlideExample = () => {
    const [fromValue, setFromValue] = useState(0);
    const [toValue, setToValue] = useState(0);
    const [value, setValue] = useState(0);

    return (
        <View className="flex-1">
            <Slider
                style={{ height: 40 }}
                minimumValue={0}
                maximumValue={1000}
                minimumTrackTintColor={colors.primaryDarkGreen}
                maximumTrackTintColor={colors.primaryLightGreen}
                thumbTintColor={colors.primaryDarkGreen}
                step={10}
                onValueChange={(value) => setValue(value)}
            />
            <View className="flex-row justify-around">
                <Typography variant="xsm">Min: 0</Typography>
                <Typography variant="xsm">Current: {value}</Typography>
                <Typography variant="xsm">Max: 1400</Typography>
            </View>
        </View>
    );
};

export default RangeSlideExample;
