import React, { useContext } from 'react';
import { toggleGroup } from '../api/HueApi';
import { HueStatusUpdate } from './App';

function LightGroup({ group, index }) {
  const { name, state } = group;
  const adjustedIndex = index + 1;
  const groupId = `group${adjustedIndex}`;
  const refreshHue = useContext(HueStatusUpdate);

  function onChange(myIndex, isOn) {
    toggleGroup(myIndex, isOn)
      .then(refreshHue)
      .catch(e => console.log(e));
  }

  return (
    <div
      className={`form-group lightGroup ${
        state.any_on ? 'lightGroup--on' : null
      }`}
    >
      <p className="h6">{name}</p>
      <div className="btn-group btn-group-toggle">
        <label
          className={`btn btn-warning ${state.any_on ? 'active' : ''}`}
          htmlFor={`${groupId}-on`}
        >
          <input
            name={groupId}
            id={`${groupId}-on`}
            type="radio"
            checked={state.any_on}
            onChange={() => onChange(adjustedIndex, false)}
          />
          On
        </label>
        <label
          className={`btn btn-secondary ${state.any_on ? '' : 'active'}`}
          htmlFor={`${groupId}-off`}
        >
          <input
            name={groupId}
            id={`${groupId}-off`}
            type="radio"
            checked={!state.any_on}
            onChange={() => onChange(adjustedIndex, true)}
          />
          Off
        </label>
      </div>
    </div>
  );
}

export default LightGroup;
