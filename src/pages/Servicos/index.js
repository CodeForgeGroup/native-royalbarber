import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, SafeAreaView, Image, ImageBackground } from 'react-native';
import { estilo } from './../estilo'
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

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


export default function Servicos({ navigation , route}) {

  
  const { idCliente } = route.params || {};

  console.log("Cód Cliente: ", idCliente);
  console.log(route.params);

  const [nomeCliente, setNomeCliente] = useState("");
  const [emailCliente, setEmailCliente] = useState("");
  const [nomeServico, setNomeServico] = useState("");
  const [descricaoServico, setDescricaoServico] = useState("");
  const [fotoServico, setFotoServico] = useState("");
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

  useEffect(() => {
    const fetchClienteData = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        const resposta = await axios.get(`http://127.0.0.1:8000/cliente/${idCliente}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        console.log('Resposta Cliente:', resposta.data); // Log para verificar a resposta
        setNomeCliente(resposta.data.nomeCliente);
        setEmailCliente(resposta.data.emailCliente);
      } catch (error) {
        console.log('Erro ao procurar dados do cliente:', error);
      }
    };
    if (idCliente) {
      fetchClienteData();
    }
  }, [idCliente]);
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} style={{ backgroundColor: 'white', }}>
      <SafeAreaView style={{ flex: 1, backgroundColor: 'black' }}>

        <View style={estilo.topo}>
          <Image source={require('../../assets/logoLaranja.svg')} style={estilo.logo} />
          <Text style={estilo.textOla}>Olá, <Text style={{ color: 'orange' }}>{nomeCliente}</Text><br />Seja bem-vindo(a)</Text>
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

        <ImageBackground source={require(gradiente)} style={{ height: 500, alignItems: 'center', width:400 }}>

          <Image source={require('../../assets/tesoura.svg')} style={{ marginTop: 15 }} />
          <Text style={{ fontSize: 22, fontWeight: 'bold', color: 'white' }}>SERVIÇOS</Text>

          <View style={{ marginTop: 60, marginBottom: 35, marginLeft:20 }}>
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
              <Text style={{ color: 'white', fontSize: 20, fontWeight: 600 }}>{nomeServico}</Text>
            </View>
          </View>
          <View style={{ marginTop: 60, marginBottom: 35, marginLeft:50, }}>
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
              <Text style={{ color: 'white', fontSize: 20, fontWeight: 600 }}>{nomeServico}</Text>
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
          {servicos.map(servico=> (
          <View key={servico.id} style={{ backgroundColor: 'white', width: '90%', height: 86, flexDirection: 'row', alignItems: 'center', cursor: 'pointer' }}>
            <Image source={require('../../assets/corteServ.png')} style={{borderColor: 'white', borderWidth: 1, width:90, height:85,}}  />
            <View style={{ height: '70%', justifyContent: 'space-between', marginLeft: 25,width:180, }} >
              <Text style={{ fontSize: 16, fontWeight: 600, color: '#FF6D24' }}>{servico.nomeServico}</Text>
              <Text style={{ fontSize: 14 }}>{servico.descricaoServico}</Text>
            </View>
            <Image source={require('../../assets/Arrow 5.png')} style={{marginLeft: '9%', cursor: 'pointer'}} />
          </View>
          ))};

        </View>
      </SafeAreaView>
    </ScrollView>
  );

}



