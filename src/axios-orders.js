import axios from 'axios';

const instance =  axios.create({
    baseURL: 'https://react-my-burger-894d5.firebaseio.com/'
});

export default instance;