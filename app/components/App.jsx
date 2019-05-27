import React, { createContext, useState, useEffect } from 'react';
import { getInfo, turnAllOn, turnAllOff } from '../api/HueApi';
import RefreshButton from './RefreshButton';
import LightGroupForm from './LightGroupForm';
import useInterval from '../hooks/useInterval';

const HueStatusUpdate = createContext(null);

function App() {
  const [hueStatus, setHueStatus] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  function refreshHue() {
    setIsLoading(true);
    getInfo()
      .then(res => setHueStatus(res))
      .finally(() => setIsLoading(false))
      .catch(e => console.log(e));
  }

  useEffect(() => {
    refreshHue();
  }, []);

  useInterval(refreshHue, 10000);

  function onTurnAllOn() {
    turnAllOn()
      .then(() => refreshHue())
      .catch(e => console.log(e));
  }

  function onTurnAllOff() {
    turnAllOff()
      .then(() => refreshHue())
      .catch(e => console.log(e));
  }

  return (
    <HueStatusUpdate.Provider value={refreshHue}>
      <div className="container">
        <div className="row">
          <div className="col">
            <h1 className="h2">Hue Dashboard</h1>
            {(!hueStatus || !hueStatus.groups) && (
              <div className="alert alert-danger" role="alert">
                <h2 className="h4 alert-heading">No Hue lights available</h2>
                <p>If you are seeing this, something went wrong!</p>
              </div>
            )}
          </div>
        </div>
        {hueStatus && hueStatus.groups && (
          <>
            <div className="row refresh">
              <div className="col">
                <RefreshButton isLoading={isLoading} />
              </div>
            </div>
            <div className="row allLights">
              <div className="col">
                <p className="h6">All Lights</p>
                <div className="btn-group btn-group-toggle">
                  <button
                    className="btn btn-secondary"
                    type="button"
                    onClick={() => onTurnAllOn()}
                  >
                    On
                  </button>
                  <button
                    className="btn btn-secondary"
                    type="button"
                    onClick={() => onTurnAllOff()}
                  >
                    Off
                  </button>
                </div>
              </div>
            </div>
            <LightGroupForm hueStatus={hueStatus} />
          </>
        )}
      </div>
    </HueStatusUpdate.Provider>
  );
}

App.propTypes = {};

App.displayName = 'App';

export default App;
export { HueStatusUpdate };
