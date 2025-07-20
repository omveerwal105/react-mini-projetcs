const Card = ({ title, description, image, onClick }) => {
  return (
    <div className='d-flex justify-content-center align-items-center'>
      <div className='card' style={{ width: '18rem' }}>
        <img src={image} className='card-img-top' alt={title} />
        <div className='card-body'>
          <h5 className='card-title'>{title}</h5>
          <p className='card-text'>{description}</p>
          <button className='btn btn-primary' onClick={onClick}>
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
};
