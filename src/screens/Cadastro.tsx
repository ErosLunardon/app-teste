import "react"
import { StyleSheet, Text, TextInput } from "react-native";

import { SafeAreaView } from 'react-native-safe-area-context'

import { MenuButton } from "../components/buttons/MenuButton";
import { RoutesProps } from "../navigation/DrawerNavigator";

export const Cadastro: React.FC<RoutesProps<"cadastro">> = () => {
  return (
    <SafeAreaView style={styles.container}>
      <MenuButton />
      <Text style={styles.text}>Cadastro Screen</Text>
      <TextInput style={styles.input} placeholder="Nome" />
      <TextInput style={styles.input} placeholder="Email" />
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
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
  },
});