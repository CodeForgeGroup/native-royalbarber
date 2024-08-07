import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, SafeAreaView, Image, ImageBackground, Dimensions } from 'react-native';
import { estilo } from './../estilo';
import Carousel from 'react-native-snap-carousel';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CustomButton = ({ onPress, title, buttonStyle, textStyle }) => (
  <TouchableOpacity onPress={onPress} style={[estilo.botao, buttonStyle]}>
    <Text style={[estilo.textoBotao, textStyle]}>{title}</Text>
  </TouchableOpacity>
);

const gradiente = '../../fotos/gradiente.svg';

const { width: screenWidth } = Dimensions.get('window');

export default function Servicos({ navigation, route }) {
  const { idCliente } = route.params || {};

  const [nomeCliente, setNomeCliente] = useState("");
  const [servicos, setServicos] = useState([]);

  useEffect(() => {
    const fetchServicoData = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        const resposta = await axios.get(`http://127.0.0.1:8000/servico/show`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setServicos(resposta.data);
      } catch (error) {
        console.log('Erro ao procurar dados do Servico:', error);
      }
    };
    fetchServicoData();
  }, []);

  const goToCalendario = (servico) => {
    navigation.navigate('Calendario', {
      idServico: servico.id,
      nomeServico: servico.nomeServico,
      descricaoServico: servico.descricaoServico,
      duracaoServico: servico.duracaoServico,
      idCliente: idCliente,
    });
  };

  const _renderItem = ({ item }) => {
    const fotoURL = item.fotoServico === "SEM IMAGEM" 
      ? 'http://codegroupdev.com.br/royalbarber/royalbarber/public/images/royalBarberFunc.png'
      : `http://codegroupdev.com.br/royalbarber/royalbarber/storage/app/public/${item.fotoServico}`;
    console.log(item.fotoServico);
    return (
      <View style={{ marginTop: 60, marginBottom: 35 }}>
       <Image source={{ uri: fotoURL }} style={{ width: '100%', height: 300, borderRadius:20 }} />
        <View
          style={{
            backgroundColor: 'rgba(51, 51, 51, 0.8)',
            height: 73,
            alignItems: 'center',
            justifyContent: 'center',
            position: 'absolute',
            top: 228,
            width: '100%',
            borderBottomStartRadius: 15,
            borderBottomEndRadius: 15,
          }}
        >
          <Text style={{ color: 'white', fontSize: 20, fontWeight: 600 }}>{item.nomeServico}</Text>
        </View>
      </View>
    );
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} style={{ backgroundColor: 'white' }}>
      <SafeAreaView style={{ flex: 1, backgroundColor: 'black' }}>
        <View style={estilo.topo}>
          <Image source={require('../../fotos/logoLaranja.svg')} style={estilo.logo} />
          <Text style={estilo.textOla}>Olá, <Text style={{ color: 'orange' }}>{nomeCliente}</Text><br />Seja bem-vindo(a)</Text>
          <CustomButton
            title="AGENDAR"
            onPress={() => navigation.navigate('Inicio')}
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

        <ImageBackground source={require(gradiente)} style={{ height: 500, alignItems: 'center', width: 400 }}>
          <Image source={require('../../fotos/tesoura.svg')} style={{ marginTop: 15 }} />
          <Text style={{ fontSize: 22, fontWeight: 'bold', color: 'white' }}>SERVIÇOS</Text>

          <Carousel
            data={servicos}
            renderItem={_renderItem}
            sliderWidth={screenWidth}
            itemWidth={screenWidth * 0.63}
            layout={'default'}
            firstItem={1}
          />
        </ImageBackground>

        <View style={{
          backgroundColor: 'black',
          borderTopEndRadius: 24,
          borderTopStartRadius: 24,
          position: 'relative',
          top: -21,
          alignItems: 'center',
          paddingVertical: 20, // Adicionado para um pouco de espaçamento vertical
        }}>
          {servicos.map(servico => {
            const fotoURL = servico.fotoServico == "SEM IMAGEM"
              ? 'http://codegroupdev.com.br/royalbarber/royalbarber/public/images/royalBarberFunc.png'
              : `http://codegroupdev.com.br/royalbarber/royalbarber/storage/app/public/${servico.fotoServico}`;

            return (
              <TouchableOpacity key={servico.id} onPress={() => goToCalendario(servico)}>
                <View style={{ 
                  backgroundColor: 'white', 
                  width: '90%', 
                  height: 86, 
                  flexDirection: 'row', 
                  alignItems: 'center', 
                  cursor: 'pointer', 
                  width: 350, 
                  marginVertical: 10, // Adicionado para um pouco de espaçamento entre os itens
                }}>
                  <Image source={{ uri: fotoURL }} style={{ 
                    borderColor: 'white', 
                    borderWidth: 1, 
                    width: 90, 
                    height: 85 
                  }} />
                  <View style={{ 
                    height: '70%', 
                    justifyContent: 'space-between', 
                    marginLeft: 25, 
                    width: 180 
                  }}>
                    <Text style={{ 
                      fontSize: 16, 
                      fontWeight: 600, 
                      color: '#FF6D24' 
                    }}>
                      {servico.nomeServico}
                    </Text>
                    <Text style={{ 
                      fontSize: 14 
                    }}>
                      {servico.descricaoServico}
                    </Text>
                  </View>
                  <Image source={require('../../fotos/Arrow 5.png')} style={{ 
                    marginLeft: '9%' 
                  }} />
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}
