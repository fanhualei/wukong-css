import React, { useState, useMemo } from 'react'
import moment from 'moment';

export default()=>{
    const [count,setCount]=useState(0);
    const memorizedText=useMemo(()=>{
        return `this is a memorized test ${moment().format('YYYY-MM-DD HH:mm:ss')}`;
    },[])

    return(<div>
        <p>useMemo example</p>
        <p>{memorizedText}</p>
    <p>you clicked count:{count}</p>
        <button onClick={()=>setCount(count+1)}>clicked me</button>
    </div>);
}