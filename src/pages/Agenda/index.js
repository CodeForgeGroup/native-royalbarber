import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, SafeAreaView, ScrollView, ImageBackground, Alert } from 'react-native';
import { estilo } from '../estilo';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { format } from 'date-fns';

const fundo = '../../assets/fundoAgenda.png';
const img = '../../assets/fundoCompro.png';

const CustomButton = ({ onPress, title, buttonStyle, textStyle }) => (
  <TouchableOpacity onPress={onPress} style={[estilo.botao, buttonStyle]}>
    <Text style={[estilo.textoBotao, textStyle]}>{title}</Text>
  </TouchableOpacity>
);

const combineDateAndTime = (date, time) => {
  const [hours, minutes, seconds] = time.split(':');
  const combinedDate = new Date(date);
  combinedDate.setHours(hours);
  combinedDate.setMinutes(minutes);
  combinedDate.setSeconds(seconds);
  return combinedDate;
};

export default function Perfil({ navigation, route }) {
  const { idCliente } = route.params || {};

  const [nomeCliente, setNomeCliente] = useState("");
  const [emailCliente, setEmailCliente] = useState("");
  const [agendamentos, setAgendamentos] = useState([]);

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

  useEffect(() => {
    const fetchServicoData = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        const resposta = await axios.get(`http://127.0.0.1:8000/agendamento/show/${idCliente}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        console.log('Resposta Agendamentos:', resposta.data); // Log para verificar a resposta
        setAgendamentos(resposta.data);
      } catch (error) {
        console.log('Erro ao procurar dados do Servico:', error);
      }
    };
    fetchServicoData();
  }, [idCliente]);

  const handleCancel = async (idAgendamento) => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      await axios.put(`http://127.0.0.1:8000/agendamentos/${idAgendamento}`, {
        statusAgendamento: 'cancelado'

      },
      
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      // Atualizar a lista de agendamentos após o cancelamento
      setAgendamentos(agendamentos.filter(agendamento => agendamento.id !== idAgendamento));
      Alert.alert('Sucesso', 'Agendamento cancelado com sucesso');
    } catch (error) {
      console.log('Erro ao cancelar o agendamento:', error);
      Alert.alert('Erro', 'Não foi possível cancelar o agendamento');
    }
  };

  return (
    <ScrollView>
      <SafeAreaView style={{ flex: 1 }}>
        <ImageBackground source={require(fundo)} style={{ flex: 1, alignItems: 'center', width: 400, height: 800 }}>
          <View style={{ alignSelf: 'flex-start', borderBottomRightRadius: 20, borderTopRightRadius: 20, backgroundColor: '#FD7E14', width: 255, height: 48, marginTop: 30, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ fontSize: 20, fontWeight: 600, color: 'white' }}> MEUS COMPROMISSOS </Text>
          </View>

          {agendamentos.map((agendamento) => (
            <ImageBackground key={agendamento.id} source={require(img)} style={{ alignItems: 'center', justifyContent: 'center', gap: 15, width: 317, height: 200, marginTop: 55 }}>
              <View style={{ gap: 5 }}>
                <View style={{ justifyContent: 'space-between', width: 172, height: 26, flexDirection: 'row' }}>
                  <Text style={{ color: '#FD7E14', fontSize: 18, fontWeight: 600 }}>Horário</Text>
                  <Text style={{ color: 'white', fontSize: 16, fontWeight: 600 }}>{format(combineDateAndTime(agendamento.dataAgendamento, agendamento.horarioInicial), 'HH:mm')}</Text>
                </View>
                <View style={{ justifyContent: 'space-between', width: 200, height: 26, flexDirection: 'row' }}>
                  <Text style={{ color: '#FD7E14', fontSize: 18, fontWeight: 600 }}>Serviço</Text>
                  <Text style={{ color: 'white', fontSize: 16, fontWeight: 600, marginLeft: 40 }}>{agendamento.servico.nomeServico}</Text>
                </View>
                <View style={{ justifyContent: 'space-between', width: 190, height: 26, flexDirection: 'row' }}>
                  <Text style={{ color: '#FD7E14', fontSize: 18, fontWeight: 600 }}>Data</Text>
                  <Text style={{ color: 'white', fontSize: 16, fontWeight: 600, marginLeft: 60 }}>{format(new Date(agendamento.dataAgendamento), 'yyyy/MM/dd')}</Text>
                </View>
                <View style={{ justifyContent: 'space-between', width: 200, height: 26, flexDirection: 'row' }}>
                  <Text style={{ color: '#FD7E14', fontSize: 18, fontWeight: 600 }}>Func.</Text>
                  <Text style={{ color: 'white', fontSize: 16, fontWeight: 600, marginLeft: 40 }}>{agendamento.funcionario.nomeFuncionario} {agendamento.funcionario.sobrenomeFuncionario}</Text>
                </View>
                <View style={{ justifyContent: 'space-between', width: 190, height: 26, flexDirection: 'row' }}>
                  <Text style={{ color: '#FD7E14', fontSize: 18, fontWeight: 600 }}>Status</Text>
                  <Text style={{ color: 'white', fontSize: 16, fontWeight: 600, marginLeft: 0 }}>{agendamento.statusServico}</Text>
                </View>
              </View>

              <CustomButton
                title="CANCELAR"
                onPress={() => handleCancel(agendamento.id)}
                buttonStyle={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '45%',
                  height: '15%',
                  backgroundColor: '#FF6D24',
                  borderBottomRightRadius: 20, borderTopRightRadius: 20, borderBottomLeftRadius: 20, borderTopLeftRadius: 20,
                }}
                textStyle={{
                  color: 'white',
                  fontSize: 13,
                  fontWeight: 600
                }}
              />
            </ImageBackground>
          ))}

          <CustomButton
            title="AGENDAR"
            buttonStyle={{
              alignItems: 'center',
              justifyContent: 'center',
              width: '45%',
              height: 35,
              backgroundColor: '#FF6D24',
              borderBottomRightRadius: 20, borderTopRightRadius: 20, borderBottomLeftRadius: 20, borderTopLeftRadius: 20,
              marginTop: '17%'
            }}
            textStyle={{
              color: 'white',
              fontSize: 18,
              fontWeight: 600,
            }}
          />
        </ImageBackground>
      </SafeAreaView>
    </ScrollView>
  );
}
