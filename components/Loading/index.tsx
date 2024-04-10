import { MotiText, MotiView, View } from "moti";
import React from "react";

const Loading = () => {
    return (
        <View className="flex-1 bg-primaryCream justify-center items-center">
            <MotiView
                from={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                    loop: true,
                    type: "timing",
                    duration: 800,
                }}
                style={{ flexDirection: "row", alignItems: "flex-start" }}
            >
                <MotiText
                    style={{
                        fontSize: 22,
                        lineHeight: 30,
                        fontFamily: "Poppins-Bold",
                    }}
                >
                    SunCarbon.
                </MotiText>
                <MotiText style={{ fontSize: 7, lineHeight: 18 }}>TM</MotiText>
            </MotiView>
        </View>
    );
};

export default Loading;
