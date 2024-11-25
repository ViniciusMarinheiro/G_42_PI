'use client';

import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Switch, StyleSheet, Alert, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const MeuPerfil = () => {
  const route = useRoute();
  const { username } = route.params;
  const navigation = useNavigation();

  const [nome, setNome] = useState('');
  const [dataNasc, setDataNasc] = useState('');
  const [email, setEmail] = useState('');
  const [cpf, setCpf] = useState('');
  const [telefone, setTelefone] = useState('');
  const [telefone2, setTelefone2] = useState('');
  const [rg, setRg] = useState('');
  const [senha, setSenha] = useState('');
  const [cep, setCep] = useState('');
  const [rua, setRua] = useState('');
  const [numero, setNumero] = useState('');
  const [cidade, setCidade] = useState('');
  const [bairro, setBairro] = useState('');
  const [complemento, setComplemento] = useState('');
  const [senhaAtual, setSenhaAtual] = useState('');
  const [novaSenha, setNovaSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [notificacoes, setNotificacoes] = useState(false);
  const [limites, setLimites] = useState(false);

  const handleExcluir = async () => {
    Alert.alert(
      "Confirmação",
      "Tem certeza que deseja excluir seu perfil? Esta ação não pode ser desfeita.",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Excluir",
          style: "destructive",
          onPress: async () => {
            try {
              const response = await fetch(`http://192.168.15.13:5000/perfil?username=${username}`, {
                method: "DELETE",
              });

              if (!response.ok) {
                const errorMessage = `Erro ${response.status}: ${response.statusText}`;
                Alert.alert("Erro", errorMessage, [{ text: "OK" }]);
                return;
              }

              Alert.alert("Sucesso", "Perfil excluído com sucesso!", [
                { text: "OK", onPress: () => navigation.navigate("Login") },
              ]);
            } catch (error) {
              console.error("Erro de conexão:", error);
              Alert.alert("Erro", `Erro ao conectar ao servidor: ${error.message}`, [{ text: "OK" }]);
            }
          },
        },
      ]
    );
  };

  const carregarDadosPerfil = async () => {
    try {
      const response = await fetch(`http://192.168.15.13:5000/perfil?username=${username}`);
      if (!response.ok) {
        throw new Error(`Erro ao buscar os dados: ${response.statusText}`);
      }

      const dados = await response.json();
      setNome(dados.nome || '');
      setDataNasc(dados.data_nascimento || '');
      setEmail(dados.email || '');
      setCpf(dados.cpf || '');
      setTelefone(dados.telefone || '');
      setTelefone2(dados.telefone2 || '');
      setRg(dados.rg || '');
      setCep(dados.endereco?.cep || '');
      setRua(dados.endereco?.rua || '');
      setNumero(dados.endereco?.numero || '');
      setCidade(dados.endereco?.cidade || '');
      setBairro(dados.endereco?.bairro || '');
      setComplemento(dados.endereco?.complemento || '');
      setNotificacoes(dados.preferencias?.notificacoes || false);
      setLimites(dados.preferencias?.limites || false);

      verificarDadosFaltantes(dados);
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', `Erro ao carregar os dados: ${error.message}`, [{ text: 'OK' }]);
    }
  };

  const verificarDadosFaltantes = (dados) => {
    const camposFaltantes = [];
    if (!dados.nome) camposFaltantes.push('Nome');
    if (!dados.data_nascimento) camposFaltantes.push('Data de Nascimento');
    if (!dados.email) camposFaltantes.push('E-mail');
    if (!dados.cpf) camposFaltantes.push('CPF');
    if (!dados.telefone) camposFaltantes.push('Telefone');
    if (!dados.rg) camposFaltantes.push('RG');
    if (!dados.endereco?.cep) camposFaltantes.push('CEP');
    if (!dados.endereco?.rua) camposFaltantes.push('Rua');
    if (!dados.endereco?.numero) camposFaltantes.push('Número');
    if (!dados.endereco?.cidade) camposFaltantes.push('Cidade');
    if (!dados.endereco?.bairro) camposFaltantes.push('Bairro');

    if (camposFaltantes.length > 0) {
      Alert.alert(
        'Dados Incompletos',
        `Os seguintes campos estão faltando: ${camposFaltantes.join(', ')}`,
        [{ text: 'OK' }]
      );
    }
  };

  useEffect(() => {
    carregarDadosPerfil();
  }, []);

  const handleSalvar = async () => {
    if (novaSenha && novaSenha !== confirmarSenha) {
      Alert.alert('Erro', 'A nova senha e a confirmação não coincidem.', [{ text: 'OK' }]);
      return;
    }

    const dadosPerfil = {
      nome,
      data_nascimento: dataNasc,
      email,
      cpf,
      telefone,
      telefone2,
      rg,
      senha,
      endereco: {
        cep,
        rua,
        numero,
        cidade,
        bairro,
        complemento,
      },
      preferencias: {
        notificacoes,
        limites,
      },
      alteracao_senha: {
        senha_atual: senhaAtual,
        nova_senha: novaSenha,
      },
    };

    try {
      const response = await fetch(`http://192.168.15.13:5000/perfil?username=${username}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dadosPerfil),
      });

      if (!response.ok) {
        const errorMessage = `Erro ${response.status}: ${response.statusText}`;
        Alert.alert('Erro', errorMessage, [{ text: 'OK' }]);
        return;
      }

      Alert.alert('Sucesso', 'Dados salvos com sucesso! Redirecionando para Doar ou Receber', [
        { text: 'OK', onPress: () => navigation.navigate('DoarOuReceber') },
      ]);
    } catch (error) {
      console.error('Erro de conexão:', error);
      Alert.alert('Erro', `Erro ao conectar ao servidor: ${error.message}`, [{ text: 'OK' }]);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Reutiliza +</Text>
      <Text style={styles.subtitle}>Dados cadastrais:</Text>

      <TextInput style={styles.input} placeholder="Nome completo" value={nome} onChangeText={setNome} />
      <TextInput style={styles.input} placeholder="Data Nasc." value={dataNasc} onChangeText={setDataNasc} />
      <TextInput style={styles.input} placeholder="E-mail" value={email} onChangeText={setEmail} />
      <TextInput style={styles.input} placeholder="CPF" value={cpf} onChangeText={setCpf} />
      <TextInput style={styles.input} placeholder="Telefone 1" value={telefone} onChangeText={setTelefone} />
      <TextInput style={styles.input} placeholder="Telefone 2" value={telefone2} onChangeText={setTelefone2} />
      <TextInput style={styles.input} placeholder="RG" value={rg} onChangeText={setRg} />
      <TextInput style={styles.input} placeholder="Senha" secureTextEntry value={senha} onChangeText={setSenha} />

      <Text style={styles.subtitle}>Endereço:</Text>
      <TextInput style={styles.input} placeholder="CEP" value={cep} onChangeText={setCep} />
      <TextInput style={styles.input} placeholder="Rua / Logradouro" value={rua} onChangeText={setRua} />
      <TextInput style={styles.input} placeholder="Número" value={numero} onChangeText={setNumero} />
      <TextInput style={styles.input} placeholder="Cidade" value={cidade} onChangeText={setCidade} />
      <TextInput style={styles.input} placeholder="Bairro" value={bairro} onChangeText={setBairro} />
      <TextInput style={styles.input} placeholder="Complemento" value={complemento} onChangeText={setComplemento} />

      <Text style={styles.subtitle}>Alteração de senha:</Text>
      <TextInput style={styles.input} placeholder="Senha atual" secureTextEntry value={senhaAtual} onChangeText={setSenhaAtual} />
      <TextInput style={styles.input} placeholder="Nova senha" secureTextEntry value={novaSenha} onChangeText={setNovaSenha} />
      <TextInput style={styles.input} placeholder="Confirmar nova senha" secureTextEntry value={confirmarSenha} onChangeText={setConfirmarSenha} />

      <View style={styles.switchContainer}>
        <Text>Receber notificações</Text>
        <Switch value={notificacoes} onValueChange={setNotificacoes} />
      </View>
      <View style={styles.switchContainer}>
        <Text>Limitar quantidade</Text>
        <Switch value={limites} onValueChange={setLimites} />
      </View>

      <View style={styles.buttonContainer}>
        <Button title="Salvar e Prosseguir" onPress={handleSalvar} />
        <Button title="Excluir perfil" color="red" onPress={handleExcluir} />

      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
    padding: 10,
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  buttonContainer: {
    marginTop: 20,
  },
});

export default MeuPerfil;
