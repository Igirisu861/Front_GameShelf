import React from "react";
import { Text, View, Alert, SafeAreaView, StyleSheet } from "react-native";
import ListElement from "../components/listItem";
import color from "../constants/colors"



const MenuScreen = () => {

    const DATA = [
        {
            id: '1',
            name: 'Juegos terminados'
        },
        {
            id: '2',
            name: 'Juegos pendientes'
        },
        {
            id: '3',
            name: 'Juegos para regalar'
        }
    ];
    
    const handlePressItem = (item) => {
        Alert.alert("Lista presionada", `Presionaste: ${item.name}`)
    };

    return(
        <SafeAreaView style={styles.container}>
          <ListElement data={DATA} onPressItem={handlePressItem}/>  
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: color.backgroundDark,
    },
});

export default MenuScreen;