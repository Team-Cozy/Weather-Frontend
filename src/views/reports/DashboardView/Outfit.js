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
  DialogActions,
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
import { mapSliderValues } from '../../../api/utils';

const useStyles = makeStyles(({
  root: {
    height: '100%'
  },
  image: {
    height: 48,
    width: 48
  }
}));

function SliderEditDialog({ open, handleClose, clothingType }) {
  const { api } = useBackendAPI();
  const { temperature } = useUnitConverters();
  const [saving, setSaving] = useState(false);
  const [slider, setSlider] = useState(null);

  const profileIndex = 0;

  // TODO get the data in a MUCH better way
  useEffect(() => {
    if (!open) return;
    if (slider != null) return;

    api.getProfile(profileIndex).then((profile) => {
      const origSlider = profile.sliders[clothingType];
      console.log('Got slider', profile);
      setSlider(origSlider);
    });
  }, [slider, open]);

  // Saving side effect
  useEffect(() => {
    if (!saving) return;

    (async () => {
      // Get the current profile data (may have changed)
      const profile = await api.getProfile(profileIndex);

      // Patch the slider
      profile.sliders[clothingType] = slider;
      console.log(profile);

      // Send the data back to the backend
      await api.updateProfile(profileIndex, profile);

      // Close this modal
      setSaving(false);
      handleClose();
    })();
  }, [saving]);

  const getConvertedSlider = () => mapSliderValues(slider, temperature.convert);
  const setConvertedSlider = (newSlider) => {
    setSlider(mapSliderValues(newSlider, temperature.convertBack));
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogContent style={{ width: 500 }}>
        <DialogContentText>
          Edit
          {' '}
          {clothingType}
          {' '}
          values
        </DialogContentText>
        {(slider == null)
          ? <CircularProgress />
          : (
            <>
              <ZoneAdjustmentSlider
                domain={temperature.sliderDomain}
                preference={getConvertedSlider()}
                setPreference={setConvertedSlider}
              />
            </>
          )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={() => setSaving(true)} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}

SliderEditDialog.propTypes = {
  clothingType: PropTypes.string,
  handleClose: PropTypes.func,
  open: PropTypes.bool
};

function ClothingPiece({ piece }) {
  const classes = useStyles();
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleClose = () => setDialogOpen(false);

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
      <SliderEditDialog clothingType={piece.type} open={dialogOpen} handleClose={handleClose} />
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
