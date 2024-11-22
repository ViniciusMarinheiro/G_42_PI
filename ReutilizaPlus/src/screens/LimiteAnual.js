import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const LimiteAnual = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reutiliza +</Text>
      <Text style={styles.subtitle}>Infelizmente você atingiu o limite de doações anuais</Text>
      
      <View style={styles.listaPedidos}></View>
      
      <Text style={styles.subtitle}>
        Você pode solicitar novas doações a partir de:
      </Text>
      <View style={styles.dateBox}>
        <Text>Dia / Mês / Ano</Text>
      </View>

      <Button title="Voltar ao menu anterior" onPress={() => {}} />
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
    textAlign: 'center',
  },
  listaPedidos: {
    height: 200,
    backgroundColor: '#ccc',
    marginBottom: 10,
  },
  dateBox: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
});

export default LimiteAnual;
