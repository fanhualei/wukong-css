import React, { useRef } from 'react'


export default function useRefExample(){
    const refInput=useRef();

    const onButtonClick=()=>{
        console.log(refInput)
        refInput.current.focus();
    }

    return(<div>
        <p>useRef Example</p>
        <input ref={refInput}/>
        <button onClick={onButtonClick} >Focus</button>
    </div>);

}