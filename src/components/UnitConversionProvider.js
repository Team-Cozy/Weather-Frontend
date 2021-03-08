import { PropTypes } from 'prop-types';
import React, { useState, createContext, useContext } from 'react';

const UnitConversionContext = createContext(null);

export const fahrenheitConverter = {
  convert: (x) => {
    return (x - 273) * (9 / 5) + 32;
  },
  convertBack: (x) => {
    return (x - 32) * (5 / 9) + 273;
  },
  sliderDomain: [-30, 120],
  units: '°F'
};

// eslint-disable-next-line no-unused-vars
export const celsiusConverter = {
  convert: (x) => {
    return x - 273;
  },
  convertBack: (x) => {
    return x + 273;
  },
  sliderDomain: [-30, 40],
  units: '°C'
};

export const mphConverter = {
  convert: (x) => {
    return 2.23694 * x;
  },
  convertBack: (x) => {
    return x / 2.23694;
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
  const [temperature, setTemperature] = useState(fahrenheitConverter);
  const [speed, setSpeed] = useState(mphConverter);
  return (
    <UnitConversionContext.Provider
      value={{
        temperature, setTemperature, speed, setSpeed
      }}
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

export function getUnitConverterByKey(converters, sliderKey) {
  switch (sliderKey) {
    case 'temp':
      return converters.temperature;
    case 'uv':
      return converters.uv;
    case 'speed':
      return converters.speed;
    default:
      throw Error(`Unsupported key ${sliderKey}`);
  }
}
