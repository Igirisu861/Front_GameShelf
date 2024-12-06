import React from 'react';
import { View, Text, Modal, FlatList, Image, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'; 
import color from "../constants/colors";

const GamesModal = ({ modalVisible, games, onClose, selectedList, removeGame, setGames }) => {
  const handleRemoveGame = async (gameId) => {
    try {
      await removeGame({ game_id: gameId, list_name: selectedList?.list_name });
      setGames((prevGames) => prevGames.filter((game) => game.id !== gameId));
      Alert.alert("¡Juego Eliminado!", "El juego ha sido eliminado con éxito.");
      onClose();
    } catch (error) {
      console.error('Error removing game:', error);
      Alert.alert("Error", "Hubo un problema al eliminar el juego.");
    }
  };

  return (
    <Modal
      visible={modalVisible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>{selectedList?.list_name}</Text>
          <FlatList
            data={games}
            keyExtractor={(item) => (item.id ? item.id.toString() : Math.random().toString())}
            contentContainerStyle={styles.listContent}
            renderItem={({ item }) => (
              <View style={styles.card}>
                <Image source={{ uri: item.img }} style={styles.cardImage} />
                <Text style={styles.cardTitle}>{item.name}</Text>
                <TouchableOpacity 
                  style={styles.removeButton} 
                  onPress={() => handleRemoveGame(item.id)} 
                >
                  <Ionicons name="trash-outline" size={24} color="white" />
                </TouchableOpacity>
              </View>
            )}
          />

          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Cerrar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    backgroundColor: color.backgroundDark,
    padding: 20,
    borderRadius: 10,
    width: '80%',
    maxHeight: '80%',
  },
  modalTitle: {
    color: color.white,
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  card: {
    flexDirection: 'row',
    marginBottom: 10,
    backgroundColor: color.accentColor,
    borderRadius: 8,
    padding: 10,
  },
  cardImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 10,
  },
  cardTitle: {
    fontSize: 18,
    color: color.white,
    flex: 1,
  },
  removeButton: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    backgroundColor: color.errorRed,
    borderRadius: 50,
  },
  closeButton: {
    backgroundColor: color.backgroundDark,
    padding: 10,
    borderRadius: 20,
    alignItems: 'center',
    marginTop: 10,
  },
  closeButtonText: {
    color: color.white,
    fontSize: 16,
  },
  listContent: {
    paddingBottom: 10,
  },
});

export default GamesModal;
