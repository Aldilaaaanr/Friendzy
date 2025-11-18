import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

interface StoryProps {
    id: number;
    name: string;
    profileImage: any;
    isMyStory?: boolean;
}

export default function Stories({
    id,
    name,
    profileImage,
    isMyStory = false,
}: StoryProps) {
    return (
        <TouchableOpacity className="mr-4 items-center" activeOpacity={0.5}>
            <View className="relative">
                <View className="w-20 h-20 rounded-full border-2 border-secondary justify-center items-center p-1 overflow-hidden">
                    {profileImage ? (
                        <Image
                            source={{ uri: profileImage }}
                            className="w-full h-full rounded-full"
                            resizeMode="cover"
                        />
                    ) : (
                        <Ionicons name="person" size={80} color="#ccc" />
                    )}
                </View>

                {isMyStory && (
                    <View className="absolute bottom-0 right-0 bg-secondary rounded-full p-1 border-2 border-white">
                        <Ionicons name="add" size={16} color="#fff" />
                    </View>
                )}
            </View>

            <Text className="mt-2 text-sm text-primary">{name}</Text>
        </TouchableOpacity>
    );
}
