import "@/global.css";
import InterestSection from "@/components/Interests";
import NewUserCard from "@/components/NewUser";
import AroundMeMap from "@/components/AroundMeMap";
import {
    FlatList,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
    Alert,
    ActivityIndicator,
} from "react-native";
import Colors from "@/colors";
import { Ionicons, Octicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Location from "expo-location";

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

const nearbyUsers = [
    {
        id: 101,
        name: "Clara",
        lat: 51.505,
        lng: -0.09,
        avatar: "https://randomuser.me/api/portraits/women/44.jpg",
        interests: ["Music", "Travel"],
    },
    {
        id: 102,
        name: "John",
        lat: 51.51,
        lng: -0.1,
        avatar: "https://randomuser.me/api/portraits/men/32.jpg",
        interests: ["Sports", "Technology"],
    },
    {
        id: 103,
        name: "Sarah",
        lat: 51.51,
        lng: -0.08,
        avatar: "https://randomuser.me/api/portraits/women/65.jpg",
        interests: ["Music", "Art"],
    },
    {
        id: 104,
        name: "Mike",
        lat: 51.5,
        lng: -0.085,
        avatar: "https://randomuser.me/api/portraits/men/11.jpg",
        interests: ["Food", "Travel"],
    },
    {
        id: 105,
        name: "Emily",
        lat: 51.49,
        lng: -0.1,
        avatar: "https://randomuser.me/api/portraits/women/22.jpg",
        interests: ["Fashion", "Music"],
    },
];

export default function App() {
    // State
    const [selectedInterests, setSelectedInterests] = useState<string[]>([
        "Music",
    ]);
    const [userLocation, setUserLocation] = useState<{
        latitude: number;
        longitude: number;
    } | null>(null);
    const [loadingLocation, setLoadingLocation] = useState(false);

    // Handler: Toggle Interest
    const toggleInterest = (category: string) => {
        if (selectedInterests.includes(category)) {
            setSelectedInterests((prev) => prev.filter((c) => c !== category));
        } else {
            setSelectedInterests((prev) => [...prev, category]);
        }
    };

    // Handler: Get Location (Native)
    const handleLocateMe = async () => {
        setLoadingLocation(true);
        try {
            // 1. Minta Izin
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== "granted") {
                Alert.alert(
                    "Izin Ditolak",
                    "Mohon izinkan akses lokasi di pengaturan untuk menggunakan fitur ini."
                );
                setLoadingLocation(false);
                return;
            }

            // 2. Ambil Lokasi
            let location = await Location.getCurrentPositionAsync({
                accuracy: Location.Accuracy.Balanced, // Balanced cukup untuk peta umum & lebih cepat
            });

            // 3. Simpan ke State (akan mentrigger update di Map Component)
            setUserLocation({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
            });
        } catch (error) {
            console.log(error);
            Alert.alert(
                "Gagal",
                "Tidak dapat mengambil lokasi. Pastikan GPS aktif."
            );
        } finally {
            setLoadingLocation(false);
        }
    };

    // Filter Users based on Interests
    const filteredMapUsers = nearbyUsers.filter((user) =>
        user.interests.some((interest) => selectedInterests.includes(interest))
    );

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
                {/* Header */}
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

                    <View className="flex-row gap-3">
                        <TouchableOpacity className="w-12 h-12 bg-white rounded-full items-center justify-center border border-gray-100">
                            <Ionicons
                                name="search"
                                size={24}
                                color={Colors.secondary}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity className="w-12 h-12 bg-white rounded-full items-center justify-center border border-gray-100">
                            <Ionicons
                                name="options-outline"
                                size={22}
                                color={Colors.secondary}
                            />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* New User Section */}
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

                {/* Interest Section */}
                <InterestSection
                    selectedInterests={selectedInterests}
                    onToggleInterest={toggleInterest}
                />

                {/* Section Around Me (Map) */}
                <View className="mt-4 mb-20">
                    <View className="px-5 mb-2">
                        <Text className="text-2xl font-extrabold text-black">
                            Around Me
                        </Text>
                        <Text className="text-gray-500 text-sm">
                            People with{" "}
                            <Text
                                style={{
                                    color: Colors.secondary,
                                    fontWeight: "bold",
                                }}
                            >
                                {`"${selectedInterests.join(", ")}"`}
                            </Text>{" "}
                            interest around you
                        </Text>
                    </View>

                    {/* Map Container */}
                    <View className="relative">
                        {/* Peta */}
                        <AroundMeMap
                            users={filteredMapUsers}
                            userLocation={userLocation}
                        />

                        {/* Tombol Locate Me (Native) */}
                        <TouchableOpacity
                            onPress={handleLocateMe}
                            activeOpacity={0.8}
                            style={{
                                position: "absolute",
                                bottom: 100, // Jarak dari bawah map container
                                right: 20,
                                width: 50,
                                height: 50,
                                backgroundColor: "white",
                                borderRadius: 25,
                                justifyContent: "center",
                                alignItems: "center",
                                shadowColor: "#000",
                                shadowOffset: { width: 0, height: 2 },
                                shadowOpacity: 0.25,
                                shadowRadius: 3.84,
                                elevation: 5, // Shadow android
                                zIndex: 10, // Pastikan di atas map
                            }}
                        >
                            {loadingLocation ? (
                                <ActivityIndicator
                                    size="small"
                                    color={Colors.primary}
                                />
                            ) : (
                                <Ionicons
                                    name="locate"
                                    size={24}
                                    color={Colors.primary}
                                />
                            )}
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
