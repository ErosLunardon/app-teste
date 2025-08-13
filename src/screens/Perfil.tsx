import React, { useState } from "react";
import { 
  StyleSheet, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  View,
  Alert
} from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context'
import { useColorScheme } from "../lib/useColorScheme";
import { RoutesProps } from "../navigation/DrawerNavigator";
import { Header } from "../components/header/Header";

export const Perfil: React.FC<RoutesProps<"perfil">> = () => {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';
  
  const [nomeCompleto, setNomeCompleto] = useState('');
  const [email, setEmail] = useState('');
  const [novaSenha, setNovaSenha] = useState('');
  const [confirmeSenha, setConfirmeSenha] = useState('');

  const handleSalvarSenha = () => {
    if (!novaSenha || !confirmeSenha) {
      Alert.alert('Erro', 'Por favor, preencha ambos os campos de senha');
      return;
    }
    
    if (novaSenha !== confirmeSenha) {
      Alert.alert('Erro', 'As senhas não coincidem');
      return;
    }
    
    Alert.alert('Sucesso', 'Senha alterada com sucesso!');
    setNovaSenha('');
    setConfirmeSenha('');
  };

  const handleExcluirConta = () => {
    Alert.alert(
      'Confirmar Exclusão',
      'Tem certeza que deseja excluir sua conta? Esta ação não pode ser desfeita.',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: () => {
            Alert.alert('Conta Excluída', 'Sua conta foi excluída com sucesso.');
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={[styles.container, isDark && styles.containerDark]}>
      <Header />

      <View style={styles.content}>
        <Text style={[styles.title, isDark && styles.titleDark]}>PERFIL</Text>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, isDark && styles.sectionTitleDark]}>
            INFORMAÇÕES
          </Text>
          
          <View style={styles.form}>
            <TextInput 
              style={[styles.input, isDark && styles.inputDark]} 
              placeholder="Nome Completo"
              placeholderTextColor={isDark ? "#999" : "#666"}
              value={nomeCompleto}
              onChangeText={setNomeCompleto}
            />
            
            <TextInput 
              style={[styles.input, isDark && styles.inputDark]} 
              placeholder="Email"
              placeholderTextColor={isDark ? "#999" : "#666"}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, isDark && styles.sectionTitleDark]}>
            ALTERAR SENHA
          </Text>
          
          <View style={styles.form}>
            <TextInput 
              style={[styles.input, isDark && styles.inputDark]} 
              placeholder="Nova Senha"
              placeholderTextColor={isDark ? "#999" : "#666"}
              value={novaSenha}
              onChangeText={setNovaSenha}
              secureTextEntry
            />
            
            <TextInput 
              style={[styles.input, isDark && styles.inputDark]} 
              placeholder="Confirme sua nova senha"
              placeholderTextColor={isDark ? "#999" : "#666"}
              value={confirmeSenha}
              onChangeText={setConfirmeSenha}
              secureTextEntry
            />
          </View>

          <TouchableOpacity 
            style={styles.saveButton}
            onPress={handleSalvarSenha}
          >
            <Text style={styles.saveButtonText}>SALVAR NOVA SENHA</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity 
          style={styles.deleteLink}
          onPress={handleExcluirConta}
        >
          <Text style={[styles.deleteLinkText, isDark && styles.deleteLinkTextDark]}>
            Excluir minha conta
          </Text>
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
    marginBottom: 40,
  },
  titleDark: {
    color: '#fff',
  },
  section: {
    marginBottom: 40,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
    letterSpacing: 0.5,
  },
  sectionTitleDark: {
    color: '#fff',
  },
  form: {
    marginBottom: 20,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingVertical: 15,
    fontSize: 16,
    marginBottom: 20,
    color: '#333',
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 10,
  },
  inputDark: {
    borderBottomColor: '#555',
    backgroundColor: '#222',
    color: '#fff',
  },
  saveButton: {
    backgroundColor: '#1e4b8f',
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  deleteLink: {
    alignItems: 'center',
    marginTop: 20,
  },
  deleteLinkText: {
    color: '#1e4b8f',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
  deleteLinkTextDark: {
    color: '#4a90e2',
  },
});
