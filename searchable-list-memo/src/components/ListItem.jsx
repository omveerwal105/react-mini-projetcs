import React from 'react';

const ListItem = React.memo(({ name }) => {
  return (
    <div className="card mx-auto mt-2 shadow-sm w-75">
      {name}
    </div>
  );
});

export default ListItem;
