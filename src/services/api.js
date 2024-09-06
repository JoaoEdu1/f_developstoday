import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3000', // Substitua pela URL base da sua API
});

export default instance;
