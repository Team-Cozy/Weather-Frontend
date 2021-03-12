import 'react-perfect-scrollbar/dist/css/styles.css';
import React from 'react';
import { useRoutes } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';
import GlobalStyles from 'src/components/GlobalStyles';
import theme from 'src/theme';
import routes from 'src/routes';
import { BackendAPIProvider } from './components/BackendAPIProvider';
import { UnitConversionProvider } from './components/UnitConversionProvider';
import { UserLocationProvider } from './components/UserLocationProvider';
import { UserProvider } from './components/UserProvider';

const App = () => {
  const routing = useRoutes(routes);

  return (
    <UnitConversionProvider>
      <BackendAPIProvider>
        <UserLocationProvider>
          <UserProvider>
            <ThemeProvider theme={theme}>
              <GlobalStyles />
              {routing}
            </ThemeProvider>
          </UserProvider>
        </UserLocationProvider>
      </BackendAPIProvider>
    </UnitConversionProvider>
  );
};

export default App;
