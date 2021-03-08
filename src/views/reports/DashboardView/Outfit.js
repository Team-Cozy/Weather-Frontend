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
  CircularProgress,
  Dialog,
  DialogContent,
  DialogContentText,
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
import { useUnitConverters } from 'src/components/UnitConversionProvider';
import ZoneAdjustmentSlider from '../../../components/ZoneAdjustmentSlider';

const useStyles = makeStyles(({
  root: {
    height: '100%'
  },
  image: {
    height: 48,
    width: 48
  }
}));

function SliderEditForm({ clothingType }) {
  const { api } = useBackendAPI();

  const { temperature } = useUnitConverters();

  // TODO get the data in a MUCH better way
  const [slider, setSlider] = useState(null);
  useEffect(() => {
    if (slider == null) {
      api.getProfile(0).then((profile) => {
        const origSlider = profile.sliders[clothingType];
        console.log('Got slider', origSlider);
        setSlider({
          ...origSlider,
          pieces: origSlider.pieces.map((node) => (
            {
              ...node,
              min: temperature.convert(node.min)
            }
          ))

        });
      });
    }
  }, [slider]);

  return slider == null ? <CircularProgress /> : (
    <>
      <DialogContentText>
        Edit
      </DialogContentText>
      <ZoneAdjustmentSlider domain={temperature.sliderDomain} preference={slider} />
    </>
  );
}

SliderEditForm.propTypes = {
  clothingType: PropTypes.string
};

function ClothingPiece({ piece }) {
  const classes = useStyles();
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <>
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
        onClick={() => { setDialogOpen(true); }}
      >
        <MoreVertIcon />
      </IconButton>
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogContent style={{ width: 500 }}>
          <SliderEditForm clothingType={piece.type} />
        </DialogContent>
      </Dialog>
    </>
  );
}

ClothingPiece.propTypes = {
  piece: PropTypes.object,
};

const Outfit = ({ className, ...rest }) => {
  const classes = useStyles();
  const [outfit, setOutfit] = useState(null);
  const { location } = useUserLocation();

  const { api } = useBackendAPI();

  // Update outfit when position is changed
  useEffect(() => {
    // Only update outfit if there's a position
    if (location == null) return;
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
            key={piece.id}
          >
            <ClothingPiece piece={piece} />
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
