import * as React from 'react';
import {Image} from 'react-native';
// import { Button, View, Text, Image, TextInput, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
// import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons, FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';

import Home from './pages/Home';
import Login from './pages/Login';
import Servicos from './pages/Servicos';
import Agenda from './pages/Agenda';
import Perfil from './pages/Perfil';
import CorteMaq from './pages/Cortes/corteMaq'
import { tintColor } from 'deprecated-react-native-prop-types/DeprecatedImagePropType';


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

        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: 'black'
       
      }}>
        {/* ---------------------- */}
        
      <Tab.Screen
       name="Inicio" 
       component={Home} 
       initialParams={{idCliente : route.params.idCliente}}

       options={{
        tabBarIcon: ({size, color, focused}) => {
          if(focused){
            return <Ionicons name='home' size={size} color={color} />
          }

          return <Ionicons name='home-outline' size={size} color={color} />
        }
       }}
       />

      <Tab.Screen name="Serviços"
      component={Servicos}
      options={{tabBarIcon:({size, color, focused}) => {
        if(focused) {
          return <Ionicons name="cut" size={size} color={color} />
        }

        return <Ionicons name="cut-outline" size={size} color={color} />
       }}} 
      />

      <Tab.Screen 
      name="Agenda" 
      component={Agenda} 
      options={{ 
        headerShown: false,
        tabBarIcon:({size, color, focused}) => {
          if(focused){
            return <Ionicons name="calendar-number" size={size} color={color} />
          }

          return <Ionicons name="calendar-number-outline" size={size} color={color} />
        } 
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
          
          return <Ionicons name='person-outline' size={size} color={color} /> 
        } 
      }} 
      initialParams={{idCliente : route.params.idCliente}}
      />
    </Tab.Navigator>
  );
}

export default function Routes() {
  return (
    <Stack.Navigator screenOptions={{
      headerStyle:{
        backgroundColor: '#1B1B1B'
      },
      headerTitleStyle: {
        color: 'white',
      },
      headerTintColor: 'white'
    }}
    >

      <Stack.Screen 
      name="Login" 
      component={Login} 
      options={{ 
        headerShown: false 
      }} 
      />
      <Stack.Screen 
      name="Inicio" 
      component={MyTab} 
      options={{
         headerShown: false 
      }} 
      />
      <Stack.Screen 
      name="CorteMaq"
     
      component={CorteMaq} 
      options={{ 
        headerShown: true,
        title: 'Corte na máquina' 
      }} 
      />
    </Stack.Navigator>
  );
}