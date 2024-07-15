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
      <ScrollView>
        <Text style={{ fontSize: 20, fontWeight: 'bold', paddingVertical: 11, paddingHorizontal: 20, backgroundColor: '#FD7E14', color: 'white', width: '90%', borderTopEndRadius: 15, borderBottomEndRadius: 15, marginTop: 30 }} >SELECIONE UM FUNCIONÁRIO</Text>

        
          <Text style={{ fontSize: 22, fontWeight: 'bold', color: 'white', alignSelf: 'center', marginTop: 15 }}>HORÁRIOS</Text>
          <View style={{ width: '90%', alignSelf: 'center', flexDirection: 'row', gap: 10, marginTop: 20}}>
            <View style={{ width: 100, height: 40, backgroundColor: '#1B1B1B', alignItems: 'center', justifyContent: 'center', borderRadius: 15 }}>
              <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>15:00</Text>
            </View>
            <View style={{ width: 100, height: 40, backgroundColor: '#FD7E14', alignItems: 'center', justifyContent: 'center', borderRadius: 15 }}>
              <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>15:30</Text>
            </View>
            <View style={{ width: 100, height: 40, backgroundColor: '#1B1B1B', alignItems: 'center', justifyContent: 'center', borderRadius: 15 }}>
              <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>16:00</Text>
            </View>
          </View>
          
          <TouchableOpacity style={{ color: 'white', fontSize: 16, padding: 15, backgroundColor: '#1B1B1B', alignItems: 'center', justifyContent: 'center', width: '45%', alignSelf: 'center', marginTop: 40, borderRadius: 20 }}>
          AGENDAR  
          </TouchableOpacity>
        
        </ScrollView>
      </ImageBackground>
      
    </SafeAreaView>
  );
}
