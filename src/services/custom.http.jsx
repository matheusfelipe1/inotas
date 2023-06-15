import axios from 'axios';

export default class CustomHttp {
    client = () => {
        return axios.create({
            baseURL: 'https://us-central1-inotas-59ff4.cloudfunctions.net/api',
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