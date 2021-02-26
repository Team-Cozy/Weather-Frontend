/* eslint-disable no-use-before-define */
import React, { useState, useEffect } from 'react';
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';
import { useBackendAPI } from 'src/components/BackendAPIProvider';
import { Grid, TextField, Typography } from '@material-ui/core';

const filter = createFilterOptions();

export default function FreeSoloCreateOption() {
  const [value, setValue] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const { api } = useBackendAPI();

  useEffect(() => {
    if (!api || inputValue.length < 3) {
      setSuggestions([]);
    } else {
      api.searchForCity(inputValue).then(setSuggestions);
    }
  }, [api, inputValue]);

  return (
    <Autocomplete
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      filterOptions={(options, params) => {
        const filtered = filter(options, params);
        return filtered;
      }}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      selectOnFocus
      handleHomeEndKeys
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
        <TextField {...params} label="Search for a city..." variant="outlined" />
      )}
    />
  );
}
