import React from "react";
import { View, Text, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

interface NewUserCardProps {
    name: string;
    age: number;
    location: string;
    distance: number;
    image: string;
    isNew?: boolean;
    isOnline?: boolean;
}

export default function NewUserCard({
    name,
    age,
    location,
    distance,
    image,
    isNew = true,
    isOnline = false,
}: NewUserCardProps) {
    return (
        <View className="w-[105px] h-[160px] rounded-2xl overflow-hidden relative mr-4 bg-white shadow-md">
            {/* Background Image */}
            <Image
                source={{ uri: image }}
                className="w-full h-full"
                resizeMode="cover"
            />

            {/* Gradient Overlay */}
            <LinearGradient
                colors={[
                    "transparent",
                    "rgba(30, 0, 40, 0.6)",
                    "rgba(30, 0, 40, 0.95)",
                ]}
                className="absolute bottom-0 left-0 right-0 h-3/5"
            />

            {/* Badge NEW */}
            {isNew && (
                <View className="absolute top-3 left-3 bg-[#4A144B] border border-[#D870D0] px-2 py-1 rounded-xl">
                    <Text className="text-white font-bold text-xs">NEW</Text>
                </View>
            )}

            {/* Bottom Content */}
            <View className="absolute bottom-4 w-full items-center">
                {/* Distance Pill */}
                <View className="bg-white/25 border border-white/40 px-2 py-1 rounded-full mb-1">
                    <Text className="text-white text-sm font-medium">
                        {distance} km away
                    </Text>
                </View>

                {/* Name & Age */}
                <View className="flex-row items-center">
                    <Text className="text-white text-base font-bold">
                        {name}, {age}
                    </Text>
                    {isOnline && (
                        <View className="w-2 h-2 bg-green-400 rounded-full ml-2" />
                    )}
                </View>

                {/* Location */}
                <Text className="text-gray-300 text-xs font-medium tracking-[0.15em] uppercase">
                    {location}
                </Text>
            </View>
        </View>
    );
}
