import axios from 'axios'

export class BackendAPI {

    constructor(baseUrl) {
        this.axios = axios.create({ baseURL: baseUrl })
    }

    async getCurrentWeather(location) {
        const response = await this.axios.get("/weather/current", { params: { lat: 80, lon: 80 } })
        console.log(response.data)
    }
}
