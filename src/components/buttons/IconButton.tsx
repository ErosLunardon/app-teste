import { MaterialIcons } from "@expo/vector-icons";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";

import { useColorScheme } from "../../lib/useColorScheme";

type Props = TouchableOpacityProps & {
  name: React.ComponentProps<typeof MaterialIcons>["name"];
  lightColor?: string;
  darkColor?: string;
};

export const IconButton: React.FC<Props> = ({
  name,
  lightColor = "black",
  darkColor = "white",
  ...rest
}) => {
  const { colorScheme } = useColorScheme();

  const iconColor = colorScheme === "dark" ? darkColor : lightColor;

  return (
    <TouchableOpacity {...rest}>
      <MaterialIcons name={name} size={24} color={iconColor} />
    </TouchableOpacity>
  );
};