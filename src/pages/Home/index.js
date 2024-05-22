import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, ScrollView, Image } from 'react-native';
import { Button, ImageBackground } from 'react-native-web';
import { estilo } from './../estilo';


const banner = '../../assets/fundoBanner.png'

const servico = '../../assets/fundoServico.png'

const CustomButton = ({ onPress, title, buttonStyle, textStyle }) => (
  <TouchableOpacity onPress={onPress} style={estilo.btnAgenda}>
    <Text style={estilo.textAgenda}>{title}</Text>
  </TouchableOpacity>
);

const CustomButton2 = ({ onPress, title, buttonStyle, textStyle }) => (
  <TouchableOpacity onPress={onPress} style={[estilo.botao, buttonStyle]}>
    <Text style={[estilo.textoBotao, textStyle]}>{title}</Text>
  </TouchableOpacity>
);

export default function Home({ navigation }){  

return (
  <ScrollView contentContainerStyle={{ flexGrow: 1 }} style={{ backgroundColor:'white', }}>
    <SafeAreaView style={{ flex: 1, backgroundColor:'white' }}>
      {/* TOPO */}
      <View style={estilo.topo}>
        <Image source={require('../../assets/logoLaranja.svg')} style={estilo.logo} />
        <Text style={estilo.textOla}>Olá, <Text style={{color: 'orange'}}>'USUÁRIO'</Text><br/>Seja bem-vindo(a)</Text>
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

      {/* banner */}
      
      <View style={{}}>
      <ImageBackground source={require(banner)} style={{width: '100%', flex: 1, height: '100%'}}>
        <Text style={{fontSize: 44, color: 'white', marginLeft: 20, marginTop: 50}}>Royal barber,<br/>a <Text style={{color: '#FF6D24'}}>realeza</Text>.</Text>
        <Text style={{fontSize: 27, color: 'white', marginLeft: 20, marginTop: 20}}>Dê um toque<br/>gourmet ao seu<br/>visual, <Text style={{color: '#FD7E14'}}>seja a realeza</Text>.</Text>
        <CustomButton2 title='NOSSOS SERVIÇOS' onPress={() => navigation.navigate('Serviços')} 
        buttonStyle={{
          width: 150,
          height: 40,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#FF6D24',
          borderRadius: 20,
          alignSelf: 'flex-end',
          marginTop: 90,
          marginRight: 30,
          marginBottom: 50
        }}

        textStyle={{
          color: 'white',
          fontWeight: 600,
        }}
        />
        </ImageBackground>
      </View>

      {/* Serviços */}
      <View style={{backgroundColor: 'black', height: 634, position: 'relative', top: -20, borderRadius: 24, alignItems: 'center'}}>
      <ImageBackground source={require(servico)} style={{width: 375}}>
        <Text>Serviços & Produtos</Text>
      </ImageBackground>
      </View>
      
    </SafeAreaView>
  </ScrollView>
  );
}



