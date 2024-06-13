import  React  from "react-native";
import { Text, View, TouchableOpacity, SafeAreaView, ScrollView, Image, ImageBackground } from 'react-native';
import { estilo } from './../estilo';

const CustomButton = ({ onPress, title, buttonStyle, textStyle }) => (
    <TouchableOpacity onPress={onPress} style={estilo.btnAgenda}>
      <Text style={estilo.textAgenda}>{title}</Text>
    </TouchableOpacity>
  );

export default function corteMaquina({ navigation }){
    return (
        <View style={estilo.topo}>
          <Image source={require('../../assets/logoLaranja.svg')} style={estilo.logo} />
          <Text style={estilo.textOla}>Olá, <Text style={{ color: 'orange' }}>'USUÁRIO'</Text><br />Seja bem-vindo(a)</Text>
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
    );
}