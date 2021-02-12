import { PropTypes } from 'prop-types';
import React, { createContext, useContext } from 'react';
import BackendAPI from './BackendAPI';

const BackendAPIContext = createContext(null);

export function BackendAPIProvider({ children }) {
  return (
    <BackendAPIContext.Provider
      value={{ api: new BackendAPI('http://localhost:5000') }}
    >
      {children}
    </BackendAPIContext.Provider>
  );
}

BackendAPIProvider.propTypes = {
  children: PropTypes.node
};

export function useBackendAPI() {
  return useContext(BackendAPIContext);
}
