import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';


const api = axios.create({
    baseURL: 'https://gameshelf.onrender.com',
    headers: {
        'Content-Type': 'application/json', 
    }
});

api.interceptors.request.use(async (config) => {
    //guardar y obtener el token usando Async Storage
    const token = await AsyncStorage.getItem('token'); 
    if(token){
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

export default api;