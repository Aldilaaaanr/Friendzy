import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";

// Tipe data untuk props
interface InterestPillProps {
    category: string;
    isSelected: boolean;
    onPress: () => void;
}

// Helper untuk icon mapping
const getIconName = (category: string): keyof typeof Ionicons.glyphMap => {
    switch (category) {
        case "Travel":
            return "airplane";
        case "Food":
            return "restaurant";
        case "Nature":
            return "leaf";
        case "Technology":
            return "laptop";
        case "Art":
            return "color-palette";
        case "Sports":
            return "football";
        case "Music":
            return "musical-notes";
        case "Fashion":
            return "shirt";
        case "Health":
            return "heart";
        case "Education":
            return "school";
        default:
            return "pricetag";
    }
};

// Sub-component untuk Item Interest
function InterestPill({ category, isSelected, onPress }: InterestPillProps) {
    return (
        <TouchableOpacity
            onPress={onPress}
            className={`flex-row items-center px-5 py-2.5 rounded-full border mr-2 mb-3 ${
                isSelected
                    ? "bg-[#DA8EE7] border-[#DA8EE7]"
                    : "bg-white border-gray-200"
            }`}
        >
            <Ionicons
                name={getIconName(category)}
                size={18}
                color={isSelected ? "#fff" : "#4A144B"}
            />
            <Text
                className={`ml-2 text-sm font-semibold ${
                    isSelected ? "text-white" : "text-[#4A144B]"
                }`}
            >
                {category}
            </Text>
        </TouchableOpacity>
    );
}

export default function InterestSection() {
    const categories = [
        "Sports",
        "Nature",
        "Music",
        "Fashion",
        "Travel",
        "Food",
        "Technology",
        "Art",
        "Health",
        "Education",
    ];

    // State untuk menghandle multiple selection
    const [selectedInterests, setSelectedInterests] = useState<string[]>([
        "Music",
    ]);
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleInterest = (category: string) => {
        if (selectedInterests.includes(category)) {
            setSelectedInterests((prev) => prev.filter((c) => c !== category));
        } else {
            setSelectedInterests((prev) => [...prev, category]);
        }
    };

    const toggleExpansion = () => {
        setIsExpanded(!isExpanded);
    };

    const sortedCategories = [...categories].sort((a, b) => {
        const aIsSelected = selectedInterests.includes(a);
        const bIsSelected = selectedInterests.includes(b);

        if (aIsSelected && !bIsSelected) {
            return -1;
        }
        if (!aIsSelected && bIsSelected) {
            return 1;
        }
        return 0;
    });

    return (
        <View className="px-5 py-6 bg-background">
            {/* Header */}
            <View className="flex-row justify-between items-end mb-4">
                <Text className="text-2xl font-extrabold text-black">
                    Interest
                </Text>
                <TouchableOpacity onPress={toggleExpansion}>
                    <Text className="text-[#DA8EE7] font-bold text-base mb-1">
                        {isExpanded ? "View less" : "View all"}
                    </Text>
                </TouchableOpacity>
            </View>

            {/* List Kategori */}
            {isExpanded ? (
                <View className="flex-row flex-wrap">
                    {sortedCategories.map((category) => (
                        <InterestPill
                            key={category}
                            category={category}
                            isSelected={selectedInterests.includes(category)}
                            onPress={() => toggleInterest(category)}
                        />
                    ))}
                </View>
            ) : (
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {sortedCategories.slice(0, 5).map((category) => (
                        <InterestPill
                            key={category}
                            category={category}
                            isSelected={selectedInterests.includes(category)}
                            onPress={() => toggleInterest(category)}
                        />
                    ))}
                </ScrollView>
            )}
        </View>
    );
}
