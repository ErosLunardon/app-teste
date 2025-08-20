import React from "react";
import { StyleSheet, Text } from "react-native";

import { SafeAreaView } from 'react-native-safe-area-context'

import { MenuButton } from "../components/buttons/MenuButton";
import { RoutesProps } from "../navigation/DrawerNavigator";

import ChatBot from "./ChatBot/ChatBot";

const faqOptions = [
  {
    question: 'Quais são os métodos de pagamento disponíveis?',
    answer: 'Aceitamos cartão de crédito para todos os planos e serviços.',
  },
  {
    question: 'Como posso retirar uma bicicleta?',
    answer: 'Dirija-se a uma doca, escaneie o QR Code e siga as instruções no aplicativo.',
  },
];


export const Home: React.FC<RoutesProps<"home">> = () => {
  return (
    <SafeAreaView style={styles.container}>
      <MenuButton />
      <ChatBot faqOptions={faqOptions} buttonLabel="💬" />
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