import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image, ImageBackground } from "react-native";
import color from "../constants/colors";
import { registerUser } from "../functions/authService";

const RegisterScreen = ({navigation}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await registerUser(email, password);
      Alert.alert('Bienvenido!');
      navigation.navigate('Menu');
    } catch (error) {
      Alert.alert('Error', 'Datos incompletos');
    }
  };

  const returnLogin = () => {
    navigation.navigate('Login')
  }

  return (
    <ImageBackground
      source={require('../assets/LoginBackground.jpg')}
      style= {styles.background}
      resizeMode="cover"
    >
     
      <Text style={styles.title}>GameShelf</Text>
      <Image source={require("../assets/logo.png")} style={styles.logo}/>
      <Text style={styles.subtitle}>Registro</Text>

        
        <TextInput
            style={styles.input}
            placeholder="Ingrese su email"
            placeholderTextColor="gray"
            value={email}
            onChangeText={setEmail}
        />
        <TextInput
            style={styles.input}
            placeholder="Ingrese su contraseña"
            placeholderTextColor="gray"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
        />
        
        <TouchableOpacity style={styles.buttonRegister} onPress={handleLogin}>
            <Text style={styles.buttonText2}>Register</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={returnLogin}>
            <Text style={styles.buttonText}>Volver a login</Text>
        </TouchableOpacity>
    </ImageBackground>
    
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: color.backgroundDark
  },
  subtitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: color.lightSecondary,
    textShadowColor: "rgba(1, 1, 1, 1)", 
    textShadowOffset: { width: 2, height: 2 }, 
    textShadowRadius: 2,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 4, 
    borderRadius: 4,
  },
  title:{
    fontSize: 75,
    fontWeight: "bold",
    color: color.darkSecondary,
    textShadowColor: "rgba(1, 1, 1, 1)", 
    textShadowOffset: { width: 2, height: 2 }, 
    textShadowRadius: 2,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    padding: 4, 
    borderRadius: 4,
    
  },
  input: {
    width: "100%",
    padding: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: 12,
    color: color.backgroundDark,
    backgroundColor: '#FFFF'
  },
  button: {
    backgroundColor: color.accentColor,
    padding: 12,
    borderRadius: 20,
    width: "50%",
    alignItems: "center",
    marginBottom: 10
  },
  buttonRegister: {
    backgroundColor: color.lightSecondary,
    padding: 12,
    borderRadius: 20,
    width: "50%",
    alignItems: "center",
    marginBottom: 10
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  buttonText2: {
    color: color.backgroundDark,
    fontSize: 16,
    fontWeight: "bold",
  },
  logo: {
    width: 300,
    height: 300,
    marginBottom: 20,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    padding: 4, 
    borderRadius: 4,
  },
});

export default RegisterScreen;