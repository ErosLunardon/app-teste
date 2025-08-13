import {
  createDrawerNavigator,
  DrawerScreenProps,
} from "@react-navigation/drawer";
import React from "react";

import { Home } from "../screens/Home";
import { Settings } from "../screens/Settings";
import { Cadastro } from "../screens/Cadastro";
import { Routes } from "./routes";

export type RoutesProps<T extends keyof Routes> = DrawerScreenProps<Routes, T>;

const Drawer = createDrawerNavigator<Routes>();

export const DrawerNavigator: React.FC = () => {
  return (
    <Drawer.Navigator
      initialRouteName="home"
      screenOptions={{ headerShown: false }}
    >
      <Drawer.Screen name="home" component={Home} />
      <Drawer.Screen name="settings" component={Settings} />
      <Drawer.Screen name="cadastro" component={Cadastro} />
    </Drawer.Navigator>
  );
};