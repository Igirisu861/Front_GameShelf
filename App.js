import React from "react";
import { StyleSheet, Text, TouchableOpacity, Alert, View, Image} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoginScreen from "./app/screens/login";
import MenuScreen from "./app/screens/menu";
import SearchScreen from "./app/screens/search";
import RegisterScreen from "./app/screens/register";

import color from "./app/constants/colors";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        {/* Login header*/}
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        {/*Register Screen*/}
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{ headerShown: false }}
        />

        {/* Menu header*/}
        <Stack.Screen
          name="Menu"
          component={MenuScreen}
          options={({ navigation }) => ({
            title: "GameShelf",
            headerLeft: () => (
              <View style={styles.headerTitleContainer}>
              <Image
                source={require('./app/assets/logo.png')}
                style={styles.logo}
              />
            </View>
            ),
            headerRight: () => (
              <View style={styles.headerRightContainer}>
                <TouchableOpacity
                  style={styles.headerButton}
                  onPress={() => {
                    Alert.alert(
                      "Cerrar sesión",
                      "¿Seguro que desea cerrar sesión?",
                      [
                        { text: "Cancelar", style: "cancel" },
                        {
                          text: "Salir",
                          style: "destructive",
                          onPress: () => navigation.navigate("Login"),
                        },
                      ]
                    );
                  }}
                >
                  <Text style={styles.buttonText}>Log out</Text>
                </TouchableOpacity>

                  {/*Search*/}
                <TouchableOpacity
                  style={styles.headerButton}
                  onPress={() => {
                    navigation.navigate("Search");
                  }}
                >
                  <Text style={styles.buttonText}>Search</Text>
                </TouchableOpacity>
              </View>
            ),
            headerBackVisible: false,
            headerTintColor: color.white,
            headerStyle: {
              backgroundColor: color.darkSecondary,
            },
            headerTitleStyle: {
              fontWeight: "bold",
              fontSize: 20,
              color: color.white
            },
          })}
        />

        {/* Search header*/}
        <Stack.Screen
          name="Search"
          component={SearchScreen}
          options={{
            headerTintColor: color.white,
            headerStyle: {
              backgroundColor: color.darkSecondary,
            },
            headerTitleStyle: {
              fontWeight: "bold",
              fontSize: 20,
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  headerRightContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: 'center',
  },
  headerButton: {
    marginRight: 10,
    padding: 10,
    backgroundColor: color.primary,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  logo:{
    width: 40,  
    height: 40,
  }
});
