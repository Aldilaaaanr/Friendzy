import "@/global.css";
import InterestSection from "@/components/Interests";
import NewUserCard from "@/components/NewUser";
import {
    FlatList,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import Colors from "@/colors";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const newUsers = [
    {
        id: 1,
        name: "Alice",
        age: 24,
        location: "New York",
        distance: 2,
        image: "https://randomuser.me/api/portraits/women/68.jpg",
        isNew: true,
        isOnline: true,
    },
    {
        id: 2,
        name: "Bob",
        age: 27,
        location: "Los Angeles",
        distance: 5,
        image: "https://randomuser.me/api/portraits/men/45.jpg",
        isNew: true,
        isOnline: false,
    },
    {
        id: 3,
        name: "Catherine",
        age: 22,
        location: "Chicago",
        distance: 3,
        image: "https://randomuser.me/api/portraits/women/12.jpg",
        isNew: false,
        isOnline: true,
    },
    {
        id: 4,
        name: "David",
        age: 30,
        location: "Miami",
        distance: 8,
        image: "https://randomuser.me/api/portraits/men/22.jpg",
        isNew: true,
        isOnline: true,
    },
    {
        id: 5,
        name: "Eva",
        age: 26,
        location: "Seattle",
        distance: 4,
        image: "https://randomuser.me/api/portraits/women/34.jpg",
        isNew: false,
        isOnline: false,
    },
];

export default function App() {
    return (
        <SafeAreaView
            style={{ flex: 1, backgroundColor: Colors.background }}
            edges={["top"]}
        >
            <ScrollView
                className="flex-1 bg-background"
                style={{ paddingTop: 5 }}
                showsVerticalScrollIndicator={false}
            >
                {/* header */}
                <View className="mb-4 flex-row justify-between items-center px-5">
                    <View className="flex-col mt-3">
                        <Text className="text-3xl font-extrabold text-primary">
                            Discover
                        </Text>
                        <TouchableOpacity
                            activeOpacity={0.5}
                            className="mt-1 flex-row gap-2 items-center"
                        >
                            <Ionicons
                                name="location-sharp"
                                size={12}
                                color={Colors.secondary}
                            />
                            <Text className="text-base font-medium text-secondary">
                                Sukabumi
                            </Text>
                            <Ionicons
                                name="chevron-down"
                                size={15}
                                color={Colors.secondary}
                            />
                        </TouchableOpacity>
                    </View>

                    <View className="flex-row space-x-4">
                        <TouchableOpacity className="p-2 items-center justify-center">
                            <Ionicons
                                name="search"
                                size={32}
                                color={Colors.secondary}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity className="p-2 items-center justify-center">
                            <Ionicons
                                name="filter"
                                size={26}
                                color={Colors.secondary}
                            />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* new user */}
                <View className="mt-2">
                    <FlatList
                        data={newUsers}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{ paddingHorizontal: 15 }}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => (
                            <NewUserCard
                                name={item.name}
                                age={item.age}
                                location={item.location}
                                distance={item.distance}
                                image={item.image}
                                isNew={item.isNew}
                                isOnline={item.isOnline}
                            />
                        )}
                    />
                </View>

                {/* interest */}
                <InterestSection />
            </ScrollView>
        </SafeAreaView>
    );
}
