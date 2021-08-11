import React, { useContext } from 'react';
import { toggleGroup } from '../api/HueApi';
import { HueStatusUpdate } from './App';

function LightGroup({ group }) {
  const { name, state, id } = group;
  const idString = `group${id}`;
  const refreshHue = useContext(HueStatusUpdate);

  function onChange(groupId, isOn) {
    toggleGroup(groupId, isOn)
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
          htmlFor={`${idString}-on`}
        >
          <input
            name={idString}
            id={`${idString}-on`}
            type="radio"
            checked={state.any_on}
            onChange={() => onChange(id, false)}
          />
          On
        </label>
        <label
          className={`btn btn-secondary ${state.any_on ? '' : 'active'}`}
          htmlFor={`${idString}-off`}
        >
          <input
            name={idString}
            id={`${idString}-off`}
            type="radio"
            checked={!state.any_on}
            onChange={() => onChange(id, true)}
          />
          Off
        </label>
      </div>
    </div>
  );
}

export default LightGroup;
