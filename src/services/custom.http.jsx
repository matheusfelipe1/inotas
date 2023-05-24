import axios from 'axios';

export default class CustomHttp {
    client = () => {
        return axios.create({
            baseURL: 'http://127.0.0.1:9300/inotas-59ff4/us-central1/api',
            headers: {
                'Authorization': `Bearer ${this.getToken()}`
            },
        })
    }

    getToken = () => {
        try {
            var token = localStorage.getItem('token');
            return token;
        } catch (error) {
            return ''
        }

    }
}