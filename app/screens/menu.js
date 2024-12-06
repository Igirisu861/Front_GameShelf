import React, { useEffect, useState } from "react";
import { Text, View, Alert, SafeAreaView, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import ListElement from "../components/listItem";
import color from "../constants/colors";
import { showLists, createList, deleteList, getGamesFromList, removeGame } from '../functions/authService'; 
import GamesModal from '../components/GamesModal';  

const MenuScreen = () => {
    const [lists, setLists] = useState([]);
    const [newListName, setNewListName] = useState('');
    const [isCreating, setIsCreating] = useState(false);
    const [modalVisible, setModalVisible] = useState(false); 
    const [selectedList, setSelectedList] = useState(null);   
    const [games, setGames] = useState([]);          
  
    useEffect(() => {
      const fetchLists = async () => {
        try {
          const fetchedLists = await showLists();
          setLists(fetchedLists);
        } catch (error) {
          console.error("Error obteniendo listas", error);
        }
      };
    
      fetchLists();
    }, [modalVisible]);
  
    const handlePressItem = async (item) => {
      try {
        console.log("Lista seleccionada:", item);
  
        const gameIds = item.games.map((game) => game.game_id); 
        const updatedGames = await getGamesFromList(gameIds);
  
        setSelectedList(item);
        setGames(updatedGames); 
        setModalVisible(true);
      } catch (error) {
        console.error("Error al obtener juegos", error);
      }
    };

    const handleDeleteItem = async (item) => {
      try {
        await deleteList(item.list_name);
        setLists((prevLists) => prevLists.filter((list) => list.list_name !== item.list_name));
        Alert.alert("¡Listo!", `La lista "${item.list_name}" fue eliminada.`);
      } catch (error) {
        console.error("Error eliminando la lista", error);
        Alert.alert("Error", "No fue posible eliminar la lista");
      }
    };
  
    const handleCreateList = async () => {
      if (!newListName.trim()) {
        Alert.alert("Error", "Favor de ingresar un nombre para la lista");
        return;
      }
      try {
        await createList(newListName);
        const fetchedLists = await showLists();
        setLists(fetchedLists);
        setNewListName('');
        setIsCreating(false);
        Alert.alert("¡Listo!", `La lista "${newListName}" fue creada con éxito`);
      } catch (error) {
        console.error("Error creando lista", error);
        Alert.alert("Error", "No fue posible crear la lista");
      }
    };
  
    return (
      <SafeAreaView style={styles.container}>
        {!isCreating ? (
          <TouchableOpacity
            style={styles.createButton}
            onPress={() => setIsCreating(true)}
          >
            <Text style={styles.createButtonText}>Crear Lista</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.createListContainer}>
            <TextInput
              style={styles.input}
              placeholder="Ingresa nombre de la lista"
              value={newListName}
              onChangeText={setNewListName}
            />
            <TouchableOpacity style={styles.createButton} onPress={handleCreateList}>
              <Text style={styles.createButtonText}>Crear</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setIsCreating(false)}
            >
              <Text style={styles.cancelButtonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        )}
  
        {lists.length === 0 ? (
          <Text style={styles.noListsText}>No hay listas creadas aún</Text>
        ) : (
          <ListElement 
            data={lists} 
            onPressItem={handlePressItem} 
            onDeleteItem={handleDeleteItem}
          />
        )}
  
        <GamesModal 
          modalVisible={modalVisible}
          games={games}
          onClose={() => setModalVisible(false)}
          selectedList={selectedList}
          removeGame={removeGame}
          setGames={setGames}
        />
      </SafeAreaView>
    );
  };
  

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.backgroundDark,
    justifyContent: "flex-start", 
    paddingTop: 20, 
    alignItems: "center",
  },
  noListsText: {
    fontSize: 30,
    color: color.lightSecondary,
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  createButton: {
    backgroundColor: color.accentColor,
    padding: 8,
    borderRadius: 20,
    width: "50%",
    alignItems: "center",
    marginVertical: 10,
  },
  createButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  createListContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  input: {
    width: "80%",
    padding: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: 10,
    backgroundColor: "#fff",
  },
  cancelButton: {
    backgroundColor: "#ddd",
    padding: 12,
    borderRadius: 20,
    width: "60%",
    alignItems: "center",
    marginTop: 10,
  },
  cancelButtonText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default MenuScreen;
