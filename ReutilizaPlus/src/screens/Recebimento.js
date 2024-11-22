import React, { useState } from 'react';
import { View, Text, Picker, Button, StyleSheet } from 'react-native';

const Recebimento = () => {
  const [categoria, setCategoria] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reutiliza +</Text>
      <Text style={styles.subtitle}>Produtos recebidos por mim:</Text>
      <View style={styles.listaHistorico}></View>
      
      <Text style={styles.subtitle}>Preciso de um novo produto</Text>
      <Picker
        selectedValue={categoria}
        onValueChange={(itemValue) => setCategoria(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Selecione" value="" />
        <Picker.Item label="Muletas" value="Muletas" />
        <Picker.Item label="Bengalas" value="Bengalas" />
        <Picker.Item label="Andador" value="Andador" />
        <Picker.Item label="Outros" value="Outros" />
      </Picker>

      <Button title="Procurar" onPress={() => {}} />
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
  listaHistorico: {
    height: 100,
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

export default Recebimento;
