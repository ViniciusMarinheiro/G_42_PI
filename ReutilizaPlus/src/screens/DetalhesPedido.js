import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Picker } from 'react-native';

const DetalhesPedido = () => {
  const [frete, setFrete] = useState('Mesma Cidade');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reutiliza +</Text>
      <Text style={styles.subtitle}>Produtos disponíveis:</Text>
      <View style={styles.listaProdutos}></View>

      <Picker
        selectedValue={frete}
        onValueChange={(itemValue) => setFrete(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Mesma Cidade - R$35" value="Mesma Cidade" />
        <Picker.Item label="Outra Cidade - R$70" value="Outra Cidade" />
      </Picker>

      <Button title="Confirmar pedido" onPress={() => {}} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    marginVertical: 10,
  },
  listaProdutos: {
    height: 200,
    backgroundColor: '#ccc',
    marginBottom: 10,
  },
  picker: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
  },
});

export default DetalhesPedido;
