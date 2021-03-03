import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  makeStyles,
  Slider,
  Button
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
  const { api } = useBackendAPI();
  const [preferences, setPreferences] = useState({ gets_cold: 5, prefers_hot: 5, gets_burnt: 5 });

  const handleChange = (event, name) => {
    const { ariaValueNow } = event.target;
    const value = parseInt(ariaValueNow, 10);

    setPreferences({
      ...preferences,
      [name]: value,
    });
    console.log(preferences);
  };

  const handleSubmit = () => {
    console.log(preferences);
    api.updatePreferences(preferences);
    console.log(api.getCurrentUser());
    navigate('/app/dashboard', { replace: true });
  };

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
            <Slider
              defaultValue={5}
              valueLabelDisplay="auto"
              step={1}
              marks
              min={1}
              max={10}
              onChange={(e) => handleChange(e, 'gets_cold')}
            />
            <Typography id="likes_hot" gutterBottom>
              I would rather be hot than cold.
            </Typography>
            <Slider
              defaultValue={5}
              valueLabelDisplay="auto"
              step={1}
              marks
              min={1}
              max={10}
              onChange={(e) => handleChange(e, 'likes_hot')}
            />
            <Typography id="gets_burnt" gutterBottom>
              I get sunburnt easily.
            </Typography>
            <Slider
              defaultValue={5}
              valueLabelDisplay="auto"
              step={1}
              marks
              min={1}
              max={10}
              onChange={(e) => handleChange(e, 'gets_burnt')}
            />
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
