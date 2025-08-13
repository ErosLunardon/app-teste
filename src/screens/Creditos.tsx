import React, { useState } from "react";
import { 
  StyleSheet, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  View, 
  Modal,
  Alert
} from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context'
import { useColorScheme } from "../lib/useColorScheme";
import { RoutesProps } from "../navigation/DrawerNavigator";
import { Header } from "../components/header/Header";

export const Creditos: React.FC<RoutesProps<"creditos">> = () => {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';
  
  const [saldo, setSaldo] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const handleAddCredito = () => {
    const valor = parseFloat(inputValue);
    if (!isNaN(valor) && valor > 0) {
      setSaldo(prevSaldo => prevSaldo + valor);
      setInputValue('');
      setModalVisible(false);
    } else {
      Alert.alert('Erro', 'Por favor, insira um valor válido');
    }
  };

  const handleInputChange = (text: string) => {
    // Remove caracteres não numéricos, exceto ponto e vírgula
    const numericText = text.replace(/[^0-9.,]/g, '').replace(',', '.');
    setInputValue(numericText);
  };

  return (
    <SafeAreaView style={[styles.container, isDark && styles.containerDark]}>
      <Header />

      <View style={styles.content}>
        <Text style={[styles.title, isDark && styles.titleDark]}>CRÉDITOS</Text>
        <Text style={[styles.subtitle, isDark && styles.subtitleDark]}>
          Confira seu saldo
        </Text>

        <View style={[styles.creditCard, isDark && styles.creditCardDark]}>
          <Text style={[styles.creditValue, { color: '#4CAF50' }]}>{saldo}</Text>
          <Text style={[styles.creditLabel, isDark && styles.creditLabelDark]}>
            MINUTOS DE PEDALADAS
          </Text>
        </View>

        <TouchableOpacity 
          style={styles.addButton}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.addButtonText}>+ ADICIONAR CRÉDITO</Text>
        </TouchableOpacity>
      </View>

      {/* Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, isDark && styles.modalContentDark]}>
            <Text style={[styles.modalTitle, isDark && styles.modalTitleDark]}>
              Adicionar Crédito
            </Text>
            
            <TextInput
              style={[styles.modalInput, isDark && styles.modalInputDark]}
              placeholder="Digite o valor"
              placeholderTextColor={isDark ? "#999" : "#666"}
              value={inputValue}
              onChangeText={handleInputChange}
              keyboardType="numeric"
              autoFocus
            />
            
            <View style={styles.modalButtons}>
              <TouchableOpacity 
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => {
                  setModalVisible(false);
                  setInputValue('');
                }}
              >
                <Text style={styles.cancelButtonText}>Cancelar</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.modalButton, styles.confirmButton]}
                onPress={handleAddCredito}
              >
                <Text style={styles.confirmButtonText}>Adicionar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
  creditCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 30,
    marginBottom: 30,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  creditCardDark: {
    backgroundColor: '#222',
  },
  creditValue: {
    fontSize: 48,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  creditLabel: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
    textAlign: 'center',
  },
  creditLabelDark: {
    color: '#ccc',
  },
  addButton: {
    backgroundColor: '#1e4b8f',
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    width: '80%',
    maxWidth: 300,
  },
  modalContentDark: {
    backgroundColor: '#222',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  modalTitleDark: {
    color: '#fff',
  },
  modalInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    paddingVertical: 12,
    paddingHorizontal: 15,
    fontSize: 16,
    marginBottom: 20,
    color: '#333',
  },
  modalInputDark: {
    borderColor: '#555',
    backgroundColor: '#333',
    color: '#fff',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  cancelButton: {
    backgroundColor: '#f5f5f5',
  },
  confirmButton: {
    backgroundColor: '#1e4b8f',
  },
  cancelButtonText: {
    color: '#666',
    fontWeight: '500',
  },
  confirmButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
