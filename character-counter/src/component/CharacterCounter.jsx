import React, { useState } from 'react'

const CharacterCounter = ({maxLength}) => {
    const [text,setText] = useState('');

    const handleChange = (e) => {
        const value = e.target.value;
        if(value.length <= maxLength){
            setText(value);
        }
    };

    const isLimitExceeded = text.length>=maxLength;
  return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: 'auto' }}>
        <textarea
        value={text}
        placeholder='Type here'
        onChange={handleChange}
        rows={5}
          style={{
          width: '100%',
          borderColor: isLimitExceeded ? 'red' : '#ccc',
          outline: 'none',
          padding: '10px',
          fontSize: '16px',
          resize: 'none'
        }}
        />
          <div style={{ 
        marginTop: '10px', 
        color: isLimitExceeded ? 'red' : 'black',
        fontWeight: isLimitExceeded ? 'bold' : 'normal'
      }}>
        Characters: {text.length} / {maxLength}
      </div>


    </div>
  )
}

export default CharacterCounter