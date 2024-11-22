import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const DoarOuReceber = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reutiliza +</Text>
      <View style={styles.buttonContainer}>
        <Button 
          title="Fazer uma doação" 
          onPress={() => navigation.navigate('Doacao')} 
        />
        <Button 
          title="Receber uma doação" 
          onPress={() => navigation.navigate('Recebimento')} 
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  buttonContainer: {
    width: '80%',
    gap: 20,
  },
});

export default DoarOuReceber;
