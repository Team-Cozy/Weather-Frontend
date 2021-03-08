import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  makeStyles,
  Slider,
  Button,
  CircularProgress
} from '@material-ui/core';
import Page from 'src/components/Page';
import { useBackendAPI } from 'src/components/BackendAPIProvider';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const RegisterView = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [preferences, setPreferences] = useState(null);
  const [initial, setInitial] = useState(null);
  const { api } = useBackendAPI();

  useEffect(
    () => {
      api.getCurrentUser().then((user) => {
        if (user.anonymous) {
          setPreferences({ gets_cold: 5, likes_hot: 5, gets_burnt: 5 });
          setInitial({ gets_cold: 5, likes_hot: 5, gets_burnt: 5 });
        } else {
          setPreferences(user.preferences);
          setInitial(user.preferences);
        }
      });
    }, [api]
  );

  const handleChange = (event, name) => {
    const { ariaValueNow } = event.target;

    if (ariaValueNow != null) {
      setPreferences({
        ...preferences,
        [name]: parseInt(ariaValueNow, 10),
      });
    }
  };

  const handleSubmit = () => {
    console.log(preferences);
    api.updatePreferences(preferences);
    navigate('/app/dashboard');
  };

  let getsCold;
  if (initial == null) {
    getsCold = <CircularProgress />;
  } else {
    getsCold = (
      <Slider
        defaultValue={initial.gets_cold}
        valueLabelDisplay="auto"
        step={1}
        marks
        min={1}
        max={10}
        aria-valuemin={1}
        aria-valuemax={10}
        onChange={(e) => handleChange(e, 'gets_cold')}
      />
    );
  }

  let likesHot;
  if (initial == null) {
    likesHot = <CircularProgress />;
  } else {
    likesHot = (
      <Slider
        defaultValue={initial.likes_hot}
        valueLabelDisplay="auto"
        step={1}
        marks
        min={1}
        max={10}
        aria-valuemin={1}
        aria-valuemax={10}
        onChange={(e) => handleChange(e, 'likes_hot')}
      />
    );
  }

  let getsBurnt;
  if (initial == null) {
    getsBurnt = <CircularProgress />;
  } else {
    getsBurnt = (
      <Slider
        defaultValue={initial.gets_burnt}
        valueLabelDisplay="auto"
        step={1}
        marks
        min={1}
        max={10}
        aria-valuemin={1}
        aria-valuemax={10}
        onChange={(e) => handleChange(e, 'gets_burnt')}
      />
    );
  }

  return (
    <Page
      className={classes.root}
      title="Register"
    >
      <Box
        display="flex"
        flexDirection="column"
        height="100%"
        justifyContent="center"
      >
        <Container maxWidth="sm">
          <form onSubmit={handleSubmit}>
            <Box mb={3}>
              <Typography
                color="textPrimary"
                variant="h2"
              >
                Set your weather preferences!
              </Typography>
              <Typography
                color="textSecondary"
                gutterBottom
                variant="body2"
              >
                On a scale of 1-10, how much do you agree with each of the following statements?
              </Typography>
            </Box>
            <Typography id="gets_cold" gutterBottom>
              I get cold easily.
            </Typography>
            {getsCold}
            <Typography id="likes_hot" gutterBottom>
              I would rather be hot than cold.
            </Typography>
            {likesHot}
            <Typography id="gets_burnt" gutterBottom>
              I get sunburnt easily.
            </Typography>
            {getsBurnt}
            <Box my={2}>
              <Button
                color="primary"
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                onSubmit={handleSubmit}
              >
                Register now
              </Button>
            </Box>
          </form>
        </Container>
      </Box>
    </Page>
  );
};

export default RegisterView;
