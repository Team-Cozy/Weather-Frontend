import { PropTypes } from 'prop-types';
import React, { createContext, useContext, useState } from 'react';

const UserLocationContext = createContext(null);

export function UserLocationProvider({ children }) {
  const [location, setLocation] = useState(null);

  return (
    <UserLocationContext.Provider
      value={{ location, setLocation }}
    >
      {children}
    </UserLocationContext.Provider>
  );
}

UserLocationProvider.propTypes = {
  children: PropTypes.node
};

export function useUserLocation() {
  return useContext(UserLocationContext);
}
