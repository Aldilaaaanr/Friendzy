import Colors from "@/colors";
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import type { ComponentProps } from "react";
import React from "react";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type IoniconName = ComponentProps<typeof Ionicons>["name"];

function focusedIcon(name: IoniconName) {
    return (
        <View className="justify-center items-center bg-secondary w-12 h-12 rounded-full ">
            <Ionicons name={name} size={24} color={"#fff"} />
        </View>
    );
}

function Icon(name: IoniconName) {
    return <Ionicons name={name} size={24} color={Colors.primary} />;
}

export default function BottomNavLayout() {
    const insets = useSafeAreaInsets();

    return (
        <Tabs
            screenOptions={{
                tabBarStyle: {
                    height: 70,
                    backgroundColor: "#fff",
                    paddingTop: 15,
                    borderRadius: 100,
                    position: "absolute",
                    bottom: insets.bottom + 20,
                    marginHorizontal: 20,
                    elevation: 40,
                    shadowOpacity: 0.1,
                    borderTopWidth: 0,
                },
                tabBarActiveTintColor: Colors.primary,
                tabBarInactiveTintColor: "#94A3B8",
                headerShown: false,
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: "",
                    tabBarIcon: ({ focused }) =>
                        focused ? focusedIcon("home") : Icon("home-outline"),
                }}
            />
            <Tabs.Screen
                name="discover"
                options={{
                    title: "",
                    tabBarIcon: ({ focused }) =>
                        focused
                            ? focusedIcon("compass")
                            : Icon("compass-outline"),
                }}
            />
            <Tabs.Screen
                name="add"
                options={{
                    title: "",
                    tabBarIcon: ({ focused }) =>
                        focused ? focusedIcon("add") : Icon("add-outline"),
                }}
            />
            <Tabs.Screen
                name="matches"
                options={{
                    title: "",
                    tabBarIcon: ({ focused }) =>
                        focused
                            ? focusedIcon("people")
                            : Icon("people-outline"),
                }}
            />
            <Tabs.Screen
                name="chats"
                options={{
                    title: "",
                    tabBarIcon: ({ focused }) =>
                        focused
                            ? focusedIcon("chatbubbles")
                            : Icon("chatbubbles-outline"),
                }}
            />
        </Tabs>
    );
}
