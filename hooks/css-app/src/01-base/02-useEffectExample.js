import React, { useState, useEffect } from 'react';

export default function ExampleA(){

    const [count,setCount]=useState(0);

    useEffect(()=>{
        document.title = `You clicked ${count} times`;
    })

    return(<div>
        <p>clicked count :{count}</p>
        <button onClick={()=>setCount(count+1)}>click me</button>
    </div>)

}