import React, { useState, useEffect, useReducer } from 'react'
import MockJs from 'mockjs'

function request(url,params){
    return new Promise((resole,reject)=>{
        setTimeout(()=>{
            resole(MockJs.mock({
                [`list|1-${params}`]:[{
                    'name':'@cname'
                }]
            }).list.map(x=>x.name)
            );
        },2000)
    })
}

function useRequest(url,params){
    const [data,setData]=useState(null);
    
    const reload=()=>{
        setData(null);
        request(url,params).then(data=>setData(data));
    }
    useEffect(()=>{
        request(url,params).then(data=>setData(data));
    },[])
    return [data,reload];
}

export default ()=>{
    const [data,reload]=useRequest("http://aaa.api",10);
    if(data===null){
        return(<div>loading.....</div>)
    }

    return(<div>
        <p>useRequest Example</p>
        <ul>
            {
                data.map(name=>{
                return(<li key={name}>{name}</li>)
                })
            }
        </ul>
        <div>
            <button onClick={reload}>reload</button>
        </div>
    </div>);
}