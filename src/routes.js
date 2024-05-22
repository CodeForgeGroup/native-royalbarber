import * as React from 'react';
// import { Button, View, Text, Image, TextInput, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
// import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Home from './pages/Home';
import Login from './pages/Login';
import Servicos from './pages/Servicos';
import Agenda from './pages/Agenda';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function MyTab(){
  return (
    <Tab.Navigator>
      <Tab.Screen name="Inicio" component={Home} options={{headerShown : false}}/>
      <Tab.Screen name="Serviços" component={Servicos} options={{headerShown : false}}/>
    </Tab.Navigator>
  );
}

export default function Routes(){
 return(
   <Stack.Navigator >
    <Stack.Screen name="Login" component={Login} options={{headerShown : false}} />
    <Stack.Screen name="Inicio" component={MyTab} options={{headerShown : false}} />
  </Stack.Navigator>
 );
}