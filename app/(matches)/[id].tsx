import Colors from "@/colors";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router, useLocalSearchParams } from "expo-router";
import CircularProgress from "@/components/CircularProgress";
import React, { useState, useEffect } from "react";
import {
    Dimensions,
    Image,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
    ActivityIndicator,
    Alert,
} from "react-native";
import {
    SafeAreaView,
    useSafeAreaInsets,
} from "react-native-safe-area-context";
import { api, MatchDetail } from "@/services/api";

const { height } = Dimensions.get("window");

export default function MatchDetailScreen() {
    const insets = useSafeAreaInsets();
    const params = useLocalSearchParams();
    const [user, setUser] = useState<MatchDetail | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMatchDetail = async () => {
            if (!params.id) {
                Alert.alert("Error", "ID tidak valid");
                router.back();
                return;
            }

            try {
                const data = await api.getMatchDetail(params.id as string);
                setUser(data);
            } catch (error) {
                console.error("Error fetching match detail:", error);
                Alert.alert("Error", "Gagal memuat detail match", [
                    {
                        text: "OK",
                        onPress: () => router.back(),
                    },
                ]);
            } finally {
                setLoading(false);
            }
        };

        fetchMatchDetail();
    }, [params.id]);

    if (loading || !user) {
        return (
            <SafeAreaView
                style={{ flex: 1, backgroundColor: Colors.background }}
                edges={["top"]}
            >
                <View className="flex-1 items-center justify-center">
                    <ActivityIndicator size="large" color={Colors.primary} />
                    <Text className="mt-4 text-gray-500">
                        Memuat detail match...
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
            <View
                className="absolute top-0 w-full"
                style={{ height: height * 0.75 }}
            >
                <Image
                    source={{ uri: user.image }}
                    className="w-full h-full"
                    resizeMode="cover"
                />

                <LinearGradient
                    colors={[
                        "rgba(0,0,0,0.1)",
                        "rgba(40, 10, 40, 0.6)",
                        "rgba(75, 22, 76, 1)",
                    ]}
                    className="absolute w-full h-full"
                    start={{ x: 0.5, y: 0.4 }}
                    end={{ x: 0.5, y: 1 }}
                />

                <View className="absolute top-16 left-5 right-5 flex-row justify-between items-center z-10">
                    <TouchableOpacity
                        onPress={() => router.back()}
                        className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full items-center justify-center border border-white/30"
                    >
                        <Ionicons name="chevron-back" size={24} color="white" />
                    </TouchableOpacity>

                    <View className="flex-row items-center bg-white/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/30">
                        <Ionicons name="navigate" size={16} color="white" />
                    <Text className="text-white font-bold ml-2">
                        {user.distance || "Unknown"}
                    </Text>
                    </View>
                </View>

                {/* User Info Overlay */}
                <View className="absolute bottom-[15%] w-full items-center px-4">
                    <Text className="text-white text-3xl font-extrabold mb-1 text-center">
                        {user.name}, {user.age}
                    </Text>
                    <Text className="text-gray-300 text-xs tracking-[0.2em] uppercase mb-6 font-medium">
                        {user.location}
                    </Text>

                    {/* Match Badge */}
                    <View className="flex-row items-center bg-[#4A144B]/80 border border-[#DD88CF] px-2 py-2 rounded-full backdrop-blur-sm">
                        <View className="mr-3">
                        <CircularProgress
                            percentage={user.matchPercentage}
                            size={45}
                            strokeWidth={4}
                            color="#DD88CF"
                            trackColor="rgba(255,255,255,0.2)"
                        />
                        </View>

                        <Text className="text-white text-2xl font-bold mr-2">
                            Match
                        </Text>
                    </View>
                </View>
            </View>

            {/* --- WHITE CONTENT SHEET --- */}
            <ScrollView
                className="flex-1 bg-white rounded-t-[40px] mt-[65vh]"
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 120 }}
            >
                <View className="self-center w-14 h-1.5 bg-gray-200 rounded-full mt-4 mb-6" />

                <View className="px-6">
                    <Text className="text-gray-400 text-lg mb-2">About</Text>
                    <Text className="text-gray-800 text-base leading-6 font-medium mb-6">
                        {user.about || "No description available."}
                    </Text>

                    <Text className="text-gray-400 text-lg mb-4">Interest</Text>
                    <View className="flex-row flex-wrap gap-3">
                        {user.interests.map((interest, index) => (
                            <View
                                key={index}
                                className="flex-row items-center px-4 py-2 rounded-full border border-gray-200 bg-white"
                            >
                                <Ionicons
                                    name="star"
                                    size={16}
                                    color={Colors.primary}
                                    style={{ marginRight: 6 }}
                                />
                                <Text className="text-primary font-bold">
                                    {interest}
                                </Text>
                            </View>
                        ))}
                    </View>
                </View>
            </ScrollView>

            {/* --- FLOATING ACTION BUTTONS --- */}
            <View
                style={{
                    height: 70,
                    backgroundColor: "#fff",
                    borderRadius: 100,
                    bottom: insets.bottom + 20,
                    marginHorizontal: 20,
                    elevation: 40,
                    shadowOpacity: 0.1,
                    borderTopWidth: 0,
                    paddingHorizontal: 10,
                }}
                className="flex-row justify-center items-center gap-6 bg-white rounded-full absolute self-center"
            >
                <TouchableOpacity
                    className="w-16 h-16 bg-white rounded-full items-center justify-center border border-gray-100 shadow-lg"
                    activeOpacity={0.8}
                    onPress={() => router.back()}
                >
                    <Ionicons name="close" size={26} color="#4B164C" />
                </TouchableOpacity>

                <TouchableOpacity
                    className="w-16 h-16 bg-[#4B164C] rounded-full items-center justify-center border border-white shadow-lg"
                    activeOpacity={0.8}
                >
                    <FontAwesome name="star" size={20} color="white" />
                </TouchableOpacity>

                <TouchableOpacity
                    className="w-16 h-16 bg-[#DD88CF] rounded-full items-center justify-center border border-white shadow-lg"
                    activeOpacity={0.8}
                >
                    <Ionicons name="heart" size={24} color="white" />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}
