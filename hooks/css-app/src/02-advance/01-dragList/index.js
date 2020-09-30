import React from 'react'

import "./dragList.css"

import useDraggable from './useDraggable'


const list = [
    {
      src:
        "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2963416465,4001527064&fm=26&gp=0.jpg",
      title: "冠军"
    },
    {
      title: "亚军",
      src:
        "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3140683318,1993072558&fm=26&gp=0.jpg"
    },
    {
      title: "季军",
      src:
        "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2221913505,3009818890&fm=26&gp=0.jpg"
    }
  ];


  function cls(def, ...conditions) {
    const list = [def];
    conditions.forEach(cond => {
      if (cond[0]) {
        list.push(cond[1]);
      }
    });
    return list.join(" ");
  }  

export default function APP(){

    return(<div className="App">
        <p>DragList Example</p>
        <DraggableList list={list}/>
    </div>)
}

// 这是一个包装层
function DraggableList({list}){


    const {dragList,createDraggerProps,createDropperProps} = useDraggable(list);

  

    return dragList.map((item,i)=>{
        if(item.type==="BAR"){
            return <Bar id={i}  {...createDropperProps(i)} key={item.id} />;
        }else{
            return <Draggable  {...createDraggerProps(i, item.id)}>
                <Card {...item.data}/>
            </Draggable>
        }
    })
}


function Draggable({children, eventHandlers, dragging, id}){
    return  (
    <div
        {...eventHandlers} 
        draggable={true}    
        className={cls("draggable", [dragging === id, "dragging"])}
    >
        {children}
    </div>
    );
}

function Bar({ id, dragging, dragOver, eventHandlers }){
    if (id === dragging + 1) {
        return null;
    }

    return (
    <div 
        {...eventHandlers}
        className={cls("draggable--bar", [dragOver === id, "dragover"])}
    >
      <div
        className="inner"
        style={{
          height: id === dragOver ? "80px" : "0px"
        }}
      />
    </div>
    );
}


function Card({src,title}){
    return <div className="card">
        <img src={src}></img>
        <span>{title}</span>
    </div>

}