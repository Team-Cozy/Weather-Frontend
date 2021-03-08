import PropTypes from 'prop-types';
import React from 'react';
import {
  Handles,
  Rail,
  Slider,
  Ticks,
  Tracks
} from 'react-compound-slider';

// modified from https://react-compound-slider.netlify.app/vertical

export const SliderRail = ({ getRailProps }) => {
  return (
    <>
      <div
        style={{
          position: 'absolute',
          height: '100%',
          width: 42,
          transform: 'translate(-50%, 0%)',
          borderRadius: 7,
          cursor: 'pointer',
        }}
        {...getRailProps()}
      />
      <div
        style={{
          position: 'absolute',
          height: '100%',
          width: 14,
          transform: 'translate(-50%, 0%)',
          borderRadius: 7,
          pointerEvents: 'none',
          backgroundColor: 'rgb(155,155,155)',
        }}
      />
    </>
  );
};

SliderRail.propTypes = {
  getRailProps: PropTypes.func
};

export const Handle = ({
  domain: [min, max],
  handle: { id, value, percent },
  getHandleProps,
}) => {
  return (
    <>
      <div
        style={{
          top: `${percent}%`,
          position: 'absolute',
          transform: 'translate(-50%, -50%)',
          WebkitTapHighlightColor: 'rgba(0,0,0,0)',
          zIndex: 5,
          width: 42,
          height: 28,
          cursor: 'pointer',
          backgroundColor: 'none',
        }}
        {...getHandleProps(id)}
      />
      <div
        role="slider"
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={value}
        style={{
          top: `${percent}%`,
          position: 'absolute',
          transform: 'translate(-50%, -50%)',
          zIndex: 2,
          width: 24,
          height: 24,
          borderRadius: '50%',
          boxShadow: '1px 1px 1px 1px rgba(0, 0, 0, 0.3)',
          backgroundColor: '#D7897E',
        }}
      />
    </>
  );
};

Handle.propTypes = {
  domain: PropTypes.array,
  handle: PropTypes.object,
  getHandleProps: PropTypes.func
};

export function Track({
  source,
  target,
  children,
  getTrackProps,
}) {
  return (
    <div
      style={{
        position: 'absolute',
        zIndex: 1,
        backgroundColor: '#C55F4E',
        borderRadius: 7,
        cursor: 'pointer',
        width: 14,
        transform: 'translate(-50%, 0%)',
        top: `${source.percent}%`,
        height: `${target.percent - source.percent}%`,
        display: 'flex',
        flexFlow: 'column wrap',
        justifyContent: 'center',
      }}
      {...getTrackProps()}
    >
      <div style={{ marginLeft: 30, width: 200 }}>{children}</div>
    </div>
  );
}

Track.propTypes = {
  children: PropTypes.element,
  source: PropTypes.object,
  target: PropTypes.object,
  getTrackProps: PropTypes.func
};

export const Tick = ({ tick, format = (d) => d }) => {
  return (
    <div>
      <div
        style={{
          tick,
          width: 6,
          backgroundColor: 'rgb(200,200,200)',
          top: `${tick.percent}%`,
        }}
      />
      <div
        style={{
          position: 'absolute',
          marginTop: -7,
          marginLeft: -46,
          fontSize: 10,
          width: 20,
          textAlign: 'right',
          top: `${tick.percent}%`,
        }}
      >
        {format(tick.value)}
      </div>
    </div>
  );
};

Tick.propTypes = {
  tick: PropTypes.object,
  format: PropTypes.func
};

function RangeLabel({
  children,
  percent,
}) {
  return (
    <div
      style={{
        top: `${percent}%`,
      }}
    >
      {children}
    </div>
  );
}

RangeLabel.propTypes = {
  children: PropTypes.element,
  percent: PropTypes.number
};

const sliderStyle = {
  position: 'relative',
  height: '400px',
  marginLeft: '45%',
  touchAction: 'none',
};

export default function ZoneAdjustmentSlider({
  domain,
  preference,
  setPreference = () => { },
}) {
  const lastIndex = preference.pieces.length - 1;
  const nodes = preference.pieces.slice(0, lastIndex);
  const values = nodes.map((c) => c.min);

  const setValues = (newValues) => {
    const pieces = [
      ...nodes.map((c, i) => ({
        ...c,
        min: newValues[i],
      })),
      preference.pieces[lastIndex],
    ];
    setPreference({
      ...preference,
      pieces,
    });
  };

  const onUpdate = () => {
    /* noop */
  };

  const onChange = (d) => {
    setValues(d);
  };

  return (
    <Slider
      vertical
      reversed
      mode={2}
      step={1}
      domain={domain}
      rootStyle={sliderStyle}
      onUpdate={onUpdate}
      onChange={onChange}
      values={values}
    >
      <Rail>
        {({ getRailProps }) => <SliderRail getRailProps={getRailProps} />}
      </Rail>
      <Handles>
        {({ handles, getHandleProps }) => (
          <div className="slider-handles">
            {handles.map((handle) => (
              <Handle
                key={handle.id}
                handle={handle}
                domain={domain}
                getHandleProps={getHandleProps}
              />
            ))}
          </div>
        )}
      </Handles>
      <Tracks left right>
        {({ tracks, getTrackProps }) => (
          <div className="slider-tracks">
            {tracks.map(({ id, source, target }, i) => {
              const piece = preference.pieces[i];

              return (
                <Track
                  key={id}
                  source={source}
                  target={target}
                  getTrackProps={getTrackProps}
                >
                  {piece.piece.name}
                </Track>
              );
            })}
          </div>
        )}
      </Tracks>
      <Ticks count={5}>
        {({ ticks }) => (
          <div className="slider-ticks">
            {ticks.map((tick) => (
              <Tick key={tick.id} tick={tick} />
            ))}
          </div>
        )}
      </Ticks>
    </Slider>
  );
}

ZoneAdjustmentSlider.propTypes = {
  preference: PropTypes.object,
  domain: PropTypes.array,
  setPreference: PropTypes.func
};
