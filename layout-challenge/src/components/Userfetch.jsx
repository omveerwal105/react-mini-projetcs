import React, { useEffect, useState } from 'react';

const Userfetch = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchUser, setSearchUser] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch('https://jsonplaceholder.typicode.com/users');
        const data = await res.json();
        setUsers(data);
      } catch (err) {
        console.log('Error while fetching the data', err);
        setError('Failed to fetch users');
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const groupedUsers = (users) => {
    return users.reduce((acc, user) => {
      const company = user.company.name;
      if (!acc[company]) {
        acc[company] = [];
      }
      acc[company].push(user);
      return acc;
    }, {});
  };

  const filtered = users.filter((user) => {
    const search = searchUser.toLowerCase();
    return (
      user.name.toLowerCase().includes(search) ||
      user.username.toLowerCase().includes(search)
    );
  });

  return (
    <div className='container'>
      <h2 className="my-3">Fetch Users</h2>

      <input
        type="text"
        placeholder="Search by name or username"
        className="form-control mb-4"
        value={searchUser}
        onChange={(e) => setSearchUser(e.target.value)}
      />

      {loading && <p>Loading...</p>}
      {error && <p className='text-danger'>{error}</p>}

      {!loading && !error &&
        Object.entries(groupedUsers(filtered)).map(([company, users]) => (
          <div className='card mb-3' key={company}>
            <div className='card-header'>
              <h4>{company}</h4>
            </div>
            <ul className='list-group list-group-flush'>
              {users.map((u) => (
                <li className='list-group-item' key={u.id}>
                  {u.name} ({u.username}) - {u.email}
                </li>
              ))}
            </ul>
          </div>
        ))}
    </div>
  );
};

export default Userfetch;
