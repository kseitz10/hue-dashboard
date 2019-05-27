import React, { useContext } from 'react';
import { HueStatusUpdate } from './App';

function RefreshButton({ isLoading }) {
  const refreshHue = useContext(HueStatusUpdate);

  return (
    <div>
      <button
        className="btn btn-sm btn-info"
        type="button"
        onClick={refreshHue}
      >
        {!isLoading && (
          <>
            <i className="fas fa-sync" aria-hidden="true" />
            <span className="sr-only">Refresh</span>
          </>
        )}
        {isLoading && (
          <>
            <i
              className="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"
            />
            <span className="sr-only">Loading...</span>
          </>
        )}
      </button>
    </div>
  );
}

export default RefreshButton;
