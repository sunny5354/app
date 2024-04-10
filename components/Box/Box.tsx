import { StyleSheet, View } from "react-native";
import React from "react";


// custom imports
import Typography from "../Typography/Typography";

type BoxProps = {
    heading: string;
    children: React.ReactNode;
};

const Box: React.FC<BoxProps> = ({ children,heading }) => {

    return (
        <View className="bg-primaryCreamLight min-h-[200px] w-full rounded-xl overflow-hidden border border-primaryLightGreen">
            <View className="relative h-12 pl-2 justify-center  bg-primaryDarkGreen">
                <Typography variant="sm" class="text-white">{heading}</Typography>
            </View>
            <View className="flex-1 w-full">
                {children}
            </View>
        </View>
    );
};

export default Box;

const styles = StyleSheet.create({});
