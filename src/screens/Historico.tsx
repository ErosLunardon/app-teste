import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context'
import { useColorScheme } from "../lib/useColorScheme";
import { RoutesProps } from "../navigation/DrawerNavigator";
import { Header } from "../components/header/Header";

export const Historico: React.FC<RoutesProps<"historico">> = () => {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <SafeAreaView style={[styles.container, isDark && styles.containerDark]}>
      <Header />

      <View style={styles.content}>
        <Text style={[styles.title, isDark && styles.titleDark]}>HISTÓRICO</Text>
        <Text style={[styles.subtitle, isDark && styles.subtitleDark]}>
          Veja seu histórico de uso
        </Text>

        <View style={styles.messageContainer}>
          <TouchableOpacity 
            style={[styles.messageButton, isDark && styles.messageButtonDark]}
            disabled
          >
            <Text style={[styles.messageText, isDark && styles.messageTextDark]}>
              NÃO POSSUI NENHUM REGISTRO
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
    backgroundColor: '#fff',
  },
  containerDark: {
    backgroundColor: '#000',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
    marginBottom: 20,
  },
  titleDark: {
    color: '#fff',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 40,
    lineHeight: 20,
  },
  subtitleDark: {
    color: '#ccc',
  },
  messageContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingTop: 20,
  },
  messageButton: {
    backgroundColor: '#1e4b8f',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  messageButtonDark: {
    backgroundColor: '#1e4b8f',
  },
  messageText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  messageTextDark: {
    color: '#fff',
  },
});
