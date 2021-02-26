export class Location {
  // eslint-disable-next-line class-methods-use-this
  getRequestParams() {
    throw new Error('Not implemented');
  }
}

export class CityLocation extends Location {
  constructor(name, country, id) {
    super();
    this.name = name;
    this.country = country;
    this.cityId = id;
  }

  getRequestParams() {
    return { cityId: this.cityId };
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
