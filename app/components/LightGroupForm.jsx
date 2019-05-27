import React from 'react';
import LightGroup from './LightGroup';

export default function LightGroupForm({ hueStatus }) {
  return (
    <form className="row">
      <div className="col">
        <legend>Groups</legend>
        <ul className="list-unstyled">
          {Object.values(hueStatus?.groups).map((group, i) => (
            <li key={group.name}>
              <LightGroup group={group} index={i} />
            </li>
          ))}
        </ul>
      </div>
    </form>
  );
}
