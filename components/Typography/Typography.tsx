import { StyleSheet, Text, View } from "react-native";
import React from "react";


// Custom Imports
import { cn } from "../../lib/cn";

type TypographyProps = {
    children: React.ReactNode;
    variant?: "xsm" | "xsmb" | "sm" | 'smb' | "normal" | "xl" | "xxl";
    class?: string;
};

const Typography: React.FC<TypographyProps> = ({
    children,
    variant,
    class: className,
}) => {
    return (
        <Text
            className={cn(
                `
        text-black
        text-base
        font-Poppins
        `,
                variant === "xsm" && "text-xs",
                variant === "xsmb" && "text-xs font-PoppinsSemiBold",
                variant === "sm" && "text-sm",
                variant === "smb" && "text-sm font-PoppinsSemiBold",
                variant === "xl" && "text-xl font-PoppinsSemiBold",
                variant === "xxl" && "text-2xl font-PoppinsBold",
                className
            )}
        >
            {children}
        </Text>
    );
};

export default Typography;

const styles = StyleSheet.create({});
