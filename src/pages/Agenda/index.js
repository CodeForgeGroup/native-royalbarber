import React, {useState, useEffect} from 'react';
import { Text, View, TouchableOpacity, SafeAreaView, ScrollView, Image } from 'react-native';
import { ImageBackground } from 'react-native-web';
import { estilo } from '../estilo'
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const fundo = '../../fotos/fundoAgenda.png';
const img = '../../fotos/fundoCompro.png';

const CustomButton = ({ onPress, title, buttonStyle, textStyle }) => (
    <TouchableOpacity onPress={onPress} style={[estilo.botao, buttonStyle]}>
        <Text style={[estilo.textoBotao, textStyle]}>{title}</Text>
    </TouchableOpacity>
);

export default function Perfil({navigation, route}) {
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
        <ScrollView>
            <SafeAreaView style={{ flex: 1 }}>
                <ImageBackground source={require(fundo)} style={{ flex: 1, alignItems: 'center' }}>

                    <View style={{ alignSelf: 'flex-start', borderBottomRightRadius: 20, borderTopRightRadius: 20, backgroundColor: '#FD7E14', width: 255, height: 48, marginTop: 30, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ fontSize: 20, fontWeight: 600, color: 'white' }}> MEUS COMPROMISSOS </Text>
                    </View>


                    <ImageBackground source={require(img)} style={{ alignItems: 'center', justifyContent: 'center', gap: 15, width: 317, height: 200, marginTop: 55 }}>
                        <View style={{gap: 5}}>
                            <View style={{ justifyContent: 'space-between', width: 162, height: 26, flexDirection: 'row' }}>
                                <Text style={{ color: '#FD7E14', fontSize: 18, fontWeight: 600 }}>Horário</Text>
                                <Text style={{ color: 'white', fontSize: 16, fontWeight: 600 }}>16:00</Text>
                            </View>
                            <View style={{ justifyContent: 'space-between', width: 162, height: 26, flexDirection: 'row' }}>
                                <Text style={{ color: '#FD7E14', fontSize: 18, fontWeight: 600 }}>Serviço</Text>
                                <Text style={{ color: 'white', fontSize: 16, fontWeight: 600 }}>Cabelo</Text>
                            </View>
                            <View style={{ justifyContent: 'space-between', width: 162, height: 26, flexDirection: 'row' }}>
                                <Text style={{ color: '#FD7E14', fontSize: 18, fontWeight: 600 }}>Data</Text>
                                <Text style={{ color: 'white', fontSize: 16, fontWeight: 600 }}>14/02</Text>
                            </View>
                            <View style={{ justifyContent: 'space-between', width: 162, height: 26, flexDirection: 'row' }}>
                                <Text style={{ color: '#FD7E14', fontSize: 18, fontWeight: 600 }}>Func.</Text>
                                <Text style={{ color: 'white', fontSize: 16, fontWeight: 600 }}>Alexandre</Text>
                            </View>
                        </View>

                        <CustomButton
                            title="CANCELAR"
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
