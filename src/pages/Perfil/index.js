import React from 'react';
import { Text, View, TouchableOpacity, SafeAreaView, ScrollView, Image, ImageBackground, TextInput, Linking, Alert, Platform, span } from 'react-native';
import { estilo } from '../estilo'
const fundo = '../../assets/fundoPerfil.png'

const CustomButton = ({ onPress, title, buttonStyle, textStyle }) => (
    <TouchableOpacity onPress={onPress} style={[estilo.botao, buttonStyle]}>
        <Text style={[estilo.textoBotao, textStyle]}>{title}</Text>
    </TouchableOpacity>
);

export default function App() {

    const handlePress = async () => {
        const url = 'https://www.facebook.com/';

        try {
            const supported = await Linking.canOpenURL(url);
            if (supported) {
                await Linking.openURL(url);
            } else {
                Alert.alert(`Não foi possível abrir o URL: ${url}`);
            }
        } catch (err) {
            console.error('Ocorreu um erro ao tentar abrir o URL', err);
        }
    };

    return (
        <ScrollView contentContainerStyle={{ flex: 1, backgroundColor: '#343434', borderWidth: 0 }}>

            <ImageBackground source={require(fundo)} style={{ alignItems: 'center', height: 'auto', borderWidth: 0 }}>

                <Image source={require('../../assets/fundoFoto.png')} />
                <Image source={require('../../assets/fotoPerfil.png')} style={{ position: 'absolute', top: 30 }} />

                <Text style={{ fontSize: 24, fontWeight: 700, alignSelf: 'flex-start', marginTop: 55, marginLeft: 30, color: 'white' }}>Meus dados</Text>

                <View style={{ alignSelf: 'flex-start', marginLeft: 24, marginTop: 25 }}>
                    <Text style={{ fontSize: 18, fontWeight: 600, color: 'white', marginLeft: 15, marginBottom: 3 }}>EMAIL</Text>
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

                    >example@email.com</Text>
                </View>

                <View style={{ alignSelf: 'flex-start', marginLeft: 24, marginTop: 25 }}>
                    <Text style={{ fontSize: 18, fontWeight: 600, color: 'white', marginLeft: 15, marginBottom: 3 }}>SENHA</Text>
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

                    >***********</Text>
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
                    >(11) 91336-4872</Text>
                </View>

                <CustomButton
                    onPress={handlePress}
                    title="ALTERAR DADOS"
                    buttonStyle={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: '#FF6D24',
                        width: 155,
                        height: 40,
                        borderRadius: 20,
                        marginTop: 55,
                        marginBottom: 55
                    }}
                    textStyle={{
                        fontSize: 16,
                        fontWeight: 600,
                        color: 'white'
                    }}
                />
            </ImageBackground>

            <View style={{ alignItems: 'center', backgroundColor: '#343434', borderWidth: 0 }}>
                <Text style={{ marginTop: 51, fontSize: 26, fontWeight: 600, color: 'white' }}>MEUS AGENDAMENTOS</Text>
                <span style={{ backgroundColor: '#FF6D24', width: 220, height: 2, marginTop: 7, marginBottom: 25 }}></span>

                <View style={{ flexDirection: 'row', gap: 15 }}>

                    <View style={{ alignItems: 'center', backgroundColor: '#1B1B1B', borderRadius: 10, width: 148, height: 182, justifyContent: 'space-evenly' }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '80%' }}>
                            <Text style={{ fontSize: 14, fontWeight: 600, color: '#FF6D24' }}>Horário</Text>
                            <Text style={{ fontSize: 14, fontWeight: 600, color: 'white' }}>16:00</Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '80%' }}>
                            <Text style={{ fontSize: 14, fontWeight: 600, color: '#FF6D24' }}>Serviço</Text>
                            <Text style={{ fontSize: 14, fontWeight: 600, color: 'white' }}>Cabelo</Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '80%' }}>
                            <Text style={{ fontSize: 14, fontWeight: 600, color: '#FF6D24' }}>Data</Text>
                            <Text style={{ fontSize: 14, fontWeight: 600, color: 'white' }}>14/02</Text>
                        </View>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '80%' }}>
                            <Text style={{ fontSize: 14, fontWeight: 600, color: '#FF6D24' }}>Func.</Text>
                            <Text style={{ fontSize: 14, fontWeight: 600, color: 'white' }}>Alexandre</Text>
                        </View>

                        <CustomButton
                            title="CANCELAR"
                            buttonStyle={{
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: '75%',
                                heigth: 50,
                                backgroundColor: '#FF6D24',
                                borderRadius: 20
                            }}
                            textStyle={{
                                fontSize: 14,
                                fontWeight: 'bold',
                                color: 'white'
                            }}
                        />
                    </View>

                    <View style={{ alignItems: 'center', backgroundColor: '#1B1B1B', borderRadius: 10, width: 148, height: 182, justifyContent: 'space-evenly', marginBottom: 60 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '80%' }}>
                            <Text style={{ fontSize: 14, fontWeight: 600, color: '#FF6D24' }}>Horário</Text>
                            <Text style={{ fontSize: 14, fontWeight: 600, color: 'white' }}>18:00</Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '80%' }}>
                            <Text style={{ fontSize: 14, fontWeight: 600, color: '#FF6D24' }}>Serviço</Text>
                            <Text style={{ fontSize: 14, fontWeight: 600, color: 'white' }}>Barba</Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '80%' }}>
                            <Text style={{ fontSize: 14, fontWeight: 600, color: '#FF6D24' }}>Data</Text>
                            <Text style={{ fontSize: 14, fontWeight: 600, color: 'white' }}>14/02</Text>
                        </View>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '80%' }}>
                            <Text style={{ fontSize: 14, fontWeight: 600, color: '#FF6D24' }}>Func.</Text>
                            <Text style={{ fontSize: 14, fontWeight: 600, color: 'white' }}>Ronaldo</Text>
                        </View>
                        <CustomButton
                            title="CANCELAR"
                            buttonStyle={{
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: '75%',
                                heigth: 50,
                                backgroundColor: '#FF6D24',
                                borderRadius: 20
                            }}
                            textStyle={{
                                fontSize: 14,
                                fontWeight: 'bold',
                                color: 'white'
                            }}
                        />
                    </View>
                </View>

            </View>

        </ScrollView>

    );
}