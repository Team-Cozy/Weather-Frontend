import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { useBackendAPI } from 'src/components/BackendAPIProvider';
import { useUserLocation } from 'src/components/UserLocationProvider';
import {
  Box,
  Button,
  Card,
  CardHeader,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  makeStyles
} from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';

const useStyles = makeStyles(({
  root: {
    height: '100%'
  },
  image: {
    height: 48,
    width: 48
  }
}));

const Outfit = ({ className, ...rest }) => {
  const classes = useStyles();
  const [outfit, setOutfit] = useState(null);
  const { location } = useUserLocation();

  const { api } = useBackendAPI();

  // Update outfit when position is changed
  useEffect(() => {
    // Only update outfit if there's a position
    if (location == null || location.data == null) return;
    console.log('Got position', location);

    api.getOutfit(location)
      .then((response) => {
        console.log(response);
        setOutfit(response);
      });
  }, [location]);

  if (outfit == null) {
    return 'You must enter location to get an outfit suggestion';
  }

  const { pieces } = outfit;

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardHeader
        title="Outfit Suggestion!"
      />
      <Divider />
      <List>
        {Object.entries(pieces).map(([, piece], i) => (
          <ListItem
            divider={i < pieces.length - 1}
            key={piece.type}
          >
            <ListItemAvatar>
              <img
                alt={piece.name}
                className={classes.image}
                src={piece.image}
              />
            </ListItemAvatar>
            <ListItemText
              primary={piece.name}
            />
            <IconButton
              edge="end"
              size="small"
            >
              <MoreVertIcon />
            </IconButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <Box
        display="flex"
        justifyContent="flex-end"
        p={2}
      >
        <Button
          color="primary"
          endIcon={<ArrowRightIcon />}
          size="small"
          variant="text"
        >
          View all
        </Button>
      </Box>
    </Card>
  );
};

Outfit.propTypes = {
  className: PropTypes.string
};

export default Outfit;
