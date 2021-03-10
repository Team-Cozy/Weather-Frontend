/* eslint-disable import/prefer-default-export */

export function mapSliderValues(slider, f) {
  return {
    ...slider,
    pieces: slider.pieces.map((node) => (
      {
        ...node,
        min: f(node.min)
      }
    ))
  };
}
