import React, { useState } from 'react';
import { Button, CircularProgress } from '@material-ui/core';
import { LocationSearching } from '@material-ui/icons';
import { useUserLocation } from 'src/components/UserLocationProvider';
import { CoordinateLocation } from '../../api/Location';

function geolocationPromise(options) {
  return new Promise((resolve, reject) => {
    window.navigator.geolocation.getCurrentPosition(resolve, reject, options);
  });
}

export default function GPSLocationButton() {
  const [searching, setSearching] = useState(false);
  const { setLocation } = useUserLocation();

  let inner;
  if (searching) {
    inner = <CircularProgress color="inherit" />;
  } else {
    inner = <LocationSearching color="inherit" />;
  }

  return (
    <Button
      color="inherit"
      onClick={async () => {
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
