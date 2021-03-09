import {
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  Divider,
  List,
  ListItem,
  makeStyles,
  Typography
} from '@material-ui/core';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useBackendAPI } from 'src/components/BackendAPIProvider';
import { useUserLocation } from 'src/components/UserLocationProvider';
import ClothingPiece from '../../../components/ClothingPiece';

const useStyles = makeStyles({
  root: {
    height: '100%'
  }
});

function Outfit({ outfit, onUpdate }) {
  const pieces = Object.entries(outfit.pieces);

  return (
    <List>
      {pieces.map(([type, piece], i) => (
        <ListItem divider={i < pieces.length - 1} key={type}>
          <ClothingPiece onUpdate={onUpdate} piece={piece} />
        </ListItem>
      ))}
    </List>
  );
}

Outfit.propTypes = {
  outfit: PropTypes.object,
  onUpdate: PropTypes.func
};

function OutfitCard({ className, ...rest }) {
  const classes = useStyles();
  const [outfit, setOutfit] = useState(null);
  const { location } = useUserLocation();

  const { api } = useBackendAPI();

  const onUpdate = () => {
    console.log('updated');
    setOutfit(null);
  };

  // Update outfit when position is changed
  useEffect(() => {
    // Only update outfit if we don't have an outfit yet
    if (outfit != null) return;

    // Only update outfit if we have a location
    if (location == null) return;

    console.log('fetching outfit');
    api.getOutfit(location).then((response) => {
      setOutfit(response);
    });
  }, [api, location, outfit]);

  let content;
  if (location == null) {
    content = (
      <CardContent>
        <Typography>Please choose a location first.</Typography>
      </CardContent>
    );
  } else if (outfit == null) {
    content = (
      <CardContent>
        <CircularProgress />
      </CardContent>
    );
  } else {
    content = <Outfit outfit={outfit} onUpdate={onUpdate} />;
  }

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardHeader title="Outfit Suggestion!" />
      <Divider />
      {content}
    </Card>
  );
}

OutfitCard.propTypes = {
  className: PropTypes.string
};

export default OutfitCard;
