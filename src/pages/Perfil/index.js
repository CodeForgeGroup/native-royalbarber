import React, {useState} from 'react';
import { Text, View, TouchableOpacity, SafeAreaView, ScrollView, Image, ImageBackground, TextInput, Linking, Alert, Platform, span } from 'react-native';
import { estilo } from '../estilo'
const fundo = '../../fotos/fundoPerfil.png'

const CustomButton = ({ onPress, title, buttonStyle, textStyle }) => (
    <TouchableOpacity onPress={onPress} style={[estilo.botao, buttonStyle]}>
        <Text style={[estilo.textoBotao, textStyle]}>{title}</Text>
    </TouchableOpacity>
);

export default function App() {

    const [isFocused, setIsFocused] = useState(false);

    const [isEditable, setIsEditable] = useState(false);
        
    const handleToggleEdit = () => {
        setIsEditable(!isEditable);
    };


    return (
        <ScrollView contentContainerStyle={{ flex: 1, backgroundColor: '#343434', borderWidth: 0 }}>

            <ImageBackground source={require(fundo)} style={{ alignItems: 'center', height: 'auto', borderWidth: 0 }}>

                <Image source={require('../../fotos/fundoFoto.png')} />
                <Image source={require('../../fotos/fotoPerfil.png')} style={{ position: 'absolute', top: 30 }} />

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
                            backgroundColor: isEditable ? '#FF6D24' : '#1B1B1B',
                            alignSelf: 'flex-start',
                            width: 330,
                            height: 40,
                            borderRadius: 20,
                        }}
                        placeholder='example@email.com'
                        editable={isEditable}
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
                            backgroundColor: isEditable ? '#FF6D24' : '#1B1B1B',
                            alignSelf: 'flex-start',
                            width: 330,
                            height: 40,
                            borderRadius: 20,
                        }}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        placeholder='***********'
                        editable={isEditable}
                    />
                </View>

                <View style={{ alignSelf: 'flex-start', marginLeft: 24, marginTop: 25 }}>
                    <Text style={{ fontSize: 18, fontWeight: 600, color: 'white', marginLeft: 15, marginBottom: 3 }}>TELEFONE</Text>
                    <TextInput
                        style={{
                            fontSize: 16,
                            fontWeight: 600,
                            color: 'white',
                            padding: 10,
                            paddingLeft: 25,
                            backgroundColor: isEditable ? '#FF6D24' : '#1B1B1B',
                            alignSelf: 'flex-start',
                            width: 330,
                            height: 40,
                            borderRadius: 20,
                        }}
                        placeholder='(11) 91336-4872'
                        editable={isEditable}
                    />
                </View>

                <View style={{ alignSelf: 'flex-start', marginLeft: 24, marginTop: 25 }}>
                    <Text style={{ fontSize: 18, fontWeight: 600, color: 'white', marginLeft: 15, marginBottom: 3 }}>ENDEREÇO</Text>
                    <TextInput
                        style={{
                            fontSize: 16,
                            fontWeight: 600,
                            color: 'white',
                            padding: 10,
                            paddingLeft: 25,
                            backgroundColor: isEditable ? '#FF6D24' : '#1B1B1B',
                            alignSelf: 'flex-start',
                            width: 330,
                            height: 40,
                            borderRadius: 20,
                            
                        }}
                        placeholder='Rua alamedas, 702'
                        editable={isEditable}
                    />
                </View>

                <CustomButton
                    onPress={handleToggleEdit}
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