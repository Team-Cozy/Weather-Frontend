import React, { createContext } from 'react';
import { PropTypes } from 'prop-types';
import BackendAPI from './BackendAPI';

const BackendAPIContext = createContext(BackendAPI);

function BackendAPIProvider({ children }) {
  return (
    <BackendAPIContext.Provider value={new BackendAPI('http://localhost:5000')}>
      {children}
    </BackendAPIContext.Provider>
  );
}

BackendAPIProvider.propTypes = {
  children: PropTypes.node
};

export default BackendAPIProvider;
