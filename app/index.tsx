import Button from "@/components/Button";
import "@/global.css";
import { Text, View } from "react-native";

export default function App() {
    return (
        <View className="flex-1 items-center justify-center bg-white">
            <Text className="text-xl font-bold text-blue-500">
                Welcome to Nativewind!
            </Text>
            <View className="mt-4 w-3/5">
                <Button
                    title="Login with Phone"
                    type="primary"
                    icon="call"
                    onPress={() => {}}
                />
            </View>
            <View className="mt-4 w-3/5">
                <Button
                    title="Login with Google"
                    type="secondary"
                    icon="logo-google"
                    onPress={() => {}}
                />
            </View>
        </View>
    );
}
