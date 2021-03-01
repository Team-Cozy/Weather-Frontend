import React from 'react';
import { Grid } from '@material-ui/core';
import CitySearch from './CitySearch';
import GPSLocationButton from './location/GPSLocationButton';

export default function UserLocationForm() {
  return (
    <Grid>
      <Grid item>
        <CitySearch />
        <GPSLocationButton />
      </Grid>
    </Grid>
  );
}
