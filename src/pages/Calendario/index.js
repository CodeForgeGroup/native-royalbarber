import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { Calendar } from 'react-native-calendars';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const CalendarScreen = ({ navigation, route }) => {
  const { idServico, nomeServico, descricaoServico } = route.params;

  const [selectedDate, setSelectedDate] = useState('');
  const [nomeCliente, setNomeCliente] = useState("");
  const [emailCliente, setEmailCliente] = useState("");

//   useEffect(() => {
//     const fetchClienteData = async () => {
//       try {
//         const token = await AsyncStorage.getItem('userToken');
//         const resposta = await axios.get(`http://127.0.0.1:8000/cliente/${idServico}`, {
//           headers: {
//             Authorization: `Bearer ${token}`
//           }
//         });
//         console.log('Resposta Cliente:', resposta.data); // Log para verificar a resposta
//         setNomeCliente(resposta.data.nomeCliente);
//         setEmailCliente(resposta.data.emailCliente);
//       } catch (error) {
//         console.log('Erro ao procurar dados do cliente:', error);
//       }
//     };
//     fetchClienteData();
//   }, [idServico]);

  return (
    <View style={{ flex: 1 }}>
      
      <Calendar
        onDayPress={(day) => {
          setSelectedDate(day.dateString);
          console.log('selected day', day);
        }}
        markedDates={{
          [selectedDate]: { selected: true, marked: true, selectedColor: 'blue' }
        }}
      />
      <Text>Serviço Selecionado: {nomeServico}</Text>
      <Text>Descrição do Serviço: {descricaoServico}</Text>
      <Text>Selected Date: {selectedDate}</Text>
    </View>
  );
};

export default CalendarScreen;
