import Colors from "@/colors";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React, { useState, useEffect } from "react";
import {
    FlatList,
    Image,
    Text,
    TouchableOpacity,
    View,
    ActivityIndicator,
    Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { api, Match, MatchStats } from "@/services/api";

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
const MatchCard = ({ item }: { item: Match }) => {
    return (
        <TouchableOpacity
            activeOpacity={0.8}
            className="flex-1 h-[280px] mb-4 rounded-[30px] overflow-hidden relative mx-2 bg-white shadow-sm border-[5px] border-secondary"
            onPress={() => {
                // Navigate ke detail, data akan di-fetch di detail screen
                router.push({
                    pathname: "/(matches)/[id]",
                    params: {
                        id: item.id,
                    },
                });
            }}
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
    const [matches, setMatches] = useState<Match[]>([]);
    const [stats, setStats] = useState<MatchStats>({ likes: 0, connects: 0 });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMatches = async () => {
            try {
                const response = await api.getMatches();
                console.log("Matches Response:", response);
                console.log("Matches Response.data:", response?.data);
                console.log("Matches Response.stats:", response?.stats);

                // Handle different response structures
                let matchesData: Match[] = [];
                let statsData: MatchStats = { likes: 0, connects: 0 };

                if (response) {
                    // Jika response punya data dan stats
                    if (response.data && Array.isArray(response.data)) {
                        matchesData = response.data;
                    }
                    // Jika response langsung adalah array
                    else if (Array.isArray(response)) {
                        matchesData = response;
                    }

                    // Handle stats
                    if (response.stats) {
                        statsData = {
                            likes: response.stats.likes || 0,
                            connects: response.stats.connects || 0,
                        };
                    }
                }

                console.log("Final Matches Data:", matchesData);
                console.log("Final Stats Data:", statsData);

                setMatches(matchesData);
                setStats(statsData);
            } catch (error) {
                console.error("Error fetching matches:", error);
                setMatches([]);
                setStats({ likes: 0, connects: 0 });
                Alert.alert("Error", "Gagal memuat matches");
            } finally {
                setLoading(false);
            }
        };

        fetchMatches();
    }, []);

    if (loading) {
        return (
            <SafeAreaView
                style={{ flex: 1, backgroundColor: Colors.background }}
                edges={["top"]}
            >
                <View className="flex-1 items-center justify-center">
                    <ActivityIndicator size="large" color={Colors.primary} />
                    <Text className="mt-4 text-gray-500">
                        Memuat matches...
                    </Text>
                </View>
            </SafeAreaView>
        );
    }

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
                    data={matches}
                    keyExtractor={(item) => item.id}
                    numColumns={2}
                    showsVerticalScrollIndicator={false}
                    columnWrapperStyle={{ justifyContent: "space-between" }}
                    contentContainerStyle={{ paddingBottom: 100 }}
                    ListEmptyComponent={
                        <View className="items-center justify-center py-20 px-5">
                            <Text className="text-gray-500 text-center">
                                Tidak ada matches tersedia
                            </Text>
                        </View>
                    }
                    ListHeaderComponent={() => {
                        // Ensure stats is always defined
                        const safeStats = stats || { likes: 0, connects: 0 };
                        return (
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
                                        count={safeStats.likes || 0}
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
                                        count={safeStats.connects || 0}
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
                                        {matches.length}
                                    </Text>
                                </View>
                            </View>
                        );
                    }}
                    renderItem={({ item }) => <MatchCard item={item} />}
                />
            </View>
        </SafeAreaView>
    );
}
