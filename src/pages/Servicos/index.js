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

// const corteServ = '../../assets/corteServ.png'


export default function Servicos({ navigation }) {
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} style={{ backgroundColor: 'white', }}>
      <SafeAreaView style={{ flex: 1, backgroundColor: 'black' }}>

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

        <ImageBackground source={require(gradiente)} style={{ height: 500, alignItems: 'center' }}>

          <Image source={require('../../assets/tesoura.svg')} style={{ marginTop: 15 }} />
          <Text style={{ fontSize: 22, fontWeight: 'bold', color: 'white' }}>SERVIÇOS</Text>

          <View style={{ marginTop: 60, marginBottom: 35 }}>
            <Image source={require('../../assets/corteServ.png')} />
            <View
              style={{
                backgroundColor: 'rgba(51, 51, 51, 0.8)',
                height: 73, alignItems: 'center',
                justifyContent: 'center',
                position: 'absolute',
                top: 228,
                width: '100%',
                borderBottomStartRadius: 15,
                borderBottomEndRadius: 15,
              }}
            >
              <Text style={{ color: 'white', fontSize: 20, fontWeight: 600 }}>CORTE NA MÁQUINA</Text>
            </View>
          </View>
        </ImageBackground>

        <View
          style={{
            backgroundColor: 'black',
            borderTopEndRadius: 24,
            borderTopStartRadius: 24,
            height: 575,
            position: 'relative',
            top: -21,
            alignItems: 'center',
            justifyContent: 'space-evenly'
            
          }}
        >
          <View style={{ backgroundColor: 'white', width: '90%', height: 86, flexDirection: 'row', alignItems: 'center', cursor: 'pointer' }}>
            <Image source={require('../../assets/cort.png')} style={{borderColor: 'white', borderWidth: 1}}  />
            <View style={{ height: '70%', justifyContent: 'space-between', marginLeft: 25 }} >
              <Text style={{ fontSize: 16, fontWeight: 600, color: '#FF6D24' }}>Corte na máquina</Text>
              <Text style={{ fontSize: 14 }}>Corte simples, tradicional.</Text>
            </View>
            <Image source={require('../../assets/Arrow 5.png')} style={{marginLeft: '9%', cursor: 'pointer'}} />
          </View>

          <View style={{ backgroundColor: 'white', width: '90%', height: 86, flexDirection: 'row', alignItems: 'center', cursor: 'pointer' }}>
            <Image source={require('../../assets/cort.png')} style={{borderColor: 'white', borderWidth: 1}}  />
            <View style={{ height: '70%', justifyContent: 'space-between', marginLeft: 25 }} >
              <Text style={{ fontSize: 16, fontWeight: 600, color: '#FF6D24' }}>Corte na máquina</Text>
              <Text style={{ fontSize: 14 }}>Corte simples, tradicional.</Text>
            </View>
            <Image source={require('../../assets/Arrow 5.png')} style={{marginLeft: '9%', cursor: 'pointer'}} />
          </View>

          <View style={{ backgroundColor: 'white', width: '90%', height: 86, flexDirection: 'row', alignItems: 'center', cursor: 'pointer' }}>
            <Image source={require('../../assets/cort.png')} style={{borderColor: 'white', borderWidth: 1}}  />
            <View style={{ height: '70%', justifyContent: 'space-between', marginLeft: 25 }} >
              <Text style={{ fontSize: 16, fontWeight: 600, color: '#FF6D24' }}>Corte na máquina</Text>
              <Text style={{ fontSize: 14 }}>Corte simples, tradicional.</Text>
            </View>
            <Image source={require('../../assets/Arrow 5.png')} style={{marginLeft: '9%', cursor: 'pointer'}} />
          </View>

          <View style={{ backgroundColor: 'white', width: '90%', height: 86, flexDirection: 'row', alignItems: 'center', cursor: 'pointer' }}>
            <Image source={require('../../assets/cort.png')} style={{borderColor: 'white', borderWidth: 1}}  />
            <View style={{ height: '70%', justifyContent: 'space-between', marginLeft: 25 }} >
              <Text style={{ fontSize: 16, fontWeight: 600, color: '#FF6D24' }}>Corte na máquina</Text>
              <Text style={{ fontSize: 14 }}>Corte simples, tradicional.</Text>
            </View>
            <Image source={require('../../assets/Arrow 5.png')} style={{marginLeft: '9%', cursor: 'pointer'}} />
          </View>

          <View style={{ backgroundColor: 'white', width: '90%', height: 86, flexDirection: 'row', alignItems: 'center', cursor: 'pointer' }}>
            <Image source={require('../../assets/cort.png')} style={{borderColor: 'white', borderWidth: 1}}  />
            <View style={{ height: '70%', justifyContent: 'space-between', marginLeft: 25 }} >
              <Text style={{ fontSize: 16, fontWeight: 600, color: '#FF6D24' }}>Corte na máquina</Text>
              <Text style={{ fontSize: 14 }}>Corte simples, tradicional.</Text>
            </View>
            <Image source={require('../../assets/Arrow 5.png')} style={{marginLeft: '9%', cursor: 'pointer'}} />
          </View>

          <TouchableOpacity
            onPress={() => navigation.navigate('Corte na máquina')}
            style={{color: 'white'}}
          >ALOO </TouchableOpacity>

        </View>
      </SafeAreaView>
    </ScrollView>
  );

}



