import React, { useState } from 'react';
import { Button, CircularProgress } from '@material-ui/core';
import { LocationOn, LocationSearching } from '@material-ui/icons';
import { useUserLocation } from 'src/components/UserLocationProvider';
import { CoordinateLocation } from '../../api/Location';

function geolocationPromise(options) {
  return new Promise((resolve, reject) => {
    window.navigator.geolocation.getCurrentPosition(resolve, reject, options);
  });
}

export default function GPSLocationButton() {
  const [searching, setSearching] = useState(false);
  const { location, setLocation } = useUserLocation();

  let inner;
  if (location) {
    inner = <LocationOn />;
  } else if (searching) {
    inner = <CircularProgress />;
  } else {
    inner = <LocationSearching />;
  }

  return (
    <Button onClick={async () => {
      setSearching(true);
      const geolocation = await geolocationPromise();
      setLocation(
        new CoordinateLocation(
          geolocation.coords.latitude,
          geolocation.coords.longitude
        )
      );
      setSearching(false);
    }}
    >
      {inner}
    </Button>
  );
}
