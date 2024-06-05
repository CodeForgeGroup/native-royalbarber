import React from 'react';
import { Text, View, TouchableOpacity, SafeAreaView, ScrollView, Image, ImageBackground, TextInput } from 'react-native';

const fundo = '../../assets/fundoPerfil.png'

export default function App() {
    return (
        <ScrollView contentContainerStyle={{ flex: 1 }}>
            <ImageBackground source={require(fundo)} style={{ flex: 1, alignItems: 'center' }}>

                <Image source={require('../../assets/fundoFoto.png')} />
                <Image source={require('../../assets/fotoPerfil.png')} style={{ position: 'absolute', top: 30 }} />

                <Text style={{ fontSize: 24, fontWeight: 700, alignSelf: 'flex-start', marginTop: 55, marginLeft: 30, color: 'white' }}>Meus dados</Text>

                <View style={{ alignSelf: 'flex-start', marginLeft: 24, marginTop: 25 }}>
                    <Text style={{ fontSize: 18, fontWeight: 600, color: 'white', marginLeft: 15, marginBottom: 3 }}>EMAIL</Text>
                    <TextInput
                        style={{
                            fontSize: 16,
                            fontWeight: 600,
                            color: 'white',
                            padding: 10,
                            paddingLeft: 25,
                            backgroundColor: '#1B1B1B',
                            alignSelf: 'flex-start',
                            width: 330,
                            height: 40,
                            borderRadius: 20,
                        }}
                        placeholder='example@email.com'
                    />
                </View>

                <View style={{ alignSelf: 'flex-start', marginLeft: 24, marginTop: 25 }}>
                    <Text style={{ fontSize: 18, fontWeight: 600, color: 'white', marginLeft: 15, marginBottom: 3 }}>SENHA</Text>
                    <TextInput
                    
                        style={{
                            fontSize: 16,
                            fontWeight: 600,
                            color: 'white',
                            padding: 10,
                            paddingLeft: 25,
                            backgroundColor: '#1B1B1B',
                            alignSelf: 'flex-start',
                            width: 330,
                            height: 40,
                            borderRadius: 20,
                        }}
                        placeholder='******'
                    />
                </View>

                <View style={{ alignSelf: 'flex-start', marginLeft: 24, marginTop: 25 }}>
                    <Text style={{ fontSize: 18, fontWeight: 600, color: 'white', marginLeft: 15, marginBottom: 3 }}>TELEFONE</Text>
                    <Text
                        style={{
                            fontSize: 16,
                            fontWeight: 600,
                            color: 'white',
                            padding: 10,
                            paddingLeft: 25,
                            backgroundColor: '#1B1B1B',
                            alignSelf: 'flex-start',
                            width: 330,
                            height: 40,
                            borderRadius: 20,
                        }}
                        placeholder='(11) 91336-4872'
                    >Email</Text>
                </View>


            </ImageBackground>
        </ScrollView>

    );
}