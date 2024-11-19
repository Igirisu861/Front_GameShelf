import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet, TouchableOpacity } from 'react-native';

import color from '../constants/colors'

const SearchScreen = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  
  const data = [
    { id: '1', name: 'Gears of War 2' },
    { id: '2', name: 'Terraria' },
    { id: '3', name: 'Minecraft' },
    { id: '4', name: 'Deep Rock Galactic' },
    { id: '5', name: 'Silent Hill 2' },
  ];

  const handleSearch = (text) => {
    setQuery(text);
    if (text) {
      const filteredData = data.filter(item =>
        item.name.toLowerCase().includes(text.toLowerCase())
      );
      setResults(filteredData);
    } else {
      setResults([]);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search..."
        value={query}
        onChangeText={handleSearch}
      />
      
      {results.length > 0 ? (
        <FlatList
          data={results}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.resultItem}>
              <Text style={styles.resultText}>{item.name}</Text>
            </TouchableOpacity>
          )}
        />
      ) : (
        <Text style={styles.noResultsText}>No results found</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: color.lightSecondary,
  },
  searchInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 10,
    borderRadius: 5,
  },
  resultItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  resultText: {
    fontSize: 18,
  },
  noResultsText: {
    fontSize: 18,
    color: color.backgroundDark,
    textAlign: 'center',
  },
});

export default SearchScreen;
