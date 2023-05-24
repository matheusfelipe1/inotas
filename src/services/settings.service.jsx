import CustomHttp from "./custom.http";

export default class SettingsService {

    http = (new CustomHttp()).client()

    get = async () => {
        return (await this.http.get('/v1/get-all-users')).data;
    }

}