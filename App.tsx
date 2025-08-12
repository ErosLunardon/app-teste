import "react-native-reanimated"
import { SafeAreaProvider } from "react-native-safe-area-context";


import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
  NavigationContainer,
  Theme,
} from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import React from "react";

import { NAV_THEME } from "./src/lib/constants";
import { useColorScheme } from "./src/lib/useColorScheme";
import { DrawerNavigator } from "./src/navigation/DrawerNavigator";

export default function App() {
  const { colorScheme } = useColorScheme(); // dark | light

  const isDark = colorScheme === "dark";

  const theme: Theme = {
    ...(isDark ? NavigationDarkTheme : NavigationDefaultTheme),
    colors: {
      ...(isDark ? NavigationDarkTheme.colors : NavigationDefaultTheme.colors),
      background: NAV_THEME[colorScheme].background,
      card: NAV_THEME[colorScheme].card,
      text: NAV_THEME[colorScheme].text,
      border: NAV_THEME[colorScheme].border,
      notification: NAV_THEME[colorScheme].notification,
      primary: NAV_THEME[colorScheme].primary,
    },
  };

return (
  <SafeAreaProvider>
    <NavigationContainer theme={theme}>
      <StatusBar style={isDark ? "light" : "dark"} />
      <DrawerNavigator />
    </NavigationContainer>
  </SafeAreaProvider>
);
}