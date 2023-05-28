import CustomHttp from "./custom.http"

export default class FilesService {
    http = (new CustomHttp()).client();

    constructor() { }

    post = async (body) => {
        const response = await this.http.post('/v1/file', body);
        return response.data;
    }

    postInvoice = async (body) => {
        const response = await this.http.post('/v1/invoice', body);
        return response.data;
    }

    getList = async () => {
        const response = await this.http.get('/v1/invoice');
        return response.data;
    }

    update = async(id, body) => {
        const response = await this.http.put(`/v1/invoice/${id}`, body);
        return response.data;
    }
}