import React, { useState, useRef, useEffect } from 'react';
import { Text, View, TouchableOpacity, SafeAreaView, ScrollView, Image, ImageBackground, Dimensions,  } from 'react-native';
import { estilo } from './../estilo';
import Carousel from 'react-native-snap-carousel';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';


const banner = '../../assets/fundoBanner.png'

const servico = '../../assets/fundoServico.png'

const agendamentos = '../../assets/fundoAgendamento.png'

const CustomButton = ({ onPress, title, buttonStyle, textStyle }) => (
  <TouchableOpacity onPress={onPress} style={estilo.btnAgenda}>
    <Text style={estilo.textAgenda}>{title}</Text>
  </TouchableOpacity>
);

const CustomButton2 = ({ onPress, title, buttonStyle, textStyle }) => (
  <TouchableOpacity onPress={onPress} style={[estilo.botao, buttonStyle]}>
    <Text style={[estilo.textoBotao, textStyle]}>{title}</Text>
  </TouchableOpacity>
);

const { width: screenWidth } = Dimensions.get('window');

export default function Home({ navigation, route }) {

  const [entries,  setEntries] = useState([
    { laranjinha: 'Item 1' },
    { laranjinha: 'Item 2' },
    { laranjinha: 'Item 3' },
  ]);


  const carouselRef = useRef(null);

  const _renderItem = ({item, index}) => {
    return (
      <View style={{ justifyContent: 'center', alignItems: 'center', cursor: 'pointer', backgroundColor: 'orange', width: '45%', height: 120 }}>
        <Text style={{color: 'white'}}>{ item.laranjinha }</Text>
      </View>
    );
  }

  const {idCliente} = route.params || {};

  console.log("Cód Cliente: ", idCliente);
  console.log(route.params);

  const [nomeCliente, setNomeCliente] = useState("");
  const [sobrenomeCliente, setSobrenomeCliente] = useState("");
  const [emailCliente, setEmailCliente] = useState("");

  useEffect(() => {
    const fetchClienteData = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        const resposta = await axios.get(`http://127.0.0.1:8000/cliente/${idCliente}`,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setNomeCliente(resposta.data.nomeCliente);
        setEmailCliente(resposta.data.emailCliente);
        setSobrenomeCliente(resposta.data.sobrenomeCliente);
        
      } catch (error) {
        console.log('Erro ao procurar dados do cliente.');
      }
    };
    if(idCliente){
      fetchClienteData();
    }
  }, [idCliente]);



  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} style={{ backgroundColor: 'white', }}>
      <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>

        {/* TOPO */}
        <View style={estilo.topo}>
          <Image source={require('../../assets/logoLaranja.svg')} style={estilo.logo} />
          <Text style={estilo.textOla}>Olá, <Text style={{ color: 'orange' }}>{nomeCliente} </Text><br />Seja bem-vindo(a)</Text>
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

        {/* banner */}

        <View style={{}}>
          <ImageBackground source={require(banner)} style={{ width: '100%', flex: 1, height: '100%' }}>
            <Text style={{ fontSize: 44, color: 'white', marginLeft: 20, marginTop: 50 }}>Royal barber,<br />a <Text style={{ color: '#FF6D24' }}>realeza</Text>.</Text>
            <Text style={{ fontSize: 27, color: 'white', marginLeft: 20, marginTop: 20 }}>Dê um toque<br />gourmet ao seu<br />visual, <Text style={{ color: '#FD7E14' }}>seja a realeza</Text>.</Text>
            <CustomButton2 title='NOSSOS SERVIÇOS' onPress={() => navigation.navigate('Serviços')}
              buttonStyle={{
                width: 150,
                height: 40,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#FF6D24',
                borderRadius: 20,
                alignSelf: 'flex-end',
                marginTop: 90,
                marginRight: 30,
                marginBottom: 50
              }}
              textStyle={{
                color: 'white',
                fontWeight: 600,
              }}
            />
          </ImageBackground>
        </View>

        {/* Serviços */}
        <View style={{ height: 634, position: 'relative', top: -20, borderRadius: 24, zIndex: 2 }}>
          <ImageBackground source={require(servico)} style={{ width: '100%', alignItems: 'center', justifyContent: 'center' }}> {/* Serviços e Produtos */}
            <Text style={{ marginTop: 35, fontSize: 26, fontWeight: 700, color: 'white' }}>SERVIÇOS & PRODUTOS</Text>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 34, width: '100%' }}>
              <Text style={{ fontSize: 23, fontWeight: 600, color: 'white', marginTop: '55' }}>Cortes Masculinos</Text>
              <View style={{ flexDirection: 'row', gap: 15, marginTop: 25, width: '100%'}}>  {/* Main div dos cortes*/}
                {/* Cortes */}
              
                  <Carousel
                    ref={carouselRef}
                    data={entries}
                    renderItem={_renderItem}
                    sliderWidth={screenWidth}
                    itemWidth={screenWidth * 0.75}
                    layout={'default'}
                  />

                {/* FIM CORTES */}
              </View> {/* FIM MAIN DIV CORTES */}

              <CustomButton2 title='VER MAIS' onPress={() => navigation.navigate('Serviços')}
                buttonStyle={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 100,
                  height: 40,
                  backgroundColor: '#ff6d24',
                  borderRadius: 20,
                  marginTop: 30
                }}
                textStyle={{
                  color: 'white',
                  fontSize: 13,
                  fontWeight: 600,
                }}
              />

              <Text style={{ fontSize: 23, fontWeight: 600, color: 'white', marginTop: 20 }}>Produtos Para Cabelo</Text>

              <View style={{ flexDirection: 'row', marginTop: 25, gap: 25, cursor: 'pointer', alignItems: 'center', justifyContent: 'center' }}> {/* Produtos  */}


                <View>
                  <Image source={require('../../assets/produto1.png')} style={{ borderTopLeftRadius: 10, borderTopRightRadius: 10 }} />
                  <View style={{ backgroundColor: '#ff6d24', height: 85, alignItems: 'center', justifyContent: 'center', gap: 5, borderBottomLeftRadius: 10, borderBottomRightRadius: 10 }}>
                    <Text style={{ color: 'white', fontSize: 16, fontWeight: 600 }}>Gel Capilar</Text>
                    <Text style={{ color: 'white', fontSize: 13, fontWeight: 600 }}>R$15,00</Text>
                  </View>
                </View>

                <View>
                  <Image source={require('../../assets/produto1.png')} style={{ borderTopLeftRadius: 10, borderTopRightRadius: 10 }} />
                  <View style={{ backgroundColor: '#ff6d24', alignItems: 'center', justifyContent: 'center', height: 85, gap: 5, borderBottomLeftRadius: 10, borderBottomRightRadius: 10 }}>
                    <Text style={{ color: 'white', fontSize: 16, fontWeight: 600 }}>Gel Capilar</Text>
                    <Text style={{ color: 'white', fontSize: 13, fontWeight: 600 }}>R$15,00</Text>
                  </View>
                </View>


              </View>

            </View>
          </ImageBackground>
        </View>

        {/* Meus Agendamentos */}


        <View style={{ position: 'relative', top: -45, zIndex: 1 }}>
          <ImageBackground source={require(agendamentos)} style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ marginTop: 51, fontSize: 26, fontWeight: 600, color: 'white' }}>MEUS AGENDAMENTOS</Text>
            <span style={{ backgroundColor: 'white', width: 191, height: 2, marginTop: 7 }}></span>

            <View style={{ marginTop: 23, flexDirection: 'row', gap: 22 }}>

              <View style={{ width: 148, backgroundColor: '#1B1B1B', alignItems: 'center', borderRadius: 10 }}>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '80%', marginBottom: 10, marginTop: 20 }}>
                  <Text style={{ color: '#ff6d24', fontSize: 16, fontWeight: 600 }}>Horário</Text>
                  <Text style={{ color: '#fff', fontSize: 16, fontWeight: 600 }}>16:00</Text>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '80%', marginBottom: 10 }}>
                  <Text style={{ color: '#ff6d24', fontSize: 16, fontWeight: 600 }}>Serviço</Text>
                  <Text style={{ color: '#fff', fontSize: 16, fontWeight: 600 }}>Cabelo</Text>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '80%', marginBottom: 10 }}>
                  <Text style={{ color: '#ff6d24', fontSize: 16, fontWeight: 600 }}>Data</Text>
                  <Text style={{ color: '#fff', fontSize: 16, fontWeight: 600 }}>16/02</Text>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '80%' }}>
                  <Text style={{ color: '#ff6d24', fontSize: 16, fontWeight: 600 }}>Func.</Text>
                  <Text style={{ color: '#fff', fontSize: 16, fontWeight: 600 }}>Alexandre</Text>
                </View>

                <CustomButton2 title="CANCELAR"
                  buttonStyle={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 80,
                    height: 30,
                    backgroundColor: '#ff6d24',
                    borderRadius: 15,
                    marginTop: 20,
                    marginBottom: 12
                  }}
                  textStyle={{
                    fontSize: 13,
                    fontWeight: 600,
                    color: 'white'
                  }}
                />

              </View>

              <View style={{ width: 148, backgroundColor: '#1B1B1B', alignItems: 'center', borderRadius: 10 }}>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '80%', marginBottom: 10, marginTop: 20 }}>
                  <Text style={{ color: '#ff6d24', fontSize: 16, fontWeight: 600 }}>Horário</Text>
                  <Text style={{ color: '#fff', fontSize: 16, fontWeight: 600 }}>16:00</Text>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '80%', marginBottom: 10 }}>
                  <Text style={{ color: '#ff6d24', fontSize: 16, fontWeight: 600 }}>Serviço</Text>
                  <Text style={{ color: '#fff', fontSize: 16, fontWeight: 600 }}>Cabelo</Text>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '80%', marginBottom: 10 }}>
                  <Text style={{ color: '#ff6d24', fontSize: 16, fontWeight: 600 }}>Data</Text>
                  <Text style={{ color: '#fff', fontSize: 16, fontWeight: 600 }}>16/02</Text>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '80%' }}>
                  <Text style={{ color: '#ff6d24', fontSize: 16, fontWeight: 600 }}>Func.</Text>
                  <Text style={{ color: '#fff', fontSize: 16, fontWeight: 600 }}>Alexandre</Text>
                </View>

                <CustomButton2 title="CANCELAR"
                  buttonStyle={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 80,
                    height: 30,
                    backgroundColor: '#ff6d24',
                    borderRadius: 15,
                    marginTop: 20,
                    marginBottom: 12
                  }}
                  textStyle={{
                    fontSize: 13,
                    fontWeight: 600,
                    color: 'white'
                  }}
                />

              </View>
            </View>

            {/* FIM AGENDAMENTOS */}


            {/* Funcionários */}

            <View style={{flexDirection: 'row', alignItems: 'center', gap: 23}}>
              <Image source={require('../../assets/ArrowEsq.svg')} style={{ cursor: 'pointer' }}/>
              <View style={{ borderRadius: 15, backgroundColor: '#FF6D24', justifyContent: 'center', alignItems: 'center', marginTop: 55 }}>
                <Text style={{ paddingVertical: 7, fontSize: 22, fontWeight: 500, color: 'white' }}>Alexandre</Text>
                <Image source={require('../../assets/funcionario1.png')} style={{}} />
              </View>
              <Image source={require('../../assets/ArrowDir.svg')} style={{ cursor: 'pointer' }}/>   
            </View>


          </ImageBackground>
        </View>

        
      </SafeAreaView>
    </ScrollView>
  );
}





