import "@/global.css";
import Colors from "@/colors";
import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { router } from "expo-router";
import React, { useState, useEffect } from "react";
import {
    FlatList,
    Image,
    StatusBar,
    Text,
    TouchableOpacity,
    View,
    ActivityIndicator,
    Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { api, RecentMatch, Message } from "@/services/api";

// --- COMPONENT ITEMS ---

const RecentMatchItem = ({ item }: { item: RecentMatch }) => {
    if (item.type === "likes") {
        return (
            <View className="mr-4 items-center justify-center relative w-[80px] h-[92px] rounded-[15px] overflow-hidden border-0">
                <Image
                    source={{ uri: item.image }}
                    className="absolute w-full h-full"
                    resizeMode="cover"
                />
                {/* Efek Blur untuk kartu Likes */}
                <View className="absolute w-full h-full items-center justify-center bg-[#dd88cf]/50">
                    <View className="items-center justify-center">
                        <Ionicons name="heart" size={28} color="white" />
                        <Text className="text-white font-bold text-lg mt-1">
                            {item.count}
                        </Text>
                    </View>
                </View>
            </View>
        );
    }
    return (
        <View className="mr-4 w-[80px] h-[92px] rounded-[15px] overflow-hidden bg-gray-300 border-0">
            <Image
                source={{ uri: item.image }}
                className="w-full h-full"
                resizeMode="cover"
            />
        </View>
    );
};

const MessageItem = ({ item }: { item: Message }) => (
    <TouchableOpacity
        className="flex-row items-center py-5 border-b-[0.8px] border-gray-200"
        activeOpacity={0.7}
    >
        <Image
            source={{ uri: item.avatar }}
            className="w-14 h-14 rounded-full mr-4"
        />
        <View className="flex-1 pr-4">
            <Text className="text-xl font-bold text-[#2D2D2D] mb-1">
                {item.name}
            </Text>
            <Text
                className={`text-gray-500 text-base leading-5${item.unread ? " font-bold" : ""}`}
                numberOfLines={1}
            >
                {item.message}
            </Text>
        </View>
        <View className="items-end justify-between h-10">
            {item.unread ? (
                <View className="w-3 h-3 bg-secondary rounded-full" />
            ) : (
                <View className="w-3 h-3" />
            )}
            <Text className="text-gray-400 text-xs font-medium">
                {item.time}
            </Text>
        </View>
    </TouchableOpacity>
);

// --- MAIN SCREEN ---

export default function MessagesScreen() {
    const [recentMatches, setRecentMatches] = useState<RecentMatch[]>([]);
    const [messages, setMessages] = useState<Message[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const response = await api.getMessages();
                setRecentMatches(response.recentMatches);
                setMessages(response.messages);
            } catch (error) {
                console.error("Error fetching messages:", error);
                Alert.alert("Error", "Gagal memuat messages");
            } finally {
                setLoading(false);
            }
        };

        fetchMessages();
    }, []);

    if (loading) {
        return (
            <View className="flex-1 bg-primary">
                <StatusBar
                    barStyle="light-content"
                    backgroundColor={Colors.primary}
                />
                <SafeAreaView edges={["top"]} className="flex-1">
                    <View className="flex-1 items-center justify-center">
                        <ActivityIndicator size="large" color="white" />
                        <Text className="mt-4 text-white">
                            Memuat messages...
                        </Text>
                    </View>
                </SafeAreaView>
            </View>
        );
    }

    return (
        <View className="flex-1 bg-primary">
            <StatusBar
                barStyle="light-content"
                backgroundColor={Colors.primary}
            />

            <SafeAreaView edges={["top"]} className="flex-1">
                {/* --- Header --- */}
                <View className="flex-row justify-between items-center px-5 py-2 mb-2">
                    <TouchableOpacity
                        className="w-12 h-12 rounded-full bg-white/10 items-center justify-center"
                        onPress={() => router.back()}
                    >
                        <Ionicons name="chevron-back" size={24} color="white" />
                    </TouchableOpacity>
                    <Text className="text-white text-2xl font-extrabold tracking-wide">
                        Messages
                    </Text>
                    <View className="w-10" />
                    {/* Spacer untuk centering title */}
                </View>

                {/* --- Recent Matches Section --- */}
                <View className="mt-3 pl-6 pb-8">
                    <Text className="text-white text-lg font-semibold mb-5">
                        Recent Matches
                    </Text>
                    <FlatList
                        data={recentMatches}
                        renderItem={({ item }) => (
                            <RecentMatchItem item={item} />
                        )}
                        keyExtractor={(item) => item.id}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                    />
                </View>

                {/* --- Messages List (White Sheet) --- */}
                <View className="flex-1 bg-white rounded-t-[45px] px-6 pt-2 overflow-hidden">
                    {/* Handle bar visual */}
                    <View className="self-center w-14 h-1.5 bg-gray-200 rounded-full mt-4 mb-2" />

                    <FlatList
                        data={messages}
                        renderItem={({ item }) => <MessageItem item={item} />}
                        keyExtractor={(item) => item.id}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{
                            paddingBottom: 100,
                            paddingTop: 10,
                        }}
                        ListEmptyComponent={
                            <View className="items-center justify-center py-20 px-5">
                                <Text className="text-gray-500 text-center">
                                    Tidak ada messages tersedia
                                </Text>
                            </View>
                        }
                    />
                </View>
            </SafeAreaView>
        </View>
    );
}
