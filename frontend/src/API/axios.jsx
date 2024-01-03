import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://match-reservation-system.vercel.app'
});

export default instance;
