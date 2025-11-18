import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

type ButtonType = "primary" | "secondary" | "base";

interface ButtonProps {
    icon?: keyof typeof Ionicons.glyphMap;
    iconSize?: number;
    title?: string;
    type: ButtonType;
    disabled?: boolean;
    onPress: () => void;
    customColor?: string;
}

export default function Button({
    icon,
    iconSize = 24,
    title,
    type,
    disabled = false,
    onPress,
    customColor,
}: ButtonProps) {
    // Icon-only button: circular with icon, no background
    if (icon && !title) {
        return (
            <TouchableOpacity
                onPress={onPress}
                disabled={disabled}
                className={`items-center justify-center ${disabled ? "opacity-50" : ""}`}
                activeOpacity={0.7}
            >
                <Ionicons
                    name={icon}
                    size={iconSize}
                    color={
                        type === "primary"
                            ? customColor || "#4B164C"
                            : type === "secondary"
                              ? "#4B164C"
                              : "#374151"
                    }
                />
            </TouchableOpacity>
        );
    }

    // Get button styles based on type
    const getButtonStyles = () => {
        if (customColor) {
            switch (type) {
                case "primary":
                    return {
                        containerClass:
                            "rounded-full w-full flex-row items-center px-3 py-3",
                        containerStyle: { backgroundColor: customColor },
                        textClass:
                            "text-white font-semibold text-base flex-1 text-center",
                        iconBgClass: "bg-white rounded-full p-2",
                    };
                case "secondary":
                    return {
                        containerClass:
                            "rounded-full w-full flex-row items-center px-3 py-3",
                        containerStyle: {
                            backgroundColor: "rgba(221, 136, 207, 0.1)",
                        },
                        textClass:
                            "text-[#4B164C] font-semibold text-base flex-1 text-center",
                        iconBgClass: "bg-white rounded-full p-2",
                    };
                case "base":
                default:
                    return {
                        containerClass:
                            "rounded-full w-full flex-row items-center px-3 py-3 bg-gray-100",
                        textClass: "font-semibold text-base flex-1 text-center",
                        textStyle: { color: customColor },
                        iconBgClass: "bg-white rounded-full p-2",
                    };
            }
        }

        // Default colors without customColor
        switch (type) {
            case "primary":
                return {
                    containerClass:
                        "rounded-full w-full flex-row items-center px-3 py-3 bg-[#4B164C]",
                    textClass:
                        "text-white font-semibold text-base flex-1 text-center",
                    iconBgClass: "bg-white rounded-full p-2",
                };
            case "secondary":
                return {
                    containerClass:
                        "rounded-full w-full flex-row items-center px-3 py-3",
                    containerStyle: {
                        backgroundColor: "rgba(221, 136, 207, 0.1)",
                    },
                    textClass:
                        "text-[#4B164C] font-semibold text-base flex-1 text-center",
                    iconBgClass: "bg-white rounded-full p-2",
                };
            case "base":
            default:
                return {
                    containerClass:
                        "rounded-full w-full flex-row items-center px-3 py-3 bg-gray-100",
                    textClass:
                        "text-gray-800 font-semibold text-base flex-1 text-center",
                    iconBgClass: "bg-white rounded-full p-2",
                };
        }
    };

    const styles = getButtonStyles();

    return (
        <TouchableOpacity
            onPress={onPress}
            disabled={disabled}
            className={`${styles.containerClass} ${disabled ? "opacity-50" : ""}`}
            style={styles.containerStyle}
            activeOpacity={0.7}
        >
            {icon && (
                <View className={styles.iconBgClass}>
                    <Ionicons
                        name={icon}
                        size={iconSize}
                        color={
                            type === "primary"
                                ? customColor || "#4B164C"
                                : type === "secondary"
                                  ? "#4B164C"
                                  : "#374151"
                        }
                    />
                </View>
            )}
            {title && (
                <Text className={styles.textClass} style={styles.textStyle}>
                    {title}
                </Text>
            )}
        </TouchableOpacity>
    );
}
