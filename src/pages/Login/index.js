import React from 'react';
import { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, ScrollView, Image, TextInput } from 'react-native';
import { Button, ImageBackground } from 'react-native-web';
import { estilo } from '../estilo';
import Modal from "react-native-modal";
import axios from "axios"; //Requisição HTTP para a API
import AsyncStorage from "@react-native-async-storage/async-storage"

const ImgBack = '../../fotos/fundo.png';

const CustomButton = ({ onPress, title }) => (
  <TouchableOpacity onPress={onPress} style={estilo.button}>
    <Text style={estilo.text}>{title}</Text>
  </TouchableOpacity>
);

const CustomButton2 = ({ onPress, title }) => (
  <TouchableOpacity onPress={onPress} style={estilo.button2}>
    <Text style={estilo.text1}>{title}</Text>
  </TouchableOpacity>
);


export default function Login({ navigation }) {

  const storeToken = async (token) => {
    try {
        await AsyncStorage.setItem('access_token', token);
    } catch (error) {
        console.error('Erro ao armazenar o token', error);
    }
};

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const [errorModalVisible, setErrorModalVisible] = useState(false);

  const handleLogin = async () => {
    //Verifica se o email ou a senha estão preenchidos  
    if (!email.trim() || !senha.trim()) {
      setErrorModalVisible(true);
      return;
    }


    try {
      
      console.log(senha);
      
      const resposta = await axios.post(`http://127.0.0.1:8000/loginApi?email=${email}&senha=${senha}`);
   
      if (resposta.data) {
        const cliente = resposta.data;
        if (cliente) {
          console.log(cliente);
          console.log(cliente.usuario.dados_cliente.id)
          console.log(cliente.usuario.dados_cliente.nomeCliente)
          console.log(cliente.access_token)

          const idCliente = cliente.usuario.dados_cliente.id;
          const token = cliente.access_token;

          //Armazenar o token na memória do APP
          await AsyncStorage.setItem('userToken', token);

          storeToken(resposta.data.access_token)

          navigation.navigate('Inicio', { idCliente })
        }
      }
    } catch (error) {
      console.error("Erro ao verificar o email e a senha", error.response ? error.response.data : error.message);
      setErrorModalVisible("Erro", "Erro ao verificar email e senha")
    }

  }


  return (
    <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'white' }}>
      <ImageBackground source={require(ImgBack)} style={{ flex: 1, alignItems: 'center', justifyContent: 'center', width: '100%', }}>
        <Image
          source={require('../../fotos/logo-royalbarberBRANCO.png')}
          style={{ width: 250, height: 140, marginBottom: 0, position: 'relative' }}
        />
        <Text style={{ fontSize: 50, fontWeight: 'bold', color: 'white', marginTop: 0, marginBottom: 10, }}>LOGIN</Text>
        <TextInput
          style={{ fontWeight: 'bold', color: 'white', height: 40, width: 300, borderColor: 'transparent', borderTopColor: 'transparent', borderWidth: 1, marginTop: 20, paddingHorizontal: 10, borderBlockColor: '#ff6d24' }}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          secureTextEntry={true}
          style={{ fontWeight: 'bold', color: 'white', height: 40, width: 300, borderColor: 'transparent', borderTopColor: 'transparent', borderWidth: 1, marginTop: 20, paddingHorizontal: 10, borderBlockColor: '#ff6d24', }}
          placeholder="Senha"
          value={senha}
          onChangeText={setSenha}
        />

        <CustomButton
          title="ENTRAR"
          onPress={handleLogin}
        />

        <CustomButton2
          title="Esqueci a senha"
          onPress={() => navigation.navigate('#')}
        />

        <Modal isVisible={errorModalVisible} onBackButtonPress={() => setErrorModalVisible(false)} >

          <View style={{ backgroundColor: '#333', padding: 20, borderRadius: 10, alignItems: 'center', }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10, color: 'red' }}>Erro</Text>
            <Text style={{ fontSize: 16, marginBottom: 20, textAlign: 'center', color: 'white', }}>Email ou senha incorretos. Tente novamente</Text>
            <TouchableOpacity onPress={() => setErrorModalVisible(false)}>
              <Text style={{ fontSize: 18, color: '#3498db' }} >OK</Text>
            </TouchableOpacity>
          </View>

        </Modal>
      </ImageBackground>
    </SafeAreaView>

  );
}


