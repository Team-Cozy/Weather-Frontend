export class Location {
  // eslint-disable-next-line class-methods-use-this
  getRequestParams() {
    throw new Error('Not implemented');
  }
}

export class CityLocation extends Location {
  constructor(data) {
    super();
    this.data = data;
  }

  getRequestParams() {
    return { city_id: this.data.id };
  }
}

export class CoordinateLocation extends Location {
  constructor(lat, lon) {
    super();
    this.lat = lat;
    this.lon = lon;
  }

  getRequestParams() {
    return { lat: this.lat, lon: this.lon };
  }
}
