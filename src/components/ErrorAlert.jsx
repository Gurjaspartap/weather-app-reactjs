import React from 'react';

function ErrorAlert({ error }) {
  return (
    <div className="error-message text-red-500 mt-4">
      {error}
    </div>
  );
}

export default ErrorAlert;
