import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { SafeAreaView } from 'react-native-safe-area-context'

import { MenuButton } from "../components/buttons/MenuButton";
import { useColorScheme } from "../lib/useColorScheme";
import { RoutesProps } from "../navigation/DrawerNavigator";

export const Settings: React.FC<RoutesProps<"settings">> = () => {
  const { colorScheme, toggleColorScheme } = useColorScheme();

  return (
    <SafeAreaView style={styles.container}>
      <View className="flex-1 justify-center px-4 bg-white dark:bg-black">
        <MenuButton />

        <View className="flex-1 gap-5 mt-[320px]">
          <Text className="text-center text-black dark:text-white">
            Settings Screen
          </Text>

          <TouchableOpacity
            onPress={toggleColorScheme}
            className="mt-6 self-center bg-black dark:bg-white px-6 py-3 rounded-md"
          >
            <Text className="text-white dark:text-black text-base font-medium">
              Alternar para tema {colorScheme === "dark" ? "claro" : "escuro"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});