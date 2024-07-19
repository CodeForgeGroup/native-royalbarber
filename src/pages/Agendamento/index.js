 
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, SafeAreaView, Image, ImageBackground, Dimensions } from 'react-native';
import Modal from "react-native-modal";
import { estilo } from './../estilo';
import Carousel from 'react-native-snap-carousel';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons, MaterialIcons } from '@expo/vector-icons'
 
const CustomButton = ({ onPress, title, buttonStyle, textStyle }) => (
  <TouchableOpacity onPress={onPress} style={[estilo.botao, buttonStyle]}>
    <Text style={[estilo.textoBotao, textStyle]}>{title}</Text>
  </TouchableOpacity>
);
 
const fnd2 = '../../fotos/fnd2horario.jpg';
 
const { width: screenWidth } = Dimensions.get('window');
 
 
 
 
 
 
export default function Agendamento({ navigation, route }) {
 
  const [errorModalVisible, setErrorModalVisible] = useState(false);
  const [okModalVisible, setOkModalVisible] = useState(false);
 
  const { idServico, nomeServico, descricaoServico, idCliente, dataSelecionada, duracaoServico } = route.params || {};
 
  const [nomeCliente, setNomeCliente] = useState("");
  const [servicos, setServicos] = useState([]);
  const [funcionarios, setFuncionarios] = useState([]);
  const [horariosDisponiveis, setHorariosDisponiveis] = useState([]);
  const [horarioSelecionado, setHorarioSelecionado] = useState(null);
  const [funcionarioSelecionado, funcionarioSelecionadoId] = useState(null);
 
 
  useEffect(() => {
    const fetchFuncionarios = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        const resposta = await axios.get('http://127.0.0.1:8000/funcionarios/showBarbeiros', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setFuncionarios(resposta.data);
      } catch (error) {
        console.log('Erro ao buscar dados dos funcionários:', error);
      }
    };
    fetchFuncionarios();
  }, []);
 
  const fetchHorarios = async (funcionarioId) => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const resposta = await axios.get('http://127.0.0.1:8000/horarios/disponiveis', {
        headers: {
          Authorization: `Bearer ${token}`
        },
        params: {
          funcionarioId: funcionarioId,
          dataHorarios: dataSelecionada,
          clienteId: idCliente,
          duracaoEmMinutos: duracaoServico // Substitua pelo valor correto
        }
      });
      funcionarioSelecionadoId(funcionarioId);
      setHorariosDisponiveis(resposta.data);
    } catch (error) {
      console.log('Erro ao buscar horários disponíveis:', error);
    }
  };
 
  const handleFinalizar = async () => {
    const dadosAgendamento = {
      funcionario_id: funcionarioSelecionado,
      cliente_id: idCliente,
      servico_id: idServico,
      horario_id: horarioSelecionado.horario_id,
      dataAgendamento: dataSelecionada,
      horarioSelecionado: horarioSelecionado.horarios,
    };
 
    try {
      const resultado = await agendarServico(dadosAgendamento);
     
      console.log('Resultado do agendamento:', resultado);
      setOkModalVisible(true)
    } catch (error) {
      console.error('Erro ao finalizar agendamento:', error);
      setErrorModalVisible(true)
    }
  };
 
 
  const agendarServico = async (dadosAgendamento) => {
  try {
    const token = await AsyncStorage.getItem('userToken');
    console.log(token);
    const resposta = await axios.post('http://127.0.0.1:8000/agendamentos/mobile', dadosAgendamento, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    console.log('Agendamento realizado com sucesso:', resposta.data);
    return resposta.data;
  } catch (error) {
    console.log('Erro ao realizar agendamento:', error.response.data);
    throw error;
  }
};
 
  const _renderItem = ({ item }) => {
    const fotoURL = item.fotoFuncionario === "SEM IMAGEM"
      ? 'http://codegroupdev.com.br/royalbarber/royalbarber/public/images/royalBarberFunc.png'
      : `http://codegroupdev.com.br/royalbarber/royalbarber/storage/app/public/${item.fotoFuncionario}`;
 
    return (
      <TouchableOpacity>
        <View style={{ marginTop: 60, marginBottom: 35 }}>
          <Image source={{ uri: fotoURL }} style={{ width: '100%', height: 300, borderRadius:20 }} />
          <View style={{ backgroundColor: 'rgba(51, 51, 51, 0.8)', height: 73, alignItems: 'center', justifyContent: 'center', position: 'absolute', top: 228, width: '100%', borderBottomStartRadius: 15, borderBottomEndRadius: 15 }}>
            <Text style={{ color: 'white', fontSize: 20, fontWeight: '600' }}>{item.nomeFuncionario}</Text>
            <Text style={{ color: '#ff6d24', fontSize: 16 }}>{item.especialidadeFuncionario}</Text>
          </View>
        </View>
        <CustomButton
          title="Ver horários disponíveis"
          onPress={() => fetchHorarios(item.id)}
          buttonStyle={{ backgroundColor: '#ff6d24', marginTop: 4, borderRadius:60, alignItems:'center', height:40 }}
          textStyle={{ color: 'white', alignItems: 'center', fontWeight:'bold', marginTop:7, fontSize:17}}
        />
      </TouchableOpacity>
    );
  };
 
  const handleFuncionarioSelect = (funcionarioSelecionadoId);
 
  const renderHorarios = () => {
    return (
      <View style={styles.horariosContainer}>
        {horariosDisponiveis.map((item) => (
          <TouchableOpacity key={item.horario_id} onPress={() => handleHorarioSelect(item)}>
            <View style={[ styles.horarioContainer, horarioSelecionado === item && styles.horarioSelecionado ]}>
              <Text style={styles.horarioText}>{item.horarios}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    );
  };
 
  const handleHorarioSelect = (horario) => {
    console.log('Horário selecionado:', horario);
    setHorarioSelecionado(horario);
    console.log(handleFuncionarioSelect);
  };
 
 
  return (
 
   
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} style={{ backgroundColor: 'white' }}>
      <SafeAreaView style={{ flex: 1, backgroundColor: 'black' }}>
       
        <ImageBackground source={require(fnd2)} style={{ height: 600, alignItems: 'center', width: 400 }}>
          <Image source={require('../../fotos/tesoura.svg')} style={{ marginTop: 15 }} />
          <Text style={{ fontSize: 22, fontWeight: 'bold', color: 'white' }}>BARBEIROS</Text>
 
          <Carousel
            data={funcionarios}
            renderItem={_renderItem}
            sliderWidth={screenWidth}
            itemWidth={screenWidth * 0.63}
            layout={'default'}
            firstItem={1}
          />
 
         
        </ImageBackground>
 
        {horariosDisponiveis.length > 0 && renderHorarios()}
 
        {horarioSelecionado && (
  <View style={styles.buttonContainer}>
    <CustomButton
      title="Confirmar"
      onPress={handleFinalizar}
      buttonStyle={{
        backgroundColor: '#FF6D24',
        marginTop: 20,
        marginBottom: 40,
        borderRadius: 20,
        padding: 10,
        width: '80%',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      textStyle={{
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18,
      }}
    />
  </View>
)}
 
 
        <View style={{
          backgroundColor: 'black',
          borderTopEndRadius: 24,
          borderTopStartRadius: 24,
          height: '100%',
          position: 'relative',
          top: -21,
          alignItems: 'center',
          justifyContent: 'space-evenly'
        }}>
        </View>
 
        <Modal isVisible={okModalVisible} onBackButtonPress={() => setOkModalVisible(false)} >
 
          <View style={{ backgroundColor: '#fff', padding: 20, borderRadius: 10, alignItems: 'center', }}>
            <Ionicons name="checkmark-circle-outline" size={62} color="green" />
            <Text style={{ fontSize: 22, fontWeight: 700, marginBottom: 10, color: 'green' }}>Sucesso!</Text>
            <Text style={{ fontSize: 18, fontWeight: 500, marginBottom: 20, textAlign: 'center', color: '#1B1B1B', }}>Agendamento concluído, verifique sua agenda.</Text>
            <TouchableOpacity onPress={() => setOkModalVisible(false)}>
              <Text style={{ fontSize: 18, color: '#3498db' }}>OK</Text>
            </TouchableOpacity>
          </View>
        </Modal>
 
        <Modal isVisible={errorModalVisible} onBackButtonPress={() => setErrorModalVisible(false)} >
 
          <View style={{ backgroundColor: '#fff', padding: 20, borderRadius: 10, alignItems: 'center', }}>
          <MaterialIcons name="error-outline" size={62} color="red" />
            <Text style={{ fontSize: 22, fontWeight: 'bold', marginBottom: 10, color: 'red' }}>Erro!</Text>
            <Text style={{ fontSize: 18, fontWeight: 500, marginBottom: 20, textAlign: 'center', color: '#333', }}>Houve um erro inesperado, entre em contato com o suporte.</Text>
            <TouchableOpacity onPress={() => setOkModalVisible(false)}>
              <Text style={{ fontSize: 18, color: '#3498db' }}>OK</Text>
            </TouchableOpacity>
          </View>
        </Modal>
 
      </SafeAreaView>
    </ScrollView>
  );
}
 
const styles = StyleSheet.create({
  horariosContainer: {
    flexDirection: 'row', // Ajuste a direção do layout para horizontal
    flexWrap: 'wrap', // Permite que os itens se movam para a próxima linha se não houver espaço suficiente
    justifyContent: 'center', // Centraliza os itens horizontalmente
    marginVertical: 20, // Adicione uma margem vertical para separação dos elementos
  },
  horarioContainer: {
    backgroundColor: '#1B1B1B',
    padding: 10,
    margin: 5, // Ajuste de margem para espaçamento entre os horários
    borderRadius: 10,
    alignItems: 'center',
  },
  horarioText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonContainer: {
    alignItems: 'center', // Centraliza horizontalmente
    justifyContent: 'center', // Centraliza verticalmente
  },
 
  horarioSelecionado: {
    borderRadius: 10,
    backgroundColor: '#ff6d24'
  },
});
 