import React, { useState, useCallback } from 'react'


export default()=>{

    const [count,setCount]=useState(0);
    // 这是一个错误的例子
    const inf = useCallback(()=>{
        setCount(count+1);
    },[count>3]);

    return(<div>
        <p>{count}</p>
        <button onClick={inf} > click me</button>
    </div>);

}