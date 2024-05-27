import React, { useState, useRef } from 'react';
import { Text, View, TouchableOpacity, SafeAreaView, ScrollView, Image, ImageBackground } from 'react-native';
import { estilo } from './../estilo';
import { Marquee } from '@animatereactnative/marquee';

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


export default function Home({ navigation }) {

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} style={{ backgroundColor: 'white', }}>
      <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>

        {/* TOPO */}
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

        {/* banner */}

        <View style={{}}>
          <ImageBackground source={require(banner)} style={{ width: '100%', flex: 1, height: '100%' }}>
            <Text style={{ fontSize: 44, color: 'white', marginLeft: 20, marginTop: 50 }}>Royal barber,<br />a <Text style={{ color: '#FF6D24' }}>realeza</Text>.</Text>
            <Text style={{ fontSize: 27, color: 'white', marginLeft: 20, marginTop: 20 }}>Dê um toque<br />gourmet ao seu<br />visual, <Text style={{ color: '#FD7E14' }}>seja a realeza</Text>.</Text>
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
        <View style={{ height: 634, position: 'relative', top: -20, borderRadius: 24 }}>
          <ImageBackground source={require(servico)} style={{ width: '100%', alignItems: 'center', justifyContent: 'center' }}> {/* Serviços e Produtos */}
            <Text style={{ marginTop: 35, fontSize: 28, fontWeight: 700, color: 'white' }}>Serviços & Produtos</Text>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 34, width: '100%'}}> 
              <Text style={{fontSize: 23, fontWeight: 600, color: 'white', marginTop: '55' }}>Cortes masculinos</Text>
              <View style={{flexDirection: 'row', gap: 15, marginTop: 30}}>  {/* Main div dos cortes*/}
                {/* Cortes */}
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                  <Text style={{ position: 'relative', top: 60, zIndex: 1, color: 'white', fontSize: 18, fontWeight: 600 }}>Fade</Text>
                  <Image source={require('../../assets/corte1.png')} />
                </View>

                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                  <Text style={{ position: 'relative', top: 60, zIndex: 1, color: 'white', fontSize: 18, fontWeight: 600 }}>Buzzed</Text>
                  <Image source={require('../../assets/corte2.png')} />
                </View>

                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                  <Text style={{ position: 'relative', top: 60, zIndex: 1, color: 'white', fontSize: 18, fontWeight: 600 }}>Mul</Text>
                  <Image source={require('../../assets/corte3.png')} />
                </View>

                {/* FIM CORTES */}
              </View> {/* FIM MAIN DIV CORTES */}

              <CustomButton2 title='VER MAIS' onPress={() => navigation.navigate('Serviços')}
              buttonStyle={{
                alignItems: 'center',
                justifyContent: 'center',
                width: 100,
                height: 40,
                backgroundColor: '#ff6d24',
                borderRadius: 20,
                marginTop: 30
              }}
              textStyle={{
                color: 'white', 
                fontSize: 13,
                fontWeight: 600,
              }}
            />
            </View>
          </ImageBackground>
        </View>

      </SafeAreaView>
    </ScrollView>
  );
}



