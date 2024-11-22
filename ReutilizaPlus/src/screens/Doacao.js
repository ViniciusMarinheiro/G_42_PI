import React, { useState } from 'react';
import { View, Text, TextInput, Picker, Button, StyleSheet } from 'react-native';

const Doacao = () => {
  const [categoria, setCategoria] = useState('');
  const [descricao, setDescricao] = useState('');
  const [autorizaDivulgacao, setAutorizaDivulgacao] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reutiliza +</Text>
      <Text style={styles.subtitle}>Histórico e doações:</Text>
      <View style={styles.listaHistorico}></View>
      
      <Text style={styles.subtitle}>Cadastrar equipamento</Text>
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

      <TextInput
        style={styles.input}
        placeholder="Faça uma descrição do produto..."
        value={descricao}
        onChangeText={setDescricao}
      />

      <Text>Autoriza divulgar seu nome como doador?</Text>
      <View style={styles.buttonContainer}>
        <Button title="Sim" onPress={() => setAutorizaDivulgacao(true)} />
        <Button title="Não" onPress={() => setAutorizaDivulgacao(false)} />
      </View>

      {autorizaDivulgacao && (
        <TextInput style={styles.input} placeholder="Nome Completo" />
      )}
      
      <Button title="Cadastrar" onPress={() => {}} />
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
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
});

export default Doacao;
