import React, { useState, useEffect } from 'react'

// 停止一段时间
function sleep(time){
    return new Promise((resolve)=>{
        setTimeout(()=>{
            resolve()
        },time)
    });

}

// 构造一个异步函数,模拟从服务器得到person数据
async function fetchPerson(){
    await sleep(2000);
    return ['a','b','c'];
}

// 自定义钩子程序，从服务器得到数据，然后填到list中。
function usePerson(){
    const [list,setList]=useState(null);
    async function request(){
        const response =await fetchPerson();
        setList(response);
        
    };
    useEffect(()=>{
        request();
    },[]);
    return list;
}

//如果正在取数据，那么就显示loading,取到数据，就显示一个列表
export default()=>{
    const list = usePerson();

    if(list === null){
        return (<div>loading</div>)
    }


    return(<div>
       {list.map((value,index)=>
            <li key={index}>{value}</li>
       )}
    </div>)
}


