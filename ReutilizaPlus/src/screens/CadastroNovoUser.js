import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

export default function CadastroNovoUser() {
  const [username, setUsername] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');

  const handleCadastro = async () => {
    if (senha !== confirmarSenha) {
      Alert.alert(
        'Erro',
        'As senhas não coincidem!',
        [{ text: 'OK', onPress: () => console.log('Alerta fechado') }]
      );
      return;
    }
  
    const novoUsuario = {
      username,
      senha,
    };
  
    try {
      const response = await fetch('http://192.168.15.13:5000/usuarios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(novoUsuario),
      });
  
      if (response.ok) {
        Alert.alert(
          'Sucesso',
          'Usuário cadastrado com sucesso!',
          [{ text: 'OK', onPress: () => console.log('Usuário cadastrado') }]
        );
        setUsername('');
        setSenha('');
        setConfirmarSenha('');
      } else {
        const erro = await response.json();
        Alert.alert(
          'Erro',
          erro.mensagem || 'Falha ao cadastrar o usuário.',
          [{ text: 'OK', onPress: () => console.log('Erro ao cadastrar') }]
        );
      }
    } catch (error) {
      Alert.alert(
        'Erro',
        'Não foi possível conectar ao servidor.',
        [{ text: 'OK', onPress: () => console.log('Erro de conexão:', error, JSON.stringify(novoUsuario)) }]
      );
    }
  };
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reutiliza +</Text>
      
      <Text style={styles.label}>Primeiro acesso?</Text>
      
      <TextInput
        style={styles.input}
        placeholder="E-mail"
        keyboardType="username-address"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        secureTextEntry={true}
        value={senha}
        onChangeText={setSenha}
      />
      <TextInput
        style={styles.input}
        placeholder="Confirme a senha"
        secureTextEntry={true}
        value={confirmarSenha}
        onChangeText={setConfirmarSenha}
      />

      <TouchableOpacity style={styles.button} onPress={handleCadastro}>
        <Text style={styles.buttonText}>Continuar</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.loginLink}>
        <Text style={styles.loginText}>Já tem uma conta? Faça login →</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    marginBottom: 20,
    paddingVertical: 8,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#000',
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loginLink: {
    marginTop: 20,
    alignItems: 'center',
  },
  loginText: {
    color: '#000',
    fontSize: 14,
  },
});
