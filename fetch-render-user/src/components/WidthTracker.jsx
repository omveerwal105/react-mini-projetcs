import React, { useLayoutEffect, useRef, useState } from 'react'

const WidthTracker = () => {
    const [text,setText] = useState('This is a resizable box.');
    const [width ,setWidth] = useState(0);
    const boxRef = useRef(null);

    useLayoutEffect(()=>{
        if(boxRef.current){
            const boxWidth = boxRef.current.getBoundingClientRect().width;
            setWidth(boxWidth);
        }
    },[text]);
  return (
    <div className=' container text-center  mt-4'>
        <h4>Current Width:{Math.round(width)}px</h4>
        <div 
        ref={boxRef}
        className='border p-3 bg-light mx-auto'
        style={{width: 'fit-content' , maxWidth:'100%'}}
        >
            {text}
        </div>
        <div className='my-3'>
            <button
            className='btn btn-primary mx-2'
            onClick={()=>setText(text + "More Text.")}
            >Add</button>
        </div>
        <button
        className='btn btn-danger mx-2'
        onClick={()=>setText(text.slice(0,-10))}
        >Remove</button>
    </div>
  )
}

export default WidthTracker