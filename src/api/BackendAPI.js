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

  async getOutfit(location) {
    /* assume we only have one profile (general) at index 0 -- multiple profiles not implemented */
    const response = await this.axios.get('/profiles/0/outfit', {
      params: location.getRequestParams()
    });
    return response.data;
  }

  async updatePreferences(preferences) {
    const response = await this.axios.post('/preferences', preferences);
    return response;
  }

  async getProfile(index) {
    const response = await this.axios.get(`/profiles/${index}`);
    return response.data;
  }

  async updateProfile(index, data) {
    const response = await this.axios.put(`/profiles/${index}`, data);
    return response.data;
  }

  getLoginURL() {
    return new URL('/auth/login', this.baseURL).toString();
  }

  getLogoutURL() {
    return new URL('/auth/logout', this.baseURL).toString();
  }
}
