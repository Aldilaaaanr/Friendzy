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
import { Ionicons } from "@expo/vector-icons";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Location from "expo-location";
import { api, NewUser, NearbyUser } from "@/services/api";

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
    const [newUsers, setNewUsers] = useState<NewUser[]>([]);
    const [nearbyUsers, setNearbyUsers] = useState<NearbyUser[]>([]);
    const [loadingNewUsers, setLoadingNewUsers] = useState(true);
    const [loadingNearbyUsers, setLoadingNearbyUsers] = useState(false);

    // Fetch New Users
    useEffect(() => {
        const fetchNewUsers = async () => {
            try {
                const data = await api.getNewUsers(10);
                setNewUsers(data);
            } catch (error) {
                console.error("Error fetching new users:", error);
                Alert.alert("Error", "Gagal memuat user baru");
            } finally {
                setLoadingNewUsers(false);
            }
        };

        fetchNewUsers();
    }, []);

    // Handler: Get Location (Native)
    const handleLocateMe = async () => {
        setLoadingLocation(true);
        try {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== "granted") {
                Alert.alert(
                    "Izin Ditolak",
                    "Mohon izinkan akses lokasi di pengaturan untuk menggunakan fitur ini."
                );
                setLoadingLocation(false);
                return;
            }

            let location = await Location.getCurrentPositionAsync({
                accuracy: Location.Accuracy.Balanced,
            });

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

    // Auto Locate on Mount (Added)
    useEffect(() => {
        handleLocateMe();
    }, []);

    // Fetch Nearby Users when location or interests change
    useEffect(() => {
        if (userLocation) {
            const fetchNearbyUsers = async () => {
                setLoadingNearbyUsers(true);
                try {
                    const data = await api.getNearbyUsers(
                        userLocation.latitude,
                        userLocation.longitude,
                        5,
                        selectedInterests.length > 0
                            ? selectedInterests
                            : undefined
                    );
                    setNearbyUsers(data);
                } catch (error) {
                    console.error("Error fetching nearby users:", error);
                } finally {
                    setLoadingNearbyUsers(false);
                }
            };

            fetchNearbyUsers();
        }
    }, [userLocation, selectedInterests]);

    // Handler: Toggle Interest
    const toggleInterest = (category: string) => {
        if (selectedInterests.includes(category)) {
            setSelectedInterests((prev) => prev.filter((c) => c !== category));
        } else {
            setSelectedInterests((prev) => [...prev, category]);
        }
    };

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
                    {loadingNewUsers ? (
                        <View className="items-center justify-center py-10">
                            <ActivityIndicator
                                size="large"
                                color={Colors.primary}
                            />
                            <Text className="mt-4 text-gray-500">
                                Memuat user baru...
                            </Text>
                        </View>
                    ) : (
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
                            ListEmptyComponent={
                                <View className="items-center justify-center py-10 px-5">
                                    <Text className="text-gray-500">
                                        Tidak ada user baru tersedia
                                    </Text>
                                </View>
                            }
                        />
                    )}
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
                        {loadingNearbyUsers && (
                            <View
                                className="absolute inset-0 items-center justify-center bg-white/80 z-20"
                                style={{ borderRadius: 20 }}
                            >
                                <ActivityIndicator
                                    size="large"
                                    color={Colors.primary}
                                />
                                <Text className="mt-4 text-gray-500">
                                    Memuat user di sekitar...
                                </Text>
                            </View>
                        )}
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
                                bottom: 100,
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
                                elevation: 5,
                                zIndex: 10,
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
