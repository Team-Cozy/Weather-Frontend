import {
  Avatar,
  Typography,
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
  const [user, setUser] = useState({ anonymous: true });
  const { api } = useBackendAPI();

  useEffect(
    () => {
      api.getCurrentUser().then(setUser);
    }, [api]
  );

  return (
    <>
      <Avatar
        className={classes.avatar}
        src={user.anonymous ? '/static/images/avatars/no_user.png' : user.profilePic}
      />
      <Typography
        className={classes.name}
        color="textPrimary"
        variant="h5"
      >
        {user.anonymous ? 'Not logged in' : user.name}
      </Typography>
    </>
  );
}
