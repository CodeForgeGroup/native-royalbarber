import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, SafeAreaView, Image, ImageBackground, Dimensions, FlatList } from 'react-native';
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

export default function Agendamento({ navigation, route }) {
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
    } catch (error) {
      console.error('Erro ao finalizar agendamento:', error);
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
          buttonStyle={{ backgroundColor: 'transparent', marginTop: 4, borderRadius:60, borderWidth:1, borderColor:'black', alignItems:'center', height:40 }}
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
            <View style={styles.horarioContainer}>
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

        <ImageBackground source={require(gradiente)} style={{ height: 600, alignItems: 'center', width: 400 }}>
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
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#ff6d24',
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
  }
});
