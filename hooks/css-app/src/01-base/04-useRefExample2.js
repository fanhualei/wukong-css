import React, { useState, useRef } from 'react'

export default()=>{
    const [count,setCount]=useState(0);
    const prev=useRef(null);
    return(<div>
        <p>the example for save a value</p>
    <p>curren:{count}</p>
    <p>prev:{prev.current}</p>

    <button onClick={()=>{setCount(count+1);prev.current=count;}}>+</button>
    <button onClick={()=>{setCount(count-1);prev.current=count;}}>-</button>    
    </div>)
}