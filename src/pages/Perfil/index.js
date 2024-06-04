import React from 'react';
import { Text, View, TouchableOpacity, SafeAreaView, ScrollView, Image, ImageBackground, TextInput } from 'react-native';

const fundo = '../../assets/fundoPerfil.png'

export default function App(){
    return (
        <ScrollView contentContainerStyle={{ flex: 1}}>
            <ImageBackground source={require(fundo)} style={{flex:1, alignItems: 'center' }}>

            <Image source={require('../../assets/fundoFoto.png')} />
            <Image source={require('../../assets/fotoPerfil.png')} style={{position: 'absolute', top: 30}}/>
           
            <Text style={{fontSize: 24, fontWeight: 700, alignSelf: 'flex-start', marginTop: 55, marginLeft: 30, color: 'white'}}>Meus dados</Text> 
            
            <TextInput></TextInput>
            </ImageBackground>
        </ScrollView>

    );
}