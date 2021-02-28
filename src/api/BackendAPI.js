import axios from 'axios';

/**
 * This is a helper class for accessing the API.
 */
export default class BackendAPI {
  constructor(baseURL) {
    this.axios = axios.create({ baseURL, withCredentials: true });
  }

  async getCurrentWeatherFromLocation(lat, lon) {
    const response = await this.axios.get('/weather/current', {
      params: { lat, lon }
    });
    return response.data;
  }

  async getCurrentUser() {
    const response = await this.axios.get('/auth/current_user');
    return response.data;
  }
}
