import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, SafeAreaView, Image } from 'react-native';
import { estilo } from './../estilo'

const CustomButton = ({ onPress, title }) => (
    <TouchableOpacity onPress={onPress} style={estilo.btnAgenda}>
      <Text style={estilo.textAgenda}>{title}</Text>
    </TouchableOpacity>
  );

export default function Servicos({ navigation }){    
return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} style={{ backgroundColor:'white', }}>
    <SafeAreaView style={{ flex: 1, backgroundColor:'white' }}>
      {/* TOPO */}
      <View style={estilo.topo}>
        <Image source={require('../../assets/logoLaranja.svg')} style={estilo.logo} />
        <Text style={estilo.textOla}>Olá, <Text style={{color: 'orange'}}>'USUÁRIO'</Text><br/>Seja bem-vindo(a)</Text>
      <CustomButton title="AGENDAR" onPress={() => navigation.navigate('Inicio')} ></CustomButton>
      </View>
    </SafeAreaView>
  </ScrollView>
    );

}


