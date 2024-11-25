import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, FlatList, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const Doacao = () => {
  const [categoria, setCategoria] = useState('');
  const [descricao, setDescricao] = useState('');
  const [autorizaDivulgacao, setAutorizaDivulgacao] = useState(false);
  const [nome, setNome] = useState('');
  const [historico, setHistorico] = useState([]);

  const carregarHistorico = async () => {
    try {
      const response = await fetch('http://192.168.15.13:5000/doacoes_feitas');
      const data = await response.json();
      setHistorico(data);
    } catch (error) {
      console.error('Erro ao carregar histórico:', error);
    }
  };

  const cadastrarDoacao = async () => {
    if (!categoria || !descricao || (autorizaDivulgacao && !nome)) {
      Alert.alert('Erro', 'Preencha todos os campos obrigatórios!');
      return;
    }

    const novaDoacao = {
      categoria,
      descricao,
      autorizaDivulgacao,
      ...(autorizaDivulgacao && { nome }),
    };

    try {
      const response = await fetch('http://192.168.15.13:5000/doacoes_feitas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(novaDoacao),
      });

      if (response.ok) {
        Alert.alert('Sucesso', 'Doação registrada com sucesso!');
        setCategoria('');
        setDescricao('');
        setAutorizaDivulgacao(false);
        setNome('');
        carregarHistorico(); // Atualiza o histórico após cadastrar
      } else {
        Alert.alert('Erro', 'Não foi possível registrar a doação.');
      }
    } catch (error) {
      console.error('Erro ao cadastrar doação:', error);
    }
  };

  // Carrega o histórico ao montar o componente
  useEffect(() => {
    carregarHistorico();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reutiliza +</Text>
      <Text style={styles.subtitle}>Histórico de Doações:</Text>
      <FlatList
        data={historico}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.itemText}>
              {item.categoria} - {item.descricao}
              {item.autorizaDivulgacao && item.nome ? ` (Doador: ${item.nome})` : ''}
            </Text>
          </View>
        )}
        style={styles.listaHistorico}
      />

      <Text style={styles.subtitle}>Cadastrar Equipamento</Text>
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
        <TextInput
          style={styles.input}
          placeholder="Nome Completo"
          value={nome}
          onChangeText={setNome}
        />
      )}

      <Button title="Cadastrar" onPress={cadastrarDoacao} />
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
    height: 150,
    backgroundColor: '#f0f0f0',
    marginBottom: 10,
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  itemText: {
    fontSize: 16,
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
