import Colors from "@/colors";
import PostCard from "@/components/PostCard";
import Stories from "@/components/Stories";
import "@/global.css";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";

import {
    FlatList,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import {
    SafeAreaView,
    useSafeAreaInsets,
} from "react-native-safe-area-context";

const stories = [
    { id: 1, name: "Story 1", profileImage: "", isMyStory: true },
    {
        id: 2,
        name: "Story 2",
        profileImage:
            "https://i.pinimg.com/736x/7e/2a/2d/7e2a2d2852d1f7d5fd4d5cd169e18eec.jpg",
    },
    { id: 3, name: "Story 3", profileImage: "" },
    { id: 4, name: "Story 4", profileImage: "" },
    { id: 5, name: "Story 5", profileImage: "" },
    { id: 6, name: "Story 6", profileImage: "" },
];

const posts = [
    {
        id: 1,
        image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        category: "Travel",
        title: "If you could live anywhere in the world, where would you pick?",
        user: {
            name: "Miranda Kehlani",
            location: "Stuttgart",
            avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
        },
    },
    {
        id: 2,
        image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        category: "Food",
        title: "What is your favorite dish to cook at home?",
        user: {
            name: "John Doe",
            location: "New York",
            avatar: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
        },
    },
    {
        id: 3,
        image: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        category: "Nature",
        title: "What is your favorite outdoor activity?",
        user: {
            name: "Jane Smith",
            location: "San Francisco",
            avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
        },
    },
];

interface CustomTabsProps {
    tabs: string[];
    activeTab: string;
    onTabChange: (tab: string) => void;
}

const CustomTabs: React.FC<CustomTabsProps> = ({
    tabs,
    activeTab,
    onTabChange,
}) => {
    return (
        <View className="bg-[#F8E8F8] p-1.5 rounded-3xl flex-row h-[54px]">
            {tabs.map((tab) => (
                <TouchableOpacity
                    key={tab}
                    className={`flex-1 items-center justify-center rounded-full ${
                        activeTab === tab ? "bg-white" : "bg-transparent"
                    }`}
                    onPress={() => onTabChange(tab)}
                >
                    <Text
                        className={`text-base font-extrabold ${
                            activeTab === tab
                                ? "text-primary"
                                : "text-secondary"
                        }`}
                    >
                        {tab}
                    </Text>
                </TouchableOpacity>
            ))}
        </View>
    );
};

export default function App() {
    const insets = useSafeAreaInsets();
    const [activeTab, setActiveTab] = useState("Make Friends");

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
                    <Text className="text-3xl font-extrabold text-primary">
                        Friendzy
                    </Text>
                    <TouchableOpacity className="w-12 h-12 bg-white rounded-full items-center justify-center border border-gray-100">
                        <Ionicons
                            name="notifications"
                            size={24}
                            color={Colors.secondary}
                        />
                    </TouchableOpacity>
                </View>

                {/* stories */}
                <View>
                    <FlatList
                        data={stories}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{ paddingHorizontal: 15 }}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => (
                            <Stories
                                id={item.id}
                                name={item.name}
                                profileImage={item.profileImage}
                                isMyStory={item.isMyStory}
                            />
                        )}
                    />
                </View>
                <View className="mt-8 px-5">
                    <CustomTabs
                        tabs={["Make Friends", "Search Partners"]}
                        activeTab={activeTab}
                        onTabChange={setActiveTab}
                    />
                </View>

                <View
                    className="px-5 mt-6"
                    style={{ marginBottom: insets.bottom + 100 }}
                >
                    {posts.map((post) => (
                        <PostCard
                            key={post.id}
                            image={post.image}
                            category={post.category}
                            title={post.title}
                            user={post.user}
                        />
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
