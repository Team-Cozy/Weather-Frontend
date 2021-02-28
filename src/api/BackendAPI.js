import axios from 'axios';

/**
 * This is a helper class for accessing the API.
 */
export default class BackendAPI {
  constructor(baseURL) {
    this.baseURL = baseURL;
    this.axios = axios.create({ baseURL, withCredentials: true });
  }

  async getCurrentWeatherFromLocation(lat, lon) {
    const response = await this.axios.get('/weather/current', {
      params: { lat, lon }
    });
    return response.data;
  }

  async getCurrentWeatherAt(location) {
    console.log(location.getRequestParams());
    const response = await this.axios.get('/weather/current', {
      params: location.getRequestParams()
    });
    return response.data;
  }

  async searchForCity(query) {
    const response = await this.axios.get('/search/cities', { params: { query } });
    return response.data;
  }

  async getCurrentUser() {
    const response = await this.axios.get('/auth/current_user');
    return response.data;
  }

  getLoginURL() {
    return new URL('/auth/login', this.baseURL);
  }

  getLogoutURL() {
    return new URL('/auth/logout', this.baseURL);
}
