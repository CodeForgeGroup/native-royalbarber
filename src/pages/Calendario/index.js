import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Calendar } from 'react-native-calendars';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { estilo } from './../estilo';
import moment from 'moment';
import 'moment/locale/pt-br';

moment.locale('pt-br');

const CustomButton = ({ onPress, title, buttonStyle, textStyle }) => (
    <TouchableOpacity onPress={onPress} style={[estilo.botao, buttonStyle]}>
      <Text style={[estilo.textoBotao, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );

const CalendarScreen = ({ navigation, route }) => {
  const { idServico, nomeServico, descricaoServico, idCliente } = route.params;

  const [selectedDate, setSelectedDate] = useState('');
  const [nomeCliente, setNomeCliente] = useState("");
  const [emailCliente, setEmailCliente] = useState("");

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
    fetchClienteData();
  }, [idCliente]);

  const goToAgendamento = () => {
    navigation.navigate('Agendamento', {
      idServico: idServico,
      nomeServico: nomeServico,
      descricaoServico: descricaoServico,
      idCliente: idCliente,
      dataSelecionada: selectedDate,
    });
  };

  return (
    <View style={{ backgroundColor: '#1B1B1B' }}>
      
      <Calendar
        onDayPress={(day) => {
          setSelectedDate(day.dateString);
          console.log('selected day', day);
        }}
        markedDates={{
          [selectedDate]: { selected: true, marked: true}
        }}

        locale={{
          monthNames: [
            'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 
            'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
          ],
          monthNamesShort: [
            'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 
            'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'
          ],
          dayNames: [
            'Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'
          ],
          dayNamesShort: [
            'Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'
          ],
          today: 'Hoje'
        }}

        theme={{
          selectedDayBackgroundColor: '#ff6d24',
          calendarBackground: '#1B1B1B',
          dayTextColor: 'white',
          agendaDayTextColor: '#ff6d24'
          
        }}
    
      />
      <Text>Serviço Selecionado: {nomeServico}</Text>
      <Text>Descrição do Serviço: {descricaoServico}</Text>
      <Text>Data Selecionada: {selectedDate}</Text>
      <CustomButton
        title="AGENDAR"
        onPress={goToAgendamento}
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
    </View>
  );
};

export default CalendarScreen;
