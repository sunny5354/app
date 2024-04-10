import { Text, View,Image } from "react-native";
import React from "react";
import { Pressable } from "react-native";

// Custom Imports
import { cn } from "../../lib/cn";
import loading from "../../assets/loading2.gif"

type ButtonProps = {
    children: React.ReactNode;
    classView?:string,
    onPress?: (values:any) => void;
    disabled?: boolean;
    showLoader?: boolean;
    variant?: "primary" | "secondary" | "verified" | "pending" | 'delete' | 'cancel';
    className?: string;
    my?: number;
} & React.ComponentProps<typeof Pressable>;

const Button: React.FC<ButtonProps> = ({
    children,
    classView,
    onPress,
    disabled,
    showLoader,
    className,
    variant,
    my,
    ...otherProps
}) => {
    return (
        <View className={cn("overflow-hidden my-1 flex-1",`my-${my}`,classView)}>
            <Pressable
                onPress={onPress}
                disabled={disabled}
                className={cn(
                    `
                    bg-primaryGreen
                flex-row 
                py-3 
                px-8
                overflow-hidden 
                rounded-lg
                justify-center 
                items-center`,
                disabled && "opacity-50",
                variant === "secondary" &&
                "bg-white border border-primaryGreen",
                variant === 'verified' && "bg-primaryLightGreen",
                variant === 'pending' && 'bg-primaryRed',
                variant === 'delete' && 'bg-primaryRed',
                variant === 'cancel' && 'bg-gray-600',
                className
                )}
                {...otherProps}
            >
                {!showLoader && <Text
                    className={cn(
                        `text-white text-center justify-center items-center font-PoppinsMedium text-sm`,
                        variant === "secondary" && "text-primaryGreen"
                    )}
                >
                    {children}
                </Text>}
                {showLoader && <Image className="h-6 w-10" source={loading} alt="gif" />}
            </Pressable>
        </View>
    );
};

export default Button;
