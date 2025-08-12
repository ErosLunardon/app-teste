import { DrawerNavigationProp } from "@react-navigation/drawer";
import { useNavigation } from "@react-navigation/native";
import React from "react";

import type { Routes } from "../../navigation/routes";

import { IconButton } from "./IconButton";

type NavigationProps = DrawerNavigationProp<Routes>;

export const MenuButton: React.FC = () => {
  const navigation = useNavigation<NavigationProps>();

  return (
    <IconButton
      className="dark: color-white"
      name="menu"
      onPress={() => navigation.openDrawer()}
    />
  );
};