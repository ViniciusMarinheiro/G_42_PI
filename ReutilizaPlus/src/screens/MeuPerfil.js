import React, { useState } from 'react';
import { View, Text, TextInput, Button, Switch, StyleSheet } from 'react-native';

const MeuPerfil = () => {

  const [notificacoes, setNotificacoes] = useState(false);
  const [limites, setLimites] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reutiliza +</Text>
      <Text style={styles.subtitle}>Dados cadastrais:</Text>

      <TextInput style={styles.input} placeholder="Nome completo" />
      <TextInput style={styles.input} placeholder="Data Nasc." />
      <TextInput style={styles.input} placeholder="E-mail" />
      <TextInput style={styles.input} placeholder="CPF" />
      <TextInput style={styles.input} placeholder="Telefone 1" />
      <TextInput style={styles.input} placeholder="Senha" secureTextEntry />

      <Text style={styles.subtitle}>Endereço:</Text>
      <TextInput style={styles.input} placeholder="CEP" />
      <TextInput style={styles.input} placeholder="Rua / Logradouro" />
      <TextInput style={styles.input} placeholder="Número" />
      <TextInput style={styles.input} placeholder="Cidade" />
      <TextInput style={styles.input} placeholder="Bairro" />

      <Text style={styles.subtitle}>Deseja receber notificações?</Text>
      <View style={styles.switchContainer}>
        <Text>Novas doações</Text>
        <Switch value={notificacoes} onValueChange={setNotificacoes} />
      </View>
      <View style={styles.switchContainer}>
        <Text>Limites de doação</Text>
        <Switch value={limites} onValueChange={setLimites} />
      </View>

      <Text style={styles.subtitle}>Alteração de senha:</Text>
      <TextInput style={styles.input} placeholder="Senha atual" secureTextEntry />
      <TextInput style={styles.input} placeholder="Nova senha" secureTextEntry />
      <TextInput style={styles.input} placeholder="Confirmar senha" secureTextEntry />

      <Button title="Salvar e Voltar" onPress={() => {}} />
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
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
});

export default MeuPerfil;
