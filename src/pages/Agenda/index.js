import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ImageBackground } from 'react-native-web';

export default function Perfil(){    
return (
    <View style={styles.container}>
        <Text style={styles.text}>
            Perfil
        </Text>
    </View>
    );
}


const styles = StyleSheet.create({

    container:{
        flex:1,
        // backgroundColor:'#fff',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'green',
    },

    text:{
        fontSize:25,
        fontWeight:'bold',
    },
})