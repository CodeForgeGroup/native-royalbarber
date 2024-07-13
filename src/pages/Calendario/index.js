import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, ImageBackground } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { estilo } from './../estilo';

const fnd1 = '../../fotos/fnd1calendario.jpg';

LocaleConfig.locales['pt-br'] = {
  monthNames: [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro'
  ],
  monthNamesShort: ['Jan.', 'Fev.', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul.', 'Ago', 'Set', 'Out', 'Nov.', 'Dez.'],
  dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
  dayNamesShort: ['Dom.', 'Seg.', 'Ter.', 'Qua.', 'Qui.', 'Sex.', 'Sab.'],
  today: "Hoje"
};

LocaleConfig.defaultLocale = 'pt-br';

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
    <ImageBackground source={require(fnd1)} style={{  width: '100%' }}>
      
      <Calendar
        onDayPress={(day) => {
          setSelectedDate(day.dateString);
          console.log('selected day', day);
        }}
        markedDates={{
          [selectedDate]: { selected: true}
        }}

        style={{ marginTop: '15%', width: '100%', backgroundColor: 0 }}

        theme={{
          textSectionTitleColor: '#ffffff',
          monthTextColor: '#ffffff',
          arrowColor: '#ff6d24',
          dayTextColor: '#ffffff',
          textDisabledColor: '#444444',
          todayTextColor: 'orange',
          selectedDayBackgroundColor: '#ff6d24',
          selectedDayTextColor: '#ffffff',
          textDayFontWeight: '300',
          textMonthFontWeight: 'bold',
          textDayHeaderFontWeight: '300',
          textDayFontSize: 20,
          textMonthFontSize: 20,
          textDayHeaderFontSize: 16,
          textDayHeaderFontWeight: 'bold',
          textDayHeaderColor: '#ff6d24',
          backgroundColor: 0,
          'stylesheet.calendar.main': { // Remover fundo branco da área do cabeçalho
            container: {
              backgroundColor: 'transparent',
              marginTop: 30,
            },

            week: {
              marginTop: 20,
              flexDirection: 'row',
              justifyContent: 'space-between',
              backgroundColor: 'transparent',
            },
          },
          'stylesheet.day.basic': {
            base: {
              alignItems: 'center', 
              justifyContent: 'center',
              backgroundColor: 'transparent',
              width: 32,
              height: 32,
            },
          }
        }}
    
      />
      
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
          marginTop: '15%',
          alignSelf: 'center'
        }}
        textStyle={{
          color: 'white',
          fontSize: 18,
          fontWeight: 600,
        }}
      />
    </ImageBackground >
  );
};

export default CalendarScreen;
