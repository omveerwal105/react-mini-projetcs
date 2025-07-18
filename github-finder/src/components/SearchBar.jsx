import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [userName, setUserName] = useState('');

  const handleSearch = () => {
    if (userName.trim() === '') {
      alert('Enter a UserName');
      return;
    }
    onSearch(userName); // ✅ Correct usage
  };

  return (
    <div className='d-flex flex-column align-items-center gap-2 my-4'>
      <input
        className='form-control w-50'
        placeholder='Enter a GitHub UserName'
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      />
      <button className='btn btn-primary' onClick={handleSearch}>
        Search
      </button>
    </div>
  );
};

export default SearchBar;
