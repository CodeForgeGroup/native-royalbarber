import React, { useState, useEffect } from 'react';
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

const fnd2 = '../../fotos/fnd2horario.jpg'



export default function Agendamento({ navigation, route }) {
  const { idServico, nomeServico, descricaoServico, idCliente, dataSelecionada } = route.params || {};

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
      idCliente: idCliente,
    });
  };

  // carousel

  const { width: screenWidth } = Dimensions.get('window');

  

 

  return (
    <SafeAreaView>
      <ImageBackground source={require(fnd2)} style={{width: '100%'}}>
        <Text style={{ fontSize: 20, fontWeight: 'bold', paddingVertical: 11, paddingHorizontal: 20, backgroundColor: '#ff6d24', color: 'white', width: '90%', borderTopEndRadius: 15, borderBottomEndRadius: 15, marginTop: 30 }} >SELECIONE UM FUNCIONÁRIO</Text>

        <View>
          <Text>HORÁRIOS</Text>
          <View style={{ }}>
            <View>15:00</View>
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}
