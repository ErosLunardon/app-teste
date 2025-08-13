import React from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context'
import { useColorScheme } from "../lib/useColorScheme";
import { RoutesProps } from "../navigation/DrawerNavigator";
import { Header } from "../components/header/Header";

export const Support: React.FC<RoutesProps<"support">> = () => {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <SafeAreaView style={[styles.container, isDark && styles.containerDark]}>
      <Header />

      <View style={styles.content}>
        <Text style={[styles.title, isDark && styles.titleDark]}>SUPORTE VIA WHATSAPP</Text>
        <Text style={[styles.subtitle, isDark && styles.subtitleDark]}>
          Qualquer problema ou dúvida entre em contato{'\n'}
          conosco via WhatsApp
        </Text>

        <View style={styles.form}>
          <Text style={[styles.fieldLabel, isDark && styles.fieldLabelDark]}>MENSAGEM</Text>
          <TextInput 
            style={[styles.textArea, isDark && styles.inputDark]} 
            placeholder=""
            placeholderTextColor={isDark ? "#999" : "#666"}
            multiline
            numberOfLines={6}
            textAlignVertical="top"
          />
        </View>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>ENVIAR</Text>
        </TouchableOpacity>
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
  form: {
    marginBottom: 40,
  },
  fieldLabel: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    letterSpacing: 0.5,
  },
  fieldLabelDark: {
    color: '#fff',
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingVertical: 15,
    fontSize: 16,
    marginBottom: 25,
    color: '#333',
  },
  textArea: {
    borderWidth: 1,
    borderColor: '#ddd',
    paddingVertical: 15,
    paddingHorizontal: 15,
    fontSize: 16,
    marginBottom: 25,
    color: '#333',
    minHeight: 120,
    borderRadius: 4,
  },
  inputDark: {
    borderBottomColor: '#555',
    borderColor: '#555',
    color: '#fff',
  },
  button: {
    backgroundColor: '#1e4b8f',
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 40,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
