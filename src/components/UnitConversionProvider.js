import { PropTypes } from 'prop-types';
import React, { createContext, useContext } from 'react';

const UnitConversionContext = createContext(null);

const fahrenheitConverter = {
  convert: (x) => {
    return (x - 273) * (9 / 5) + 32;
  },
  convertToString: (x) => {
    return `${fahrenheitConverter.convert(x)} F`;
  },
  units: '°F'
};

// eslint-disable-next-line no-unused-vars
const celsiusConverter = {
  convert: (x) => {
    return (x - 273);
  },
  units: '°C'
};

const mphConverter = {
  convert: (x) => {
    return 2.23694 * x;
  },
  units: 'mph'
};

/**
 * Provides to its children a set of converters that the user wants to use.
 *
 * We are assuming the following set of base units:
 * - Temperature: Kelvin
 * - Speed: meters per second
 * - Distance: meters
 */
export function UnitConversionProvider({ children }) {
  return (
    <UnitConversionContext.Provider
      value={{ temperature: fahrenheitConverter, speed: mphConverter }}
    >
      {children}
    </UnitConversionContext.Provider>
  );
}

UnitConversionProvider.propTypes = {
  children: PropTypes.node
};

export function useUnitConverters() {
  return useContext(UnitConversionContext);
}
