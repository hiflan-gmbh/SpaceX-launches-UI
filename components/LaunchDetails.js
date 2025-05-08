import React from 'react';

function LaunchDetails({ launch }) {
  const status =
    launch.success === true
      ? 'success'
      : launch.success === false
      ? 'failure'
      : 'unknown';

  return (
    <>
      <h2>{launch.name}</h2>
      <p>
        <strong>Status:</strong> {status}
      </p>
      <p>
        <strong>Details:</strong> {launch.details || 'No details available.'}
      </p>
      {!launch.success && launch.failures?.length > 0 && (
        <p>
          <strong>Failure Reason:</strong>{' '}
          {launch.failures.length > 0 && launch.failures[0] && (
            <p>Failure Reason: {launch.failures[0]?.reason}</p>
          )}
        </p>
      )}
    </>
  );
}

export default LaunchDetails;
