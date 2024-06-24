import * as React from 'react';
// import { Button, View, Text, Image, TextInput, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
// import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Home from './pages/Home';
import Login from './pages/Login';
import Servicos from './pages/Servicos';
import Agenda from './pages/Agenda';
import Perfil from './pages/Perfil';
import CorteMaq from './pages/Cortes/corteMaq'
import { NavigationContainer } from '@react-navigation/native';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function MyTab({route}) {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle:{
          backgroundColor: '#FF6D24',
          padding: 5,
          height: 63
        },
        tabBarLabelStyle: {
          fontSize: 14,
          fontWeight: 500
        },
        headerShown: false,
        tabBarActiveTintColor: '#575656',
        tabBarInactiveTintColor: 'white',
        headerStyle: {
          backgroundColor: '#1B1B1B',

        },
        headerTitleStyle: {
          color: 'white',
          fontWeight: 600,
        },
      }}>
        
      <Tab.Screen name="Inicio" component={Home} initialParams={{idCliente : route.params.idCliente}}/>
      <Tab.Screen name="Serviços" component={Servicos} />
      <Tab.Screen name="Agenda" component={Agenda} />
      <Tab.Screen name="Perfil" component={Perfil} options={{ headerShown: false }} initialParams={{idCliente : route.params.idCliente}}/>
    </Tab.Navigator>
  );
}


export default function Routes() {
  return (
    <Stack.Navigator >
      <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
      <Stack.Screen name="Inicio" component={MyTab} options={{ headerShown: false }} />
      <Stack.Screen name="CorteMaq" component={CorteMaq} options={{ headerShown: true }} />
    </Stack.Navigator>
  );
}