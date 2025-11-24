import React from "react";
import { View, Text } from "react-native";
import Svg, { Circle } from "react-native-svg";

interface CircularProgressProps {
    size?: number;
    strokeWidth?: number;
    percentage: number;
    color?: string;
    trackColor?: string;
}

export default function CircularProgress({
    size = 40,
    strokeWidth = 3,
    percentage,
    color = "#DD88CF", // Warna Pink Secondary
    trackColor = "rgba(221, 136, 207, 0.3)", // Warna track transparan
}: CircularProgressProps) {
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    return (
        <View
            style={{
                width: size,
                height: size,
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            {/* Rotasi -90deg agar mulai dari atas */}
            <Svg
                width={size}
                height={size}
                style={{ transform: [{ rotate: "-90deg" }] }}
            >
                {/* Track (Lingkaran Belakang) */}
                <Circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    stroke={trackColor}
                    strokeWidth={strokeWidth}
                    fill="transparent"
                />
                {/* Progress (Lingkaran Depan) */}
                <Circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    stroke={color}
                    strokeWidth={strokeWidth}
                    fill="transparent"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                />
            </Svg>

            {/* Teks Persentase di Tengah */}
            <View className="absolute items-center justify-center">
                <Text className="text-white text-base font-bold">
                    {percentage}%
                </Text>
            </View>
        </View>
    );
}
