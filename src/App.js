import 'react-perfect-scrollbar/dist/css/styles.css';
import React from 'react';
import { useRoutes } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';
import GlobalStyles from 'src/components/GlobalStyles';
import 'src/mixins/chartjs';
import theme from 'src/theme';
import routes from 'src/routes';
import { BackendAPIProvider } from './components/BackendAPIProvider';
import { UnitConversionProvider } from './components/UnitConversionProvider';

const App = () => {
  const routing = useRoutes(routes);

  return (
    <UnitConversionProvider>
      <BackendAPIProvider>
        <ThemeProvider theme={theme}>
          <GlobalStyles />
          {routing}
        </ThemeProvider>
      </BackendAPIProvider>
    </UnitConversionProvider>
  );
};

export default App;
