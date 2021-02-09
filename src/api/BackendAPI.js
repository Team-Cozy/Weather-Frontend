import axios from 'axios';

export default class BackendAPI {
  constructor(baseUrl) {
    this.axios = axios.create({ baseURL: baseUrl });
  }

  async getCurrentWeatherFromLocation(lat, lon) {
    const response = await this.axios.get('/weather/current', { params: { lat, lon } });
    console.log(response.data);
  }
}
