import React, { useState } from 'react'

const useToggle = (initialValue) => {
    const [show ,setShow] = useState(initialValue);
    const toggler = () => {
        setShow((prev)=>!prev);
    }
  return {show , toggler}
}

export default useToggle