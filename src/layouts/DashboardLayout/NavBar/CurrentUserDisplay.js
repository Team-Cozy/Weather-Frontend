import {
  Avatar,
  Typography,
  CircularProgress,
  makeStyles
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useBackendAPI } from 'src/components/BackendAPIProvider';

const useStyles = makeStyles(() => ({
  avatar: {
    cursor: 'pointer',
    width: 64,
    height: 64
  }
}));

export default function CurrentUserDisplay() {
  const classes = useStyles();
  const [user, setUser] = useState(null);
  const { api } = useBackendAPI();

  useEffect(
    () => {
      api.getCurrentUser().then(setUser);
    }, [api]
  );

  return (
    user
      ? (
        <>
          <Avatar
            className={classes.avatar}
            src={user.profilePic}
          />
          <Typography
            className={classes.name}
            color="textPrimary"
            variant="h5"
          >
            {user.name}
          </Typography>
        </>
      )
      : <CircularProgress />
  );
}
