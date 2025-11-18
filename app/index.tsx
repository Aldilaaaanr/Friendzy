import Colors from "@/colors";
import Button from "@/components/Button";
import "@/global.css";
import { router } from "expo-router";
import { Image, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function App() {
    const handleClick = () => {
        router.replace("/(tabs)");
    };

    return (
        <SafeAreaView className="flex-1  bg-white">
            <View className="flex-1 items-center justify-center">
                <View className="mb-6 items-center justify-center">
                    <Image
                        style={{
                            width: 310,
                            height: 310,
                            resizeMode: "contain",
                            marginBottom: 60,
                        }}
                        source={require("@/assets/images/hero.png")}
                    />
                    <Text
                        className="text-3xl text-center font-extrabold max-w-xs leading-relaxed"
                        style={{ color: Colors.primary }}
                    >
                        Let’s meeting new people around you
                    </Text>
                </View>
                <View className="mt-4 w-3/4">
                    <Button
                        title="Login with Phone"
                        type="primary"
                        icon="call"
                        // on press go to tabs
                        onPress={handleClick}
                    />
                </View>
                <View className="mt-4 w-3/4">
                    <Button
                        title="Login with Google"
                        type="secondary"
                        icon="logo-google"
                        onPress={handleClick}
                    />
                </View>
                <Text className="mt-10 text-gray-600">
                    Don’t have an account?{" "}
                    <Text
                        style={{ color: Colors.secondary }}
                        className="font-semibold"
                    >
                        Sign up
                    </Text>
                </Text>
            </View>
        </SafeAreaView>
    );
}
