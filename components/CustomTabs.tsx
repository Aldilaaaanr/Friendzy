import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface CustomTabsProps {
    tabs: string[];
    activeTab: string;
    onTabChange: (tab: string) => void;
}

export default function CustomTabs({
    tabs,
    activeTab,
    onTabChange,
}: CustomTabsProps) {
    return (
        <View className="bg-[#F8E8F8] p-1.5 rounded-full flex-row h-[54px]">
            {tabs.map((tab) => {
                const isActive = activeTab === tab;

                return (
                    <TouchableOpacity
                        key={tab}
                        onPress={() => onTabChange(tab)}
                        className={`flex-1 items-center justify-center rounded-full ${
                            isActive ? "bg-white shadow-sm" : "bg-transparent"
                        }`}
                    >
                        <Text
                            className={`text-base font-bold ${
                                isActive ? "text-primary" : "text-[#9C789D]"
                            }`}
                        >
                            {tab}
                        </Text>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
}
