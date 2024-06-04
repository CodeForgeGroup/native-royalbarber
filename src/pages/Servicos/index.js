import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, SafeAreaView, Image } from 'react-native';
import { estilo } from './../estilo'

const CustomButton = ({ onPress, title, buttonStyle, textStyle }) => (
  <TouchableOpacity onPress={onPress} style={[estilo.botao, buttonStyle]}>
    <Text style={[estilo.textoBotao, textStyle]}>{title}</Text>
  </TouchableOpacity>
);


export default function Servicos({ navigation }){    
return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} style={{ backgroundColor:'white', }}>
    <SafeAreaView style={{ flex: 1, backgroundColor:'white' }}>
      

      <CustomButton title="CORTE MAQUINA" onPress={() => navigation.navigate('Corte na máquina')} />
    </SafeAreaView>
  </ScrollView>
    );

}


