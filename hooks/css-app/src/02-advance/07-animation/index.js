import React, { useEffect, useState } from 'react'
import './animation.css'

function useAnimation(_clsName,duration=3000){
    const [phase,setPhase]=useState(0);
    const [className,setClassName]=useState(_clsName);

    function play(){
        setPhase(1);
    }

    useEffect(()=>{
        if(phase===1){
            setClassName(_clsName+" "+ _clsName+"-start");
            setTimeout(()=>{
                setClassName(_clsName)
                setPhase(0)
            },duration)
        }
        return(()=>{})
    },[phase]);

    return [className,play]
}

export default ()=>{
    const [className,play]=useAnimation('box')
    return(<div>
        <p>animation Example</p>
        <div className={className}/>
        <div>
            <button onClick={play}>play</button>
        </div>
    </div>)
}
