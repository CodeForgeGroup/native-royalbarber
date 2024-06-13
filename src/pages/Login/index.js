import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, ScrollView, Image, TextInput } from 'react-native';
import { Button, ImageBackground } from 'react-native-web';
import { estilo } from '../estilo'

const ImgBack = '../../../assets/fundo.png';

const CustomButton = ({ onPress, title }) => (
  <TouchableOpacity onPress={onPress} style={estilo.button}>
    <Text style={estilo.text}>{title}</Text>
  </TouchableOpacity>
);

const CustomButton2 = ({ onPress, title }) => (
  <TouchableOpacity onPress={onPress} style={estilo.button2}>
    <Text style={estilo.text1}>{title}</Text>
  </TouchableOpacity>
);


export default function Login({ navigation }){    
return (

  
    <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor:'white' }}>
    <ImageBackground source={require(ImgBack)} style={{ flex: 1, alignItems: 'center', justifyContent: 'center', width:'100%',}}>
        <Image
        source={require('../../../assets/logo-royalbarberBRANCO.png')} 
        style={{ width: 250, height: 140, marginBottom:0, position:'relative'}} 
        />
        <Text style={{ fontSize:50, fontWeight:'bold', color: 'white', marginTop:0, marginBottom:10,}}>LOGIN</Text>
        <TextInput
        style={{ fontWeight:'bold', color:'white', height: 40, width: 300, borderColor: 'transparent', borderTopColor:'transparent', borderWidth: 1, marginTop: 20, paddingHorizontal: 10, borderBlockColor: '#ff6d24' }}
        placeholder="Email"
        editable={false}
       />
        <TextInput
        secureTextEntry={true}
        style={{ fontWeight:'bold', color:'white', height: 40, width: 300, borderColor: 'transparent', borderTopColor:'transparent', borderWidth: 1, marginTop: 20, paddingHorizontal: 10, borderBlockColor: '#ff6d24',}}
        placeholder="Senha"
       />

      <CustomButton
        title="ENTRAR"
        onPress={() => navigation.navigate('Inicio')}
      />

      <CustomButton2
        title="Esqueci a senha"
        onPress={() => navigation.navigate('#')}
      />
      </ImageBackground>
    </SafeAreaView>
  
    );
}


