import React, { useEffect, useState } from 'react'

const RandomUser = ({ onStyle}) => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

     

    const fetchUser = async () => {
        try {
            setLoading(true);
            const res = await fetch('https://randomuser.me/api/');
            const data = await res.json();
            console.log(data, 'api data');
            setUsers([data.results[0]]);

        } catch (err) {
            console.log('Error while fetching data', err);
        }
        finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchUser();
    }, []);

   

    return (
        <div className='container d-flex justify-content-center align-items-center flex-column py-3' style={onStyle}>


            <h2 className='text-center'>Random User Data</h2>
            {loading ? (
                <div className="text-center">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                    </div>

                    ) : (
                    <div>
                        {users.map((user, id) => (
                            <div className='card-title' key={id}>
                                <img src={user.picture.large} alt='user' />
                                <h3 className='fw-bold'>
                                    {user.name.title} {user.name.first} {user.name.last}

                                </h3>
                                <div className='card-body'>
                                    <p className='fw-bold'>  {user.email} </p>

                                </div>

                            </div>

                        ))}

                    </div>
            )}

                    <button className='btn btn-primary ' onClick={fetchUser}>Fetch User</button>

                </div>
            )
}

            export default RandomUser