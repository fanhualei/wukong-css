import React, { useState, useCallback } from 'react'

const s = new Set();
export default()=>{
    const [count,setCount]=useState(0);
    // function add(){
    //     setCount(count+1);
    // }
    const add=useCallback(()=>{
        setCount(count=>count+1);
    },[]);

    s.add(add);

    console.log(s.size);

    return(<div>
        <p>useCallback example</p>
        <p>you clicked number:{count}</p>
        <button onClick={add}>click me</button>

    </div>);
}