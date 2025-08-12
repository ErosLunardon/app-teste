import {
  createDrawerNavigator,
  DrawerScreenProps,
} from "@react-navigation/drawer";
import React from "react";

import { Home } from "@/screens/Home";
import { Settings } from "@/screens/Settings";

import { Routes } from "./routes";

//aqui são exportadas as propriedades de cada rota disponivel na aplicação
export type RoutesProps<T extends keyof Routes> = DrawerScreenProps<Routes, T>;

//cria um drawer navigator a partir das rotas definidas no arquivo routes
const Drawer = createDrawerNavigator<Routes>();

export const DrawerNavigator: React.FC = () => {
  return (
    <Drawer.Navigator
      initialRouteName="home"
      screenOptions={{ headerShown: false }}
    >
      <Drawer.Screen name="home" component={Home} />
      <Drawer.Screen name="settings" component={Settings} />
    </Drawer.Navigator>
  );
};