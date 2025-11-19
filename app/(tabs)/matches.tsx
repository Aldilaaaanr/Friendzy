import Colors from "@/colors";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// --- DUMMY DATA ---
const MATCHES_DATA = [
    {
        id: "1",
        name: "James",
        age: 20,
        location: "HANOVER",
        distance: "1.3 km away",
        matchPercentage: 100,
        isOnline: true,
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    },
    {
        id: "2",
        name: "Eddie",
        age: 23,
        location: "DORTMUND",
        distance: "2 km away",
        matchPercentage: 94,
        isOnline: true,
        image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    },
    {
        id: "3",
        name: "Brandon",
        age: 20,
        location: "BERLIN",
        distance: "2.5 km away",
        matchPercentage: 89,
        isOnline: false,
        image: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    },
    {
        id: "4",
        name: "Alfredo",
        age: 20,
        location: "MUNICH",
        distance: "2.5 km away",
        matchPercentage: 80,
        isOnline: true,
        image: "https://images.unsplash.com/photo-1504257432389-52343af06ae3?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    },
    {
        id: "5",
        name: "Carlos",
        age: 22,
        location: "FRANKFURT",
        distance: "3 km away",
        matchPercentage: 76,
        isOnline: false,
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    },
    {
        id: "6",
        name: "Miguel",
        age: 21,
        location: "HAMBURG",
        distance: "3.5 km away",
        matchPercentage: 70,
        isOnline: true,
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    },
];

// --- SUB COMPONENTS ---

// Komponen tombol bulat di bagian atas (Likes & Connect)
const ActionCircle = ({
    icon,
    label,
    count,
    color1,
    color2,
}: {
    icon: any;
    label: string;
    count: number;
    color1: string;
    color2: string;
}) => (
    <View className="items-center mr-6">
        <View className="w-[70px] h-[70px] rounded-full p-[3px] mb-2 border-2 border-[#DD88CF]/30 items-center justify-center overflow-hidden">
            <LinearGradient
                colors={[color1, color2]}
                className="w-[100px] h-[100px] rounded-full items-center justify-center"
            >
                {icon}
            </LinearGradient>
        </View>
        <Text className="text-gray-600 font-medium text-sm">
            {label} <Text style={{ color: Colors.secondary }}>{count}</Text>
        </Text>
    </View>
);

// Komponen Kartu Match
const MatchCard = ({ item }: { item: (typeof MATCHES_DATA)[0] }) => {
    return (
        <TouchableOpacity
            activeOpacity={0.8}
            className="flex-1 h-[280px] mb-4 rounded-[30px] overflow-hidden relative mx-2 bg-white shadow-sm border-[5px] border-secondary"
        >
            {/* Background Image */}
            <Image
                source={{ uri: item.image }}
                className="w-full h-full absolute"
                resizeMode="cover"
            />

            {/* Match Percentage Badge (Top Center) */}
            <View className="absolute top-0 self-center bg-[#DD88CF] px-4 pt-1 pb-1.5 rounded-b-2xl z-10">
                <Text className="text-white text-xs font-bold">
                    {item.matchPercentage}% Match
                </Text>
            </View>

            {/* Bottom Gradient Overlay */}
            <LinearGradient
                colors={[
                    "transparent",
                    "rgba(20,0,20,0.4)",
                    "rgba(20,0,20,0.9)",
                ]}
                className="absolute bottom-0 left-0 right-0 h-1/2 justify-end p-4"
            >
                <View className="items-center">
                    {/* Distance Pill */}
                    <View className="bg-white/20 px-3 py-1 rounded-full mb-2 backdrop-blur-md">
                        <Text className="text-white text-[10px] font-medium">
                            {item.distance}
                        </Text>
                    </View>

                    {/* Name & Age */}
                    <View className="flex-row items-center mb-1">
                        <Text className="text-white text-xl font-bold shadow-md">
                            {item.name}, {item.age}
                        </Text>
                        {item.isOnline && (
                            <View className="w-2.5 h-2.5 bg-green-400 rounded-full ml-2 border border-white" />
                        )}
                    </View>

                    {/* Location */}
                    <Text className="text-gray-300 text-xs tracking-[0.2em] uppercase font-medium">
                        {item.location}
                    </Text>
                </View>
            </LinearGradient>
        </TouchableOpacity>
    );
};

// --- MAIN COMPONENT ---

export default function MatchesScreen() {
    return (
        <SafeAreaView
            style={{ flex: 1, backgroundColor: Colors.background }}
            edges={["top"]}
        >
            <View className="flex-1 px-2">
                {/* Header */}
                <View className="flex-row justify-between items-center px-3 py-2 mb-2">
                    <TouchableOpacity
                        onPress={() => router.back()}
                        className="w-12 h-12 bg-white rounded-full items-center justify-center border border-gray-100"
                    >
                        <Ionicons
                            name="chevron-back"
                            size={24}
                            color={Colors.secondary}
                        />
                    </TouchableOpacity>

                    <Text className="text-2xl font-extrabold text-primary">
                        Matches
                    </Text>

                    <TouchableOpacity className="w-12 h-12 bg-white rounded-full items-center justify-center border border-gray-100">
                        <Ionicons
                            name="options-outline"
                            size={22}
                            color={Colors.secondary}
                        />
                    </TouchableOpacity>
                </View>

                <FlatList
                    data={MATCHES_DATA}
                    keyExtractor={(item) => item.id}
                    numColumns={2}
                    showsVerticalScrollIndicator={false}
                    columnWrapperStyle={{ justifyContent: "space-between" }}
                    contentContainerStyle={{ paddingBottom: 100 }}
                    ListHeaderComponent={() => (
                        <View className="px-2">
                            {/* Top Action Circles */}
                            <View className="flex-row mt-4 mb-8">
                                <ActionCircle
                                    icon={
                                        <Ionicons
                                            name="heart"
                                            size={32}
                                            color="white"
                                        />
                                    }
                                    label="Likes"
                                    count={32}
                                    color1="#9C7999"
                                    color2="#6B4569"
                                />
                                <ActionCircle
                                    icon={
                                        <MaterialCommunityIcons
                                            name="chat"
                                            size={32}
                                            color="white"
                                        />
                                    }
                                    label="Connect"
                                    count={15}
                                    color1="#E5989B"
                                    color2="#D6686C"
                                />
                            </View>

                            {/* Section Title */}
                            <View className="flex-row items-center gap-2 mb-4">
                                <Text className="text-[22px] font-extrabold text-primary">
                                    Your Matches
                                </Text>
                                <Text
                                    style={{ color: Colors.secondary }}
                                    className="text-[22px] font-extrabold"
                                >
                                    {MATCHES_DATA.length}
                                </Text>
                            </View>
                        </View>
                    )}
                    renderItem={({ item }) => <MatchCard item={item} />}
                />
            </View>
        </SafeAreaView>
    );
}
