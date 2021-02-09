import BackendAPI from './BackendAPI';

test('gets weather from backend', async () => {
  const api = new BackendAPI('http://localhost:5000');
  const data = await api.getCurrentWeather();
  console.log(data);
});
