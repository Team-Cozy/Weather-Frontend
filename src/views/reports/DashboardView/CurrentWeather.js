import {
  Avatar,
  Box,
  Card,
  CardContent,
  colors,
  Grid,
  makeStyles,
  Typography
} from '@material-ui/core';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { ArrowUp, CloudRain } from 'react-feather';
import { useBackendAPI } from 'src/components/BackendAPIProvider';
import { useUnitConverters } from 'src/components/UnitConversionProvider';
import { usePosition } from 'use-position';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%'
  },
  avatar: {
    backgroundColor: colors.red[600],
    height: 56,
    width: 56
  },
  differenceIcon: {
    color: colors.red[900]
  },
  differenceValue: {
    color: colors.red[900],
    marginRight: theme.spacing(1)
  }
}));

function WeatherCardInner({ weather }) {
  const classes = useStyles();
  console.log(weather);
  const { temperature, speed } = useUnitConverters();

  const chanceOfRain = weather.weather.rain.chance ? weather.weather.rain.chance : 0;

  return (
    <>
      <Grid container justify="space-between" spacing={3}>
        <Grid item>
          <Typography color="textSecondary" gutterBottom variant="h6">
            {weather.location.name}
          </Typography>
          <Typography color="textPrimary" variant="h3">
            {weather.weather.status}
            ,
            {' '}
            {temperature.convert(weather.weather.temperature.temp).toFixed(1)}
            {temperature.units}
          </Typography>
        </Grid>
        <Grid item>
          <Avatar className={classes.avatar} />
        </Grid>
      </Grid>
      <Box mt={2} display="flex" alignItems="center">
        <ArrowUp style={{ transform: `rotate(${weather.weather.wind.heading}deg)` }} />
        <Typography className={classes.differenceValue} variant="body2">
          {speed.convert(weather.weather.wind.speed).toFixed(1)}
          {' '}
          {speed.units}
        </Typography>
        <CloudRain />
        <Typography className={classes.differenceValue} variant="body2">
          {chanceOfRain}
          % chance of rain
        </Typography>
      </Box>
    </>
  );
}

WeatherCardInner.propTypes = {
  weather: PropTypes.object
};

const CurrentWeather = ({ className, ...rest }) => {
  const classes = useStyles();
  const [weather, setWeather] = useState(null);
  const { latitude, longitude } = usePosition();

  const { api } = useBackendAPI();

  // Fetch weather on mount
  useEffect(() => {
    // Only update weather if there's a position
    if (!(latitude && latitude)) return;

    api.getCurrentWeatherFromLocation(latitude, longitude).then((response) => {
      setWeather(response);
    });
  }, [latitude, longitude]);

  return (
    <Card className={clsx(classes.root, className)} {...rest} style={{ height: 150 }}>
      <CardContent>
        {weather ? <WeatherCardInner weather={weather} /> : null}
      </CardContent>
    </Card>
  );
};

CurrentWeather.propTypes = {
  className: PropTypes.string
};

export default CurrentWeather;
