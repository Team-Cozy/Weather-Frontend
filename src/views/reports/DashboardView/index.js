import {
  Container,
  Grid,
  makeStyles
} from '@material-ui/core';
import React from 'react';
import Page from 'src/components/Page';
import CurrentWeather from './CurrentWeather';
import Outfit from './Outfit';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const Dashboard = () => {
  const classes = useStyles();

  return (
    <Page
      className={classes.root}
      title="Dashboard"
    >
      <Container maxWidth={false}>
        <Grid
          container
          spacing={3}
        >
          <Grid
            item
            xs={12}
          >
            <CurrentWeather />
          </Grid>
          <Grid
            item
            xs={12}
          >
            <Outfit />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

export default Dashboard;
