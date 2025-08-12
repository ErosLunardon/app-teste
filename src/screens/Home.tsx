import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { SafeAreaView } from 'react-native-safe-area-context'

import { MenuButton } from "../components/buttons/MenuButton";
import { RoutesProps } from "../navigation/DrawerNavigator";

export const Home: React.FC<RoutesProps<"home">> = () => {
  return (
    <SafeAreaView style={styles.container}>
      <MenuButton />
      <Text style={styles.text}>Home Screen</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  text: { flex: 1, marginHorizontal: "auto", marginTop: 350 },
});