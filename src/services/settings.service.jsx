import CustomHttp from "./custom.http";

export default class SettingsService {

    http = (new CustomHttp()).client()

    get = async () => {
        return (await this.http.get('/v1/get-all-users')).data;
    }

    register = async (body) => {
        return (await this.http.post("/v1/create-user-no-auth", body)).data;
    }

    update = async (body, id) => {
        return (await this.http.put("/v1/update-user/" + id, body)).data;
    }

}