import axios from 'axios';

/**
 * This is a helper class for accessing the API.
 */
export default class BackendAPI {
  constructor(baseURL) {
    this.axios = axios.create({ baseURL });
  }

  async getCurrentWeatherFromLocation(lat, lon) {
    const response = await this.axios.get('/weather/current', {
      params: { lat, lon }
    });
    return response.data;
  }

  async getCurrentWeatherAt(location) {
    const response = await this.axios.get('/weather/current', {
      params: location.getRequestParams()
    });
    return response.data;
  }

  async searchForCity(query) {
    const response = await this.axios.get('/search/cities', { params: { query } });
    return response.data;
  }
}
