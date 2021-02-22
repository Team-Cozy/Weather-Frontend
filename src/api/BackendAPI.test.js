import BackendAPI from './BackendAPI';

test('gets weather from backend', async () => {
  const api = new BackendAPI('http://localhost:5000');
  await api.getCurrentWeatherFromLocation(0, 0);
});
