import { PropTypes } from 'prop-types';
import React, {
  createContext, useContext, useEffect, useState
} from 'react';
import { useBackendAPI } from 'src/components/BackendAPIProvider';

const UserContext = createContext(null);

export function UserProvider({ children }) {
  const { api } = useBackendAPI();
  const [user, setUser] = useState(null);

  useEffect(() => {
    api.getCurrentUser().then(setUser);
  }, [api]);

  return (
    <UserContext.Provider
      value={{ user }}
    >
      {children}
    </UserContext.Provider>
  );
}

UserProvider.propTypes = {
  children: PropTypes.node
};

export function useLoggedInUser() {
  return useContext(UserContext);
}
