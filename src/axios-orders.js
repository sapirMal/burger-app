import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-my-burger-55128.firebaseio.com/'
});

export default instance;