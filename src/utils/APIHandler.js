import axios from "axios";

export default class APIHandler {
    static hitApi(url, apiMethod, params) {
        (apiMethod === 'POST' && params && params != null)
            ? params.Token = '$2y$10$f43enwo0NWLsBmlGfx/ZMevMgmvEdbrZ3JTF.FNoVM4Nrj2aZYE82'
            : url = url + "?token=$2y$10$f43enwo0NWLsBmlGfx/ZMevMgmvEdbrZ3JTF.FNoVM4Nrj2aZYE82";

        console.log(url)

        var options = {
            url,
            method: apiMethod,
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            data: params ? params : ''
        }

        var axiosClient = axios(options).then(response => {
            console.log("API respones", response.data);

            return response.data;
        }).catch(error => {
            console.log(error);
        });

        return axiosClient;
    }
}