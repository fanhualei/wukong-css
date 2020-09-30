import React, { useState, useEffect } from 'react'
export default()=>{

    const [count,setCount]=useState(0);

    function myEffect(){
       const I= setInterval(()=>{
            console.log(count)
            setCount(x=>x+1);
        },1000);

       return ()=>clearInterval(I); 
    }

    useEffect(myEffect,[count]);

    return(<div>
        <p>useEffect example</p>
        <p>count:{count}</p>
    </div>)
}