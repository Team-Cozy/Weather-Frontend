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
import { Cloud } from '@material-ui/icons';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { ArrowUp, CloudRain } from 'react-feather';
import { useBackendAPI } from 'src/api/BackendAPIProvider';

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
  console.log(weather);
  const classes = useStyles();
  const windHeading = weather.wind.heading;

  return (
    <>
      <Grid container justify="space-between" spacing={3}>
        <Grid item>
          <Typography color="textSecondary" gutterBottom variant="h6">
            San Francisco, CA, USA
          </Typography>
          <Typography color="textPrimary" variant="h3">
            Partly Cloudy
          </Typography>
        </Grid>
        <Grid item>
          <Avatar className={classes.avatar}>
            <Cloud />
          </Avatar>
        </Grid>
      </Grid>
      <Box mt={2} display="flex" alignItems="center">
        <ArrowUp style={{ transform: `rotate(${windHeading}deg)` }} />
        <Typography className={classes.differenceValue} variant="body2">
          5 mph NW
        </Typography>
        <CloudRain />
        <Typography className={classes.differenceValue} variant="body2">
          15% chance of rain
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

  const { api } = useBackendAPI();

  // Fetch weather on mount
  useEffect(() => {
    api.getCurrentWeatherFromLocation(0, 0).then((response) => {
      setWeather(response);
    });
  }, []);

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
