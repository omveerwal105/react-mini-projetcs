import React, { useState } from 'react';

const Layout = () => {
    const [darkMode ,setDarkMode] = useState(false);

    const toggle = () => {
        setDarkMode((prev)=>!prev);
    }
  return (
    <div className={`container mt-2 d-flex flex-column align-items-center justify-content-center ${darkMode ? 'bg-dark text-light' : 'bg-light text-dark'}`}>
        <button className='btn btn-primary mb-3 ' onClick={toggle}>{darkMode ? 'Change to light' : 'Change to dark'}</button>
      <div className="row">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="col-12 col-md-4 mb-4">
            <div className="card h-100">
              <img
                src="https://via.placeholder.com/300"
                className="card-img-top"
                alt={`Card ${i + 1}`}
              />
              <div className="card-body">
                <h5 className="card-title">Card Title {i + 1}</h5>
                <p className="card-text">Short description for card {i + 1}.</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Layout;
