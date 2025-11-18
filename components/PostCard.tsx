import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

interface User {
    name: string;
    location: string;
    avatar: any;
}

interface PostCardProps {
    image: any;
    category: string;
    title: string;
    user: User;
}

export default function PostCard({
    image,
    category,
    title,
    user,
}: PostCardProps) {
    return (
        <TouchableOpacity
            activeOpacity={0.8}
            className="w-full h-[343px] rounded-[35px] overflow-hidden relative mb-6"
        >
            <Image
                source={{ uri: image }}
                className="w-full h-full absolute"
                resizeMode="cover"
            />

            {/* Overlay Gelap (agar teks terbaca) */}
            <View className="absolute w-full h-full bg-black/50" />

            {/* Top Left: Category Chip */}
            <View className="absolute top-6 left-6 overflow-hidden rounded-full bg-primary px-4 py-2 flex-row items-center gap-2">
                {category === "Travel" && (
                    <Ionicons name="airplane" size={16} color="#fff" />
                )}
                {category === "Food" && (
                    <Ionicons name="restaurant" size={16} color="#fff" />
                )}
                {category === "Nature" && (
                    <Ionicons name="leaf" size={16} color="#fff" />
                )}
                {category === "Technology" && (
                    <Ionicons name="laptop" size={16} color="#fff" />
                )}
                {category === "Art" && (
                    <Ionicons name="color-palette" size={16} color="#fff" />
                )}
                {category === "Sports" && (
                    <Ionicons name="football" size={16} color="#fff" />
                )}
                {category === "Music" && (
                    <Ionicons name="musical-notes" size={16} color="#fff" />
                )}
                {category === "Fashion" && (
                    <Ionicons name="shirt" size={16} color="#fff" />
                )}
                {category === "Health" && (
                    <Ionicons name="heart" size={16} color="#fff" />
                )}
                {category === "Education" && (
                    <Ionicons name="school" size={16} color="#fff" />
                )}
                <Text className="text-white font-semibold text-lg">
                    {category}
                </Text>
            </View>

            {/* Right Side: Action Bar */}
            <View className="absolute right-0 top-1/4 overflow-hidden rounded-l-[30px]">
                <BlurView
                    intensity={50}
                    tint="light"
                    className="py-4 px-2 items-center gap-6 w-[60px]"
                >
                    <TouchableOpacity className="items-center justify-center w-10 h-10 bg-white/40 rounded-full">
                        <MaterialIcons
                            name="thumb-up"
                            size={20}
                            color="white"
                        />
                    </TouchableOpacity>
                    <TouchableOpacity className="items-center justify-center w-10 h-10 bg-white/40 rounded-full">
                        <Ionicons name="chatbubble" size={20} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity className="items-center justify-center w-10 h-10 bg-white/40 rounded-full">
                        <Ionicons
                            name="ellipsis-horizontal"
                            size={20}
                            color="white"
                        />
                    </TouchableOpacity>
                </BlurView>
            </View>

            {/* Bottom Content */}
            <View className="absolute bottom-0 w-full p-6 pb-8">
                <Text className="text-white text-2xl font-bold leading-tight mb-6 max-w-[85%]">
                    {title}
                </Text>

                <View className="flex-row items-center">
                    <Image
                        source={{ uri: user.avatar }}
                        className="w-12 h-12 rounded-full border-2 border-white/50"
                    />
                    <View className="ml-3">
                        <Text className="text-white font-bold text-lg">
                            {user.name}
                        </Text>
                        <Text className="text-gray-300 text-xs tracking-widest uppercase">
                            {user.location}
                        </Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
}
