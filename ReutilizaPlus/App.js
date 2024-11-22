import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './src/screens/Login';
import CadastroNovoUser from './src/screens/CadastroNovoUser';
import MeuPerfil from './src/screens/MeuPerfil';


const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="CadastroNovoUser" component={CadastroNovoUser} />
        <Stack.Screen name="MeuPerfil" component={MeuPerfil} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
