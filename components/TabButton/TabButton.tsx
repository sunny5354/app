import { Pressable, View } from "react-native";
import React from "react";
import Typography from "../Typography/Typography";
import { cn } from "../../lib/cn";

interface TabButtonProps {
    selectedTab: number;
    handleTabChange: (index: number) => void;
    title1: string;
    title2: string;
}

const TabButton: React.FC<TabButtonProps> = ({
    selectedTab,
    handleTabChange,
    title1,
    title2,
}) => {
    return (
        <View>
            <View
                className="flex-row border bg-primaryCreamLight border-primaryDarkGreen w-4/5 p-1 justify-center rounded-lg overflow-hidden"
                style={{ gap: 3 }}
            >
                <Pressable
                    onPress={() => handleTabChange(0)}
                    className={cn(
                        "flex-1 justify-center rounded-xl py-1 items-center",
                        selectedTab === 0
                            ? "bg-primaryDarkGreen"
                            : "bg-primaryCreamLight"
                    )}
                >
                    <Typography
                        variant="smb"
                        class={cn(
                            "text-black",
                            selectedTab === 0 ? "text-white" : "text-black"
                        )}
                    >
                        {title1}
                    </Typography>
                </Pressable>
                <Pressable
                    onPress={() => {
                        handleTabChange(1);
                    }}
                    className={cn(
                        "flex-1 py-1 px-2 rounded-xl justify-center items-center",
                        selectedTab === 1
                            ? "bg-primaryDarkGreen"
                            : "bg-primaryCreamLight"
                    )}
                >
                    <Typography
                        variant="smb"
                        class={cn(
                            "text-black",
                            selectedTab === 1 ? "text-white" : "text-black"
                        )}
                    >
                        {title2}
                    </Typography>
                </Pressable>
            </View>
        </View>
    );
};

export default TabButton;
