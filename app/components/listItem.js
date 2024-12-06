import React, { useState } from "react";
import { FlatList, Text, TouchableOpacity, View, StyleSheet, Alert, TextInput } from "react-native";
import color from "../constants/colors";
import Icon from 'react-native-vector-icons/FontAwesome';

const ListElement = ({ data, onPressItem, onDeleteItem, onChangeName }) => {
    const [editingName, setEditingName] = useState(null);
    const [newName, setNewName] = useState('');

    const handleEditName = (item) => {
        setEditingName(item.list_name);
        setNewName(item.list_name);
    };

    const handleSaveName = async (item) => {
        if (!newName.trim()) {
            Alert.alert("Error", "El nombre no puede estar vacío");
            return;
        }
        try {
            console.log('Attempting to change name to:', newName); // Add debug log here
            await onChangeName(item, newName);
            setEditingName(null);
        } catch (error) {
            Alert.alert("Error", "No fue posible cambiar el nombre");
        }
    };
    

    const renderItem = ({ item }) => (
        <View style={styles.itemContainer}>
            <TouchableOpacity style={styles.item} onPress={() => onPressItem(item)}>
                {editingName === item.list_name ? (
                    <TextInput
                        style={styles.input}
                        value={newName}
                        onChangeText={setNewName}
                    />
                ) : (
                    <Text style={styles.name}>{item.list_name}</Text>
                )}

                <View style={styles.buttonsContainer}>
                    {editingName === item.list_name ? (
                        <TouchableOpacity 
                            style={styles.saveButton} 
                            onPress={() => handleSaveName(item)}
                        >
                            <Icon name="save" size={20} color={color.white} />
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity 
                            style={styles.editButton} 
                            onPress={() => handleEditName(item)}
                        >
                            <Icon name="edit" size={20} color={color.white} />
                        </TouchableOpacity>
                    )}

                    <TouchableOpacity 
                        style={styles.deleteButton} 
                        onPress={() => onDeleteItem(item)}
                    >
                        <Icon name="trash" size={20} color={color.white} />
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
        </View>
    );

    return (
        <FlatList
            data={data}
            keyExtractor={(item) => item.list_name} 
            renderItem={renderItem}
        />
    );
};

const styles = StyleSheet.create({
    itemContainer: {
        marginVertical: 10,
        marginHorizontal: 16,
        width: '100%', 
    },
    item: {
        flexDirection: 'row',
        padding: 16,
        marginVertical: 10,
        backgroundColor: color.accentColor,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: color.backgroundDark,
        elevation: 2,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        width: '90%', 
        alignItems: 'center', 
        justifyContent: 'space-between', 
    },
    name: {
        fontSize: 25,
        fontWeight: "bold",
        color: color.white,
        flex: 1,  
    },
    input: {
        fontSize: 20,
        color: color.white,
        flex: 1,
        borderBottomWidth: 1,
        borderBottomColor: color.white,
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginLeft: 10,
    },
    editButton: {
        backgroundColor: color.backgroundDark,
        borderRadius: 8,
        padding: 8,
        marginRight: 10,
        justifyContent: "center",
        alignItems: "center",
    },
    saveButton: {
        backgroundColor: color.accentColor,
        borderRadius: 8,
        padding: 8,
        marginRight: 10,
        justifyContent: "center",
        alignItems: "center",
    },
    deleteButton: {
        backgroundColor: color.backgroundDark,
        borderRadius: 8,
        padding: 8,
        justifyContent: "center",
        alignItems: "center",
    },
});

export default ListElement;
