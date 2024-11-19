import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image } from "react-native";
import color from "../constants/colors";

const LoginScreen = ({navigation}) => {
  const [username, setUsername] = useState("test1");
  const [password, setPassword] = useState("test1");

  const handleLogin = () => {
    if (username && password) {
        navigation.navigate("Menu")
    } else {
      Alert.alert("Error", "Ingrese usuario y contraseña");
    }
  };

  return (
    <View style={styles.container}>
        <Text style={styles.title}>GameShelf</Text>
        <Image source={require("../assets/logo.png")} style={styles.logo}/>
        <Text style={styles.subtitle}>Login</Text>
        <TextInput
            style={styles.input}
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
        />
        <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
        />
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: color.backgroundDark,
  },
  subtitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: color.lightSecondary
  },
  title:{
    fontSize: 50,
    fontWeight: "bold",
    color: color.lightSecondary
  },
  input: {
    width: "100%",
    padding: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: 12,
    backgroundColor: color.white,
  },
  button: {
    backgroundColor: color.accentColor,
    padding: 12,
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  logo: {
    width: 300,
    height: 300,
    marginBottom: 20,
  },
});

export default LoginScreen;