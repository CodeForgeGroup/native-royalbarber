import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, SafeAreaView, Image, ImageBackground } from 'react-native';
import { estilo } from './../estilo'

const CustomButton = ({ onPress, title, buttonStyle, textStyle }) => (
  <TouchableOpacity onPress={onPress} style={[estilo.botao, buttonStyle]}>
    <Text style={[estilo.textoBotao, textStyle]}>{title}</Text>
  </TouchableOpacity>
);

const CustomButton2 = ({ onPress, title, buttonStyle, textStyle }) => (
  <TouchableOpacity onPress={onPress} style={[estilo.botao, buttonStyle]}>
    <Text style={[estilo.textoBotao, textStyle]}>{title}</Text>
  </TouchableOpacity>
);

const gradiente = '../../assets/gradiente.svg';

const corte1 = '../../assets/corte1.png'


export default function Servicos({ navigation }){    
return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} style={{ backgroundColor:'white', }}>
    <SafeAreaView style={{ flex: 1, backgroundColor:'white' }}>

    <View style={estilo.topo}>
          <Image source={require('../../assets/logoLaranja.svg')} style={estilo.logo} />
          <Text style={estilo.textOla}>Olá, <Text style={{ color: 'orange' }}>'USUÁRIO'</Text><br />Seja bem-vindo(a)</Text>
          <CustomButton title="AGENDAR" onPress={() => navigation.navigate('Inicio')}
            buttonStyle={{
              alignItems: 'center',
              justifyContent: 'center',
              width: 98,
              height: 44,
              padding: 15,
              backgroundColor: '#FF6D24',
              borderRadius: 20,
            }}
            textStyle={{
              fontSize: 14,
              fontWeight: 600,
              color: 'white',
            }}
          />
        </View>

      <ImageBackground source={require(gradiente)} style={{width: '100%', height: 500, alignItems: 'center'}}>

        <Image source={require('../../assets/tesoura.svg')} style={{ marginTop: 15 }} />
        <Text style={{ fontSize: 22, fontWeight: 'bold', color: 'white' }}>SERVIÇOS</Text>

        <ImageBackground source={require(corte1)} style={{ alignItems: 'center', alignSelf: 'center' }}>
          <View style={{backgroundColor: 'rgba(51, 51, 51, 0.8)', height: 73, alignItems: 'center', justifyContent: 'center',}}>
            <Text>Corte na máquina</Text>
          </View>
        </ImageBackground>    


      </ImageBackground>


      <CustomButton title="CORTE MAQUINA" onPress={() => navigation.navigate('Corte na maq')} />
    </SafeAreaView>
  </ScrollView>
    );

}



