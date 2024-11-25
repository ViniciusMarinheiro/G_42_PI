import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Importa o hook de navegação

export default function Login() {
  const navigation = useNavigation(); // Cria a instância de navegação

  const [username, setUsername] = useState('');
  const [senha, setSenha] = useState('');

  const handleLogin = async () => {
    if (!username || !senha) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    try {
      const response = await fetch('http://192.168.15.13:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "username": username,
          "senha": senha,
        }),
      });

      const responseText = await response.text();
      console.log('Resposta da API:', responseText);

      let data = {};
      try {
        data = JSON.parse(responseText);
      } catch (jsonError) {
        console.error('Erro ao tentar parsear a resposta como JSON:', jsonError);
        Alert.alert('Erro', 'A resposta da API não é um JSON válido.');
        return;
      }

      if (response.status === 200) {
        Alert.alert('Sucesso', 'Login bem-sucedido!');
        navigation.navigate('MeuPerfil', {username});
      } else {
        Alert.alert('Erro', data.erro || 'Erro ao tentar fazer login.');
      }
    } catch (error) {
      console.error('Erro ao tentar fazer login:', error);
      Alert.alert('Erro', 'Houve um erro ao tentar se conectar ao servidor.');
    }
  };


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reutiliza +</Text>

      <TextInput
        style={styles.input}
        placeholder="E-mail"
        value={username}
        onChangeText={setUsername}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        value={senha}
        onChangeText={setSenha}
        type="password"
      />

      <TouchableOpacity style={styles.forgotPasswordButton}>
        <Text style={styles.forgotPasswordText}>Esqueceu a senha?</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('CadastroNovoUser')}
      >
        <Text style={styles.buttonText}>Criar nova conta</Text>
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
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    marginBottom: 20,
    paddingVertical: 8,
    fontSize: 16,
  },
  forgotPasswordButton: {
    alignItems: 'center',
    marginBottom: 20,
  },
  forgotPasswordText: {
    color: '#000',
    fontSize: 14,
  },
  button: {
    backgroundColor: '#000',
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
