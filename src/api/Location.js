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
    return { cityId: this.data.cityId };
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
