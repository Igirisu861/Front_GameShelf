import React from "react";
import { StyleSheet, Text, TouchableOpacity, Alert } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoginScreen from "./app/screens/login";
import MenuScreen from "./app/screens/menu";

import color from "./app/constants/colors";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Menu"
          component={MenuScreen}
          options={({ navigation }) => ({
            title: "GameShelf",
            headerRight: () => (
              <TouchableOpacity
                style={styles.logoutButton}
                onPress={() => {
                  Alert.alert(
                    "Confirm Logout",
                    "Are you sure you want to log out?",
                    [
                      { text: "Cancel", style: "cancel" },
                      {
                        text: "Logout",
                        style: "destructive",
                        onPress: () => navigation.navigate("Login"),
                      },
                    ]
                  );
                }}
              >
                <Text style={styles.logoutText}>Logout</Text>
              </TouchableOpacity>
            ),
            headerBackVisible: false,
            headerTintColor: color.white,
            headerStyle: {
              backgroundColor: color.darkSecondary,
            },
            headerTitleStyle: {
              fontWeight: "bold",
              fontSize: 30,
            },
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  logoutButton: {
    marginRight: 10, // Adjust spacing
    padding: 10, // Improve touch area
    backgroundColor: color.primary, // Add contrast if needed
    borderRadius: 5, // Optional
  },
  logoutText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
