import React from "react";
import { FlatList, Text, TouchableOpacity, View, StyleSheet, Alert } from "react-native";
import color from "../constants/colors"

const ListElement = ({data, onPressItem}) => {
    const renderItem = ({item}) => (
        <TouchableOpacity style={styles.item} onPress={() => onPressItem(item)}>
            <Text style={styles.name}>{item.name}</Text>
        </TouchableOpacity>
    );

    return(
        <FlatList
            data={data}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderItem}
        />
    );
};

const styles = StyleSheet.create({
   
    item: {
        padding: 16,
        marginVertical: 10,
        marginHorizontal: 16,
        backgroundColor: color.accentColor,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#ccc",
        elevation: 2,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    }, 
    name:{
        fontSize:25,
        fontWeight: "bold",
        color: color.white
    }
    
});

export default ListElement;