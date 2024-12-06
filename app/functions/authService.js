import api from './api';
import AsyncStorage from '@react-native-async-storage/async-storage';


//ruta register
export const registerUser = async (email, password) => {
    try{
        const response = await api.post('/register', {email, password});
        return response.data;
    } catch (error){
        console.error("Registro fallido:", error.response.data);
        throw error;
    }

};

// ruta login
export const loginUser = async (email, password) => {
    try {
      console.log('Making API request to /login with:', { email, password });
      const response = await api.post('/login', { email, password });
      console.log('API Response:', response.data);
      const { access_token } = response.data;
  
      await AsyncStorage.setItem('token', access_token);
      return response.data;
    } catch (error) {
      console.error('Error in loginUser:', error); 
      if (error.response) {
        console.error('Error response data:', error.response.data);
      } else if (error.request) {
        console.error('Error request:', error.request);
      } else {
        console.error('Unexpected error message:', error.message);
      }
      throw error;
    }
  };
  

//ruta createlist
export const createList = async (list_name) => {
    try {
        const response = await api.post('/createlist',{ list_name }, {headers:{'Content-Type': 'application/json'},}
        );
        return response.data;
    } catch (error) {
        console.error('Creación de lista fallida', error.response?.data || error.message || error);
        throw error;
    }
};
 
//ruta deletelist
export const deleteList = async(list_name) => {
    try{
        const response = await api.delete('/deletelist', {data:{list_name}});
        return response.data;
    } catch (error){
        console.error('Borrado de lista fallido', error.response.data);
        throw error;
    }
};

//ruta changename
export const changeName = async({list_name, new_name}) => {
    try{
        const response = await api.put('/changename', {list_name, new_name});
        return response.data;
    } catch (error){
        console.error('Cambio de nombre de lista fallido', error.response.data);
        throw error;
    }
};

//ruta search
export const search = async(search_input) => {
    try {
        const response = await api.post('/search', { search_input });
        return response.data;
    } catch (error) {
        console.error('Search fallido', error.response?.data || error.message);
        throw error;
    }
};


//ruta addgame
export const addGame = async({game_name, list_name}) => {
    try{
        const response = await api.put('/addgame', {game_name, list_name})
        return response.data
    } catch (error){
        console.error('Añadir juego falló:', error.response.data);
        throw error;
    }
};

//ruta addgame
export const removeGame = async({game_id, list_name}) => {
    try{
        const response = await api.delete('/removegame', {data:{game_id, list_name}})
        return response.data
    } catch (error){
        console.error('Quitar juego falló:', error.response.data);
        throw error;
    }
};

//ruta showlists
export const showLists = async() => {
    try{
        const response = await api.get('/showlists')
        return response.data
    } catch (error){
        console.error('Quitar juego falló:', error.response.data);
        throw error;
    }
};

export const getGamesFromList = async (gameIds) => {
    const games = [];
  
    // Recorremos cada ID de juego
    for (const gameId of gameIds) {
      const url = `http://store.steampowered.com/api/appdetails?appids=${gameId}&cc=us&l=english`;
  
      try {
        const response = await fetch(url);
        const data = await response.json();
  
        if (data[gameId] && data[gameId].success) {
          games.push({
            id: gameId,
            name: data[gameId].data.name,
            img: data[gameId].data.header_image,
          });
        } else {
          console.warn(`No se encontró el juego con ID ${gameId}`);
        }
      } catch (error) {
        console.error("Error al obtener juego desde Steam para ID", gameId, error);
      }
    }
    return games;
  };
  
  
  


