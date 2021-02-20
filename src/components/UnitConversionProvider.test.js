import React, { useEffect } from 'react';
import { render } from '@testing-library/react';
import { UnitConversionProvider, useUnitConverters, celsiusConverter } from './UnitConversionProvider';

// This is a component only used for testing.
function TestCelsiusConversionComponent() {
  // Retreive our current temperature from the outer scope.
  const { temperature, setTemperature } = useUnitConverters();

  // At the very beginning, set our converter.
  useEffect(() => {
    setTemperature(celsiusConverter);
  }, []);

  // Render the converted temperature.
  return (
    <p id="temp">
      {temperature.convert(420)}
      {temperature.units}
    </p>
  );
}

test('converts temperature from Kelvin to Celsius', () => {
  const { container } = render(
    (
      <UnitConversionProvider>
        <TestCelsiusConversionComponent />
      </UnitConversionProvider>
    )
  );

  const element = container.querySelector('#temp');
  expect(element.textContent).not.toContain('420');
  expect(element.textContent).toContain('147');
  expect(element.textContent).not.toContain('F');
  expect(element.textContent).toContain('C');
});
