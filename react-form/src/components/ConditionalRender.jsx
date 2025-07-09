import React, { useState } from 'react';

const ConditionalRender = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleChange = () => {
    setIsLoggedIn((prev) => !prev);
  };

  return (
    <div>
      {/* Conditionally Render Heading */}
      {isLoggedIn ? <h1>Welcome Back!</h1> : <h1>Please Login</h1>}

      {/* Button */}
      <button onClick={handleChange}>
        {isLoggedIn ? 'Logout' : 'Login'}
      </button>
    </div>
  );
};

export default ConditionalRender;
