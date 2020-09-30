import React, { useState } from 'react'
import './layout.css'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch,
    Redirect,
    useParams
  } from "react-router-dom";


const HeaderMenu=[
    {
        name:'练习',
        path:'/00-my',
        type:'file',
    },
    {
        name:'基础功能',
        path:'/01-base',
        type:'file',
    },
    {
        name:'高级功能',
        path:'/02-advance',
        type:'dir',
    },
    {
        name:'官方路由示例',
        path:'/03-reactrouter',
        type:'file',
    },
    {
        name:'我的路由示例',
        path:'/04-myRouter',
        type:'file',
    },
];



function getRequest(path){
    if(path==="/02-advance"){
        return require.context(`./02-advance`, true, /index\.js$/);
    }

    if(path==="/03-reactrouter"){
        return require.context(`./03-reactrouter`, false, /\.js$/);
    }

    if(path==="/04-myRouter"){
        return require.context(`./04-myRouter`, false, /\.js$/);
    }
    if(path==="/01-base"){
        return require.context(`./01-base`, false, /\.js$/);
    }

    if(path==="/00-my"){
        return require.context(`./00-my`, false, /\.js$/);
    }


}


function getLeftMenu(path){
    const req=getRequest(path);
    let ren= req.keys().map(key=>{
        const prts = key.replace(/js/g, '').split(/[./]/).filter(x => x)
        const fullpath = path + '/' + prts.join('/')
        const fileName = prts[0]
        return {
            fileName,
            path:fullpath,
            component : req(key).default
        };
    });
    return ren;
}



export default()=>{
    const [currentPath,setCurrentPath]=useState("/00-my");
    return(
    <Router>    
    <div className={`layout`}>
        <header >
            {
                HeaderMenu.map(x=>{
                return(<Link className={'headerLink'} onClick={()=>setCurrentPath(x.path)}  key={x.path} to={x.path}  >{x.name}</Link>)
                })
            }
        </header>
        <Switch>
        <div className={`context`}>
            
            <div className={`menu`}>
                <Menu currentPath={currentPath}/>
            </div>
            <Route path={`${currentPath}/*`}>
            <div className={`container`}>
                <Container currentPath={currentPath}/>
            </div>
            </Route>
        </div>
        </Switch>
        
    </div>
    </Router>
    );
}


function Container({currentPath}){
    let {url} = useRouteMatch();
    const leftMenus=getLeftMenu(currentPath);
    let req1=require(`.${url}`);
    return(
            <React.Fragment>
                {url}  
                <div className={"card"}>
                    <Route key={url} component={req1.default} path={url} />
                </div>
            </React.Fragment>
        ); 
}


function Menu({currentPath}){
    const leftMenus=getLeftMenu(currentPath);
    return(
    <React.Fragment>
        {leftMenus.map((x, i) => {
            return(<Link key={x.fileName} className={"link"} to={currentPath+"/"+x.fileName}  > {x.fileName} </Link>);
        })}   
    </React.Fragment>
    ) ;
}