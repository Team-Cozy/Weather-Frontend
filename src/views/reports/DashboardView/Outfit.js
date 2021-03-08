import {
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
  makeStyles,
  Tooltip
} from '@material-ui/core';
import { Create } from '@material-ui/icons';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useBackendAPI } from 'src/components/BackendAPIProvider';
import { getUnitConverterByKey, useUnitConverters } from 'src/components/UnitConversionProvider';
import { useUserLocation } from 'src/components/UserLocationProvider';
import { mapSliderValues } from '../../../api/utils';
import ZoneAdjustmentSlider from '../../../components/ZoneAdjustmentSlider';
import { useLoggedInUser } from '../../../components/UserProvider';

const useStyles = makeStyles(({
  root: {
    height: '100%'
  },
  image: {
    height: 48,
    width: 48
  }
}));

function SliderEditDialog({
  open, handleClose, clothingType, onUpdate = () => { }
}) {
  const { api } = useBackendAPI();
  const [saving, setSaving] = useState(false);
  const [slider, setSlider] = useState(null);
  const converters = useUnitConverters();
  const converter = slider == null ? null : getUnitConverterByKey(converters, slider.parameter);

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
      console.log('updated');
      onUpdate();
    })();
  }, [saving]);

  const getConvertedSlider = () => mapSliderValues(slider, converter.convert);
  const setConvertedSlider = (newSlider) => {
    setSlider(mapSliderValues(newSlider, converter.convertBack));
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
                domain={converter.sliderDomain}
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
  onUpdate: PropTypes.func,
  open: PropTypes.bool
};

function ClothingPiece({
  piece,
  onUpdate = () => { }
}) {
  const classes = useStyles();
  const [dialogOpen, setDialogOpen] = useState(false);
  const { user } = useLoggedInUser();
  const loggedIn = user == null || !user.anonymous;

  const handleClose = () => setDialogOpen(false);
  const editButton = (
    <IconButton
      edge="end"
      size="small"
      disabled={!loggedIn}
      onClick={() => {
        if (loggedIn) setDialogOpen(true);
      }}
    >
      <Create title="Edit" />
    </IconButton>
  );

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
      <Tooltip
        title={
          loggedIn
            ? 'Change your preferences'
            : 'Log in to set your preferences!'
        }
      >
        {editButton}
      </Tooltip>

      <SliderEditDialog
        clothingType={piece.type}
        open={dialogOpen}
        handleClose={handleClose}
        onUpdate={onUpdate}
      />
    </>
  );
}

ClothingPiece.propTypes = {
  piece: PropTypes.object,
  onUpdate: PropTypes.func,
};

const Outfit = ({ className, ...rest }) => {
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
    api.getOutfit(location)
      .then((response) => {
        setOutfit(response);
      });
  }, [api, location, outfit]);

  if (location == null) {
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
            <ClothingPiece onUpdate={onUpdate} piece={piece} />
          </ListItem>
        ))}
      </List>
    </Card>
  );
};

Outfit.propTypes = {
  className: PropTypes.string
};

export default Outfit;
