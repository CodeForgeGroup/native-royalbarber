import * as React from 'react';
import {Image} from 'react-native';
// import { Button, View, Text, Image, TextInput, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
// import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons, FontAwesome } from '@expo/vector-icons';

import Home from './pages/Home';
import Login from './pages/Login';
import Servicos from './pages/Servicos';
import Agenda from './pages/Agenda';
import Perfil from './pages/Perfil';
import CorteMaq from './pages/Cortes/corteMaq'


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const CustomBackButton = () => (
  <Image
    source={require('./assets/iconHomeC.svg')}
    style={{ height: 22, width: 22}} // Adjust styles as needed
  />
);

function MyTab({route}) {
  return (
    <Tab.Navigator
    screenOptions={{
        tabBarStyle:{
          backgroundColor: '#FF6D24',
          padding: 5,
          height: 63,
          borderTopWidth: 0
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
        {/* ---------------------- */}
        
      <Tab.Screen
       name="Inicio" 
       component={Home} 
       initialParams={{idCliente : route.params.idCliente}}

       options={{
        tabBarIcon: ({focused}) => {
          if(focused){
            return <CustomBackButton style={{width: 25, height: 27}}/>
          }

          return <Image source={require('./assets/iconHomeP.svg')} />
        }
       }}
       />

      <Tab.Screen name="Serviços"
       component={Servicos} 
       />
      <Tab.Screen 
      name="Agenda" 
      component={Agenda} 
      options={{ 
        headerShown: false,
        // tabBarIcon:({size, color, focused}) => {
        //   return <Image source={require('./assets/')} />
        // } 
      }} 
      initialParams={{idCliente : route.params.idCliente}}
      />
      

      <Tab.Screen
      name="Perfil" 
      component={Perfil} 
      options={{ 
        headerShown: false,
        tabBarIcon:({size, color, focused}) => {
          if(focused){
            return <Ionicons name='person' size={size} color={color} />
          }
          
          return <Ionicons name='person' size={size} color={color} /> 
        } 
      }} 
      initialParams={{idCliente : route.params.idCliente}}
      />
    </Tab.Navigator>
  );
}

export default function Routes() {
  return (
    <Stack.Navigator screenOptions={{ headerBackImage: () => <CustomBackButton />, }}>
      <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
      <Stack.Screen name="Inicio" component={MyTab} options={{ headerShown: false }} />
      <Stack.Screen name="Corte na máquina" component={CorteMaq} options={{ headerStyle: { backgroundColor: '#1B1B1B', borderBottomColor: '#00000', elevation: 0}, headerTintColor: 'white', headerTitleStyle: {
        fontWeight: 'bold',
        fontSize: 20
      }}} />
    </Stack.Navigator>
  );
}