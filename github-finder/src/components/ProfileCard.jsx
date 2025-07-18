import React from 'react';

const ProfileCard = ({ profile }) => {
  return (
    <div className='card mx-auto' style={{ maxWidth: '500px' }}>
      <img
        src={profile.avatar_url}
        alt={profile.login}
        className='card-img-top'
        style={{ height: '400px', objectFit: 'cover' }}
      />
      <div className='card-body text-center'>
        <h3>{profile.name || profile.login}</h3>
        {profile.bio && <p className="text-muted">{profile.bio}</p>}
      </div>
      <a
        href={profile.html_url}
        target='_blank'
        rel='noreferrer'
        className='btn btn-outline-primary mt-3 mx-auto w-50'
      >
        Visit GitHub
      </a>
    </div>
  );
};

export default ProfileCard;
