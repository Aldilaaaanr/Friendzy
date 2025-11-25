import Colors from "@/colors";
import PostCard from "@/components/PostCard";
import Stories from "@/components/Stories";
import "@/global.css";
import { Ionicons } from "@expo/vector-icons";
import React, { useState, useEffect } from "react";

import {
    FlatList,
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
import { api, Story, Post } from "@/services/api";

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
    const [stories, setStories] = useState<Story[]>([]);
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [loadingPosts, setLoadingPosts] = useState(false);

    // Debug: Monitor posts state changes
    useEffect(() => {
        console.log("Posts state changed:", posts);
        console.log("Posts length:", posts.length);
    }, [posts]);

    // Fetch Stories
    useEffect(() => {
        const fetchStories = async () => {
            try {
                const data = await api.getStories();
                setStories(Array.isArray(data) ? data : []);
            } catch (error) {
                console.error("Error fetching stories:", error);
                setStories([]); // Set empty array on error
                Alert.alert("Error", "Gagal memuat stories");
            } finally {
                setLoading(false);
            }
        };

        fetchStories();
    }, []);

    // Fetch Posts
    useEffect(() => {
        const fetchPosts = async () => {
            setLoadingPosts(true);
            try {
                const response = await api.getPosts(1, 10);
                console.log("Posts Response:", response);
                console.log("Posts Response Type:", typeof response);
                console.log("Posts Response.data:", response?.data);
                console.log("Is Array:", Array.isArray(response?.data));
                
                // Handle different response structures
                let postsData: Post[] = [];
                
                if (response) {
                    // Jika response adalah PostsResponse (punya data dan pagination)
                    if (response.data && Array.isArray(response.data)) {
                        postsData = response.data;
                    }
                    // Jika response langsung adalah array
                    else if (Array.isArray(response)) {
                        postsData = response;
                    }
                    // Jika response punya property 'posts'
                    else if (response.posts && Array.isArray(response.posts)) {
                        postsData = response.posts;
                    }
                }
                
                console.log("Final Posts Data:", postsData);
                console.log("Final Posts Data Length:", postsData.length);
                setPosts(postsData);
            } catch (error) {
                console.error("Error fetching posts:", error);
                setPosts([]); // Set empty array on error
                Alert.alert("Error", "Gagal memuat posts");
            } finally {
                setLoadingPosts(false);
            }
        };

        fetchPosts();
    }, []);

    if (loading) {
        return (
            <SafeAreaView
                style={{ flex: 1, backgroundColor: Colors.background }}
                edges={["top"]}
            >
                <View className="flex-1 items-center justify-center">
                    <ActivityIndicator size="large" color={Colors.primary} />
                    <Text className="mt-4 text-gray-500">Memuat data...</Text>
                </View>
            </SafeAreaView>
        );
    }

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
                    {Array.isArray(stories) && stories.length > 0 ? (
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
                    ) : (
                        <View className="px-5 py-4">
                            <Text className="text-gray-400 text-sm">
                                Tidak ada stories tersedia
                            </Text>
                        </View>
                    )}
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
                    {loadingPosts ? (
                        <View className="items-center justify-center py-10">
                            <ActivityIndicator
                                size="large"
                                color={Colors.primary}
                            />
                            <Text className="mt-4 text-gray-500">
                                Memuat posts...
                            </Text>
                        </View>
                    ) : Array.isArray(posts) && posts.length > 0 ? (
                        posts.map((post) => {
                            console.log("Rendering post:", post.id, post.title);
                            return (
                                <PostCard
                                    key={post.id}
                                    image={post.image}
                                    category={post.category}
                                    title={post.title}
                                    user={post.user}
                                />
                            );
                        })
                    ) : (
                        <View className="items-center justify-center py-10">
                            <Text className="text-gray-500">
                                Tidak ada posts tersedia
                            </Text>
                        </View>
                    )}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
