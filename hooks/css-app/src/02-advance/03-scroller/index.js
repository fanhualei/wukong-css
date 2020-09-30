import React, { useState, useEffect } from 'react';
import './styles.css'


const imgs = [
    "http://5b0988e595225.cdn.sohucs.com/images/20190724/a801831af3c743a4b97e443121f44f30.jpeg",
    "https://th.bing.com/th?id=OIP.qsPu-MfQrZdhoLjWf0SDKwHaEo&pid=Api&rs=1",
    "https://th.bing.com/th?id=OIP.R_mn8O9thXZN4aXRk5XKJgHaEo&pid=Api&rs=1"
  ];


function  useTimes(callback,speed){
    useEffect(()=>{
        const startTime = new Date().getTime();
        const I = setInterval(()=>{
            const diff = new Date().getTime() - startTime;
            const times = Math.floor(diff/speed);
            callback(times);
        },speed)
        return(()=>{
            clearInterval(I)
        })

    },[]);
}


function useGetImgIndex(N,speed=3000){
    const [imgIndex,setImgIndex]=useState(0);
    useTimes((times)=>{
        setImgIndex(times%N)
    },speed);
    return imgIndex;
}  

export default()=>{

    const imgIndex=useGetImgIndex(imgs.length);
    return(
    <div className="scroller">
        <div 
            className="inner"
            style={{
                width: `${imgs.length*100}%`,
                transform: `translateX(-${(100/imgs.length)*imgIndex}%)`
            }}
        >
            {
                imgs.map(src=>{
                    return(
                        <img 
                            style={{
                                width: `${100/imgs.length}%`
                            }}
                            key={src}
                            src={src}
                        />
                    );
                })
            }            
        </div>
    </div>
    );

}
