import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, SafeAreaView, ScrollView, ImageBackground, Alert } from 'react-native';
import { estilo } from '../estilo';
import Modal from "react-native-modal";
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { format } from 'date-fns';
import { Ionicons, MaterialIcons } from '@expo/vector-icons'

const fundo = '../../fotos/fundoAgenda.png';
const img = '../../fotos/fundoCompro.png';

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

  const [errorModalVisible, setErrorModalVisible] = useState(false);
  const [okModalVisible, setOkModalVisible] = useState(false);

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
        statusAgendamento: 'CANCELADO'

      },
      setErrorModalVisible(true),
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
      <SafeAreaView>
        <ImageBackground source={require(fundo)} style={{  alignItems: 'center', justifyContent: 'center', width: '100%', height:'100%' }}>
          <View style={{ alignSelf: 'flex-start', borderBottomRightRadius: 20, borderTopRightRadius: 20, backgroundColor: '#FD7E14', width: 255, height: 48, marginTop: 30, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ fontSize: 20, fontWeight: 600, color: 'white' }}> MEUS COMPROMISSOS </Text>
          </View>
          
          {agendamentos.map((agendamento) => (
            <View key={agendamento.id} style={{ backgroundColor: '#1B1B1B', alignItems: 'center', justifyContent: 'center', gap: 15, width: '80%', marginTop: 55, alignSelf: 'center', height:200, borderRadius:20 }}>
              


              <View style={{ flexDirection:'row' }}>
                <View style={{ textAlign:'center', width:'60%'}}>

                <Text style={{ color: '#FD7E14', fontSize: 18, fontWeight: 600, }}>Horário</Text>
                <Text style={{ color: '#FD7E14', fontSize: 18, fontWeight: 600 }}>Serviço</Text>
                <Text style={{ color: '#FD7E14', fontSize: 18, fontWeight: 600 }}>Data</Text>
                <Text style={{ color: '#FD7E14', fontSize: 18, fontWeight: 600 }}>Func</Text>
                <Text style={{ color: '#FD7E14', fontSize: 18, fontWeight: 600, marginRight:15, }}>Status</Text>

                </View>



                <View style={{ textAlign:'start', width:'80%', justifyContent:'space-around' }}>
                  <Text style={{ color: 'white', fontSize: 16, fontWeight: 600 }}>{format(combineDateAndTime(agendamento.dataAgendamento, agendamento.horarioInicial), 'HH:mm')}</Text>
                  <Text style={{ color: 'white', fontSize: 16, fontWeight: 600 }}>{agendamento.servico.nomeServico}</Text>
                  <Text style={{ color: 'white', fontSize: 16, fontWeight: 600 }}>{format(new Date(agendamento.dataAgendamento), 'yyyy/MM/dd')}</Text>
                  <Text style={{ color: 'white', fontSize: 16, fontWeight: 600 }}>{agendamento.funcionario.nomeFuncionario} {agendamento.funcionario.sobrenomeFuncionario}</Text>
                  <Text style={{ color: 'white', fontSize: 16, fontWeight: 600 }}>{agendamento.statusServico}</Text>
                </View>
              </View>
              {agendamento.statusServico !== 'CANCELADO' &&(
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
              )}
            </View>
          ))}

<Modal isVisible={okModalVisible} onBackButtonPress={() => setOkModalVisible(false)} >
 
 <View style={{ backgroundColor: '#fff', padding: 20, borderRadius: 10, alignItems: 'center', }}>
   <Ionicons name="checkmark-circle-outline" size={62} color="green" />
   <Text style={{ fontSize: 22, fontWeight: 700, marginBottom: 10, color: 'green' }}>Sucesso!</Text>
   <Text style={{ fontSize: 18, fontWeight: 500, marginBottom: 20, textAlign: 'center', color: '#1B1B1B', }}>Agendamento confirmado, nos vemos em breve.</Text>
   <TouchableOpacity onPress={() => setOkModalVisible(false)}>
     <Text style={{ fontSize: 18, color: '#3498db' }} onPress={() => navigation.navigate('Agenda')}>OK</Text>
   </TouchableOpacity>
 </View>
</Modal>

<Modal isVisible={errorModalVisible} onBackButtonPress={() => setErrorModalVisible(false)} >

 <View style={{ backgroundColor: '#fff', padding: 20, borderRadius: 10, alignItems: 'center', }}>
 <MaterialIcons name="error-outline" size={62} color="red" />
   <Text style={{ fontSize: 22, fontWeight: 'bold', marginBottom: 10, color: 'red' }}>Entendido!</Text>
   <Text style={{ fontSize: 18, fontWeight: 500, marginBottom: 20, textAlign: 'center', color: '#333', }}>Agendamento cancelado, esperamos que possamos fornecer nossos serviços em algum momento.</Text>
   <TouchableOpacity onPress={() => setErrorModalVisible(false)}>
     <Text style={{ fontSize: 18, color: '#3498db' }}>OK</Text>
   </TouchableOpacity>
 </View>
 
</Modal>

          <CustomButton
            title="AGENDAR"
            onPress={() => navigation.navigate('Serviços')}
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
