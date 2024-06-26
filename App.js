// import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, Text, View, Image, TextInput } from 'react-native';

import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import Routes from "./src/routes";

export default function App() {
  return (
    <NavigationContainer>
      <Routes />
    </NavigationContainer>
  );
}
