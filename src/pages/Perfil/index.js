import React, { useState, useEffect } from 'react';
import { Text, View, TextInput, ScrollView, ImageBackground, Image, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const PerfilClienteScreen = ({ route, navigation }) => {
    const [nome, setNome] = useState('');
    const [sobrenome, setSobrenome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [telefone, setTelefone] = useState('');
    const [endereco, setEndereco] = useState('');
    const [selectedImage, setSelectedImage] = useState(null);

    useEffect(() => {
        const fetchCliente = async () => {
            try {
                const token = await AsyncStorage.getItem('userToken');
                const response = await axios.get(`http://127.0.0.1:8000/api/perfil/cliente/${route.params.id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const cliente = response.data;

                setNome(cliente.nome);
                setSobrenome(cliente.sobrenome);
                setEmail(cliente.email);
                setSenha(cliente.senha);
                setTelefone(cliente.telefone);
                setEndereco(cliente.endereco);
                setSelectedImage(`http://127.0.0.1:8000/storage/imagem/${cliente.fotoCliente}`);
            } catch (error) {
                console.error('Erro ao buscar dados do cliente:', error);
            }
        };

        if (route.params && route.params.id) {
            fetchCliente();
        }
    }, [route.params]);

    const handleToggleEdit = () => {
        // Implemente a lógica para alternar entre modo de edição e visualização
    };

    const handleSavePerfilEdit = async () => {
        try {
            const token = await AsyncStorage.getItem('userToken');
            const formData = new FormData();

            formData.append('nome', nome);
            formData.append('sobrenome', sobrenome);
            formData.append('email', email);
            formData.append('senha', senha);
            // Adicione mais campos conforme necessário

            const response = await axios.post(`http://127.0.0.1:8000/api/perfil/cliente/${route.params.id}`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });

            // Lógica para tratar sucesso

        } catch (error) {
            console.error('Erro ao atualizar o perfil:', error);
            // Lógica para tratar erro
        }
    };

    return (
        <ScrollView contentContainerStyle={{ flex: 1, backgroundColor: '#343434' }}>
            {/* Conteúdo da tela */}
        </ScrollView>
    );
};

export default PerfilClienteScreen;
