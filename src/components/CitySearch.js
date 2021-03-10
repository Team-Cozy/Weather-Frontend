/* eslint-disable no-use-before-define */
import React, { useState, useEffect } from 'react';
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';
import { useBackendAPI } from 'src/components/BackendAPIProvider';
import { Grid, TextField, Typography } from '@material-ui/core';
import { useUserLocation } from 'src/components/UserLocationProvider';
import { CityLocation } from 'src/api/Location';

const filter = createFilterOptions();

export default function CitySearch() {
  const { location, setLocation } = useUserLocation();
  const value = location instanceof CityLocation ? location.data : null;
  const setValue = (newValue) => {
    if (newValue) {
      setLocation(new CityLocation(newValue));
    }
  };

  const { api } = useBackendAPI();
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    if (!api || inputValue.length < 2) {
      setSuggestions([]);
    } else {
      api.searchForCity(inputValue).then(setSuggestions);
    }
  }, [api, inputValue]);

  return (
    <Autocomplete
      value={value}
      onChange={(_event, newValue) => {
        setValue(newValue);
      }}
      filterOptions={(options, params) => {
        const filtered = filter(options, params);
        return filtered;
      }}
      onInputChange={(_event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      selectOnFocus
      handleHomeEndKeys
      clearOnBlur
      id="free-solo-with-text-demo"
      options={suggestions}
      getOptionLabel={(option) => {
        return option.full_name;
      }}
      renderOption={(option) => {
        return (
          <Grid container alignItems="center">
            <Grid item xs>
              <Typography variant="body2" color="textSecondary">
                {option.full_name}
              </Typography>
            </Grid>
          </Grid>
        );
      }}
      style={{ width: 300 }}
      freeSolo
      renderInput={(params) => (
        <TextField {...params} label="What city are you in?" variant="outlined" />
      )}
    />
  );
}
