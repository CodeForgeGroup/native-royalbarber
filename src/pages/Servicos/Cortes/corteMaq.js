import React from "react-native";
import { Text, View, TouchableOpacity, SafeAreaView, ScrollView, Image, ImageBackground } from 'react-native';
import { estilo } from '../../estilo';

const f1 = '../../../fotos/fundoBanner.png';
const f2 = '../../../fotos/fundoCortes.jpeg';

export default function corteMaquina({ navigation }) {
  return (
    <SafeAreaView style={{}}>
      <ImageBackground source={require(f1)} style={{ width: '100%', height: 600, justifyContent: 'center', alignItems: 'center', zIndex: 2 }} >
        <View style={{ width: 180, height: 180, borderRadius: '100%', backgroundColor: 'black', justifyContent: 'center', alignItems: 'center', overflow: 'hidden', }}>
          <Image source={require('../../../fotos/cortemaq.jpeg')} style={{ width: '100%', height: '100%', zIndex: 2 }} />
        </View>

        <Text style={{ marginTop: 35, fontSize: 24, color: '#FF6D24', fontWeight: 'bold', borderBottomWidth: 2, borderBottomColor: '#FF6D24' }}>Corte tradicional</Text>
        <Text style={{ textAlign: 'left', borderLeftWidth: 2, color: 'white', fontSize: 18, fontWeight: '500', width: '80%', padding: 10, borderLeftColor: '#FF6D24', marginTop: 15, marginBottom: 30 }} >Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat voluptates facere aspernatur aperiam enim, dolores doloremque quas necessitatibus</Text>
        <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#FF6D24', padding: 13, borderWidth: 1, borderColor: '#FF6D24', borderRadius: 50 }} >R$ 84,90</Text>
      
      </ImageBackground>

    </SafeAreaView>
  );
}