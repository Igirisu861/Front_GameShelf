import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet, TouchableOpacity, Image, Modal } from 'react-native';
import { search, showLists, addGame } from '../functions/authService'; 
import { Picker } from '@react-native-picker/picker'; 
import color from '../constants/colors';

const SearchScreen = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);  
  const [selectedGame, setSelectedGame] = useState(null);
  const [userLists, setUserLists] = useState([]);          
  const [selectedList, setSelectedList] = useState('');     

  useEffect(() => {
    const fetchLists = async () => {
      try {
        const lists = await showLists();
        if (lists && Array.isArray(lists)) {
          setUserLists(lists);
        } else {
          console.log('No se encontraron listas válidas');
        }
      } catch (error) {
        console.error('Error al cargar las listas', error);
      }
    };
    fetchLists();
  }, []);
  

  const handleSearch = async () => {
    if (!query.trim()) return;

    setLoading(true);
    try {
      const searchResults = await search(query);
      setResults(searchResults.apps);
    } catch (error) {
      console.error('Error durante la búsqueda', error);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleAddGame = async () => {
    if (!selectedList) {
      alert('Por favor, selecciona una lista');
      return;
    }
    try {
      await addGame({ game_name: selectedGame.name, list_name: selectedList });
      alert('Juego añadido a la lista con éxito');
      setModalVisible(false);
    } catch (error) {
      console.error('Error al añadir juego', error);
      alert('Error al añadir juego');
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => {
        setSelectedGame(item); 
        setModalVisible(true);  
      }}
    >
      <Image source={{ uri: item.img }} style={styles.cardImage} />
      <View style={styles.cardInfo}>
        <Text style={styles.cardTitle}>{item.name}</Text>
        <Text style={styles.cardPrice}>{item.price}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Buscar juegos..."
        placeholderTextColor={'gray'}
        value={query}
        onChangeText={setQuery}
      />
      
      <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
        <Text style={styles.searchButtonText}>Buscar</Text>
      </TouchableOpacity>
      
      {loading ? (
        <Text style={styles.loadingText}>Loading...</Text>
      ) : results.length > 0 ? (
        <FlatList
          data={results}
          keyExtractor={(item) => item.name}
          renderItem={renderItem}
        />
      ) : (
        <Text style={styles.noResultsText}>No results found</Text>
      )}

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Añadir a lista</Text>
            <Picker
              selectedValue={selectedList}
              onValueChange={(itemValue) => setSelectedList(itemValue)} 
              style={styles.picker}
            >
              <Picker.Item label="Selecciona una lista" value="" />
              {userLists.map((list, index) => (
                <Picker.Item key={index} label={list.list_name || 'Lista sin nombre'} value={list.list_name} />
              ))}
            </Picker>

            <TouchableOpacity
              style={styles.addButton}
              onPress={handleAddGame}
            >
              <Text style={styles.addButtonText}>Añadir a la lista</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: color.backgroundDark,
  },
  searchInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 10,
    borderRadius: 5,
    color: color.white
  },
  searchButton: {
    backgroundColor: color.accentColor,
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
    alignItems: 'center',
  },
  searchButtonText: {
    color: color.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  loadingText: {
    fontSize: 18,
    color: color.white,
    textAlign: 'center',
  },
  card: {
    flexDirection: 'row',
    backgroundColor: color.accentColor,
    marginBottom: 10,
    borderRadius: 8,
    elevation: 5,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  cardImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  cardInfo: {
    flex: 1,
    padding: 10,
    justifyContent: 'space-between',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: color.white,
  },
  cardPrice: {
    fontSize: 16,
    color: color.white,
  },
  noResultsText: {
    fontSize: 18,
    color: color.white,
    textAlign: 'center',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '80%',
    padding: 20,
    backgroundColor: color.backgroundDark,
    borderRadius: 8,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: color.white,
    marginBottom: 10,
  },
  picker: {
    height: 50,
    color: color.white,
  },
  addButton: {
    backgroundColor: color.accentColor,
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
    alignItems: 'center',
  },
  addButtonText: {
    color: color.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  closeButton: {
    marginTop: 10,
    alignItems: 'center',
  },
  closeButtonText: {
    color: color.white,
    fontSize: 16,
  },
});

export default SearchScreen;
