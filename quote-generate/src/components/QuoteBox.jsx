import React, { useEffect, useState } from 'react'

const QuoteBox = () => {
    const [quote,setQuote] = useState("");

    const fetchQuote = async () => {
        try {
            const res = await fetch("https://api.allorigins.win/get?url=https://zenquotes.io/api/random");
            const data = await res.json();
            const parsedData = JSON.parse(data.contents);
            console.log(parsedData);
            const randomQuote = `${parsedData[0].q} - ${parsedData[0].a}`;
            setQuote(randomQuote);
        }
        catch (error) {
            console.error("error fetching quote:",error);
            setQuote("failed to fecth quote");
        }
    };
    useEffect(()=>{
        fetchQuote();
    },[]);


  return (
    <div className='container py-3'>
        <h2 className='fw-bold text-center'>Random Quote</h2>
        <p >{quote}</p>
        <button className='btn btn-primary'onClick={fetchQuote}>Get a New Quote</button>

    </div>
  )
}

export default QuoteBox