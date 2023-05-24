import CustomHttp from "./custom.http"

export default class LoginService {
    http = (new CustomHttp()).client();

    constructor() { }

    post = async (body) => {
        const response = await this.http.post('/v1/login', body);
        return response.data;
    }
}