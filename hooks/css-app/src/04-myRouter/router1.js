import React from 'react'
import {
    BrowserRouter as Router, 
    Link, 
    Switch,
    Route,
    useRouteMatch,
    useParams,
    useLocation
} from 'react-router-dom'


export default()=>{
    return(<div>
        <p>Router Example</p>
        <Router>
            <Link to="/about">about</Link>
            <Link to="/home">  home</Link>
            <Link to="http://www.baidu.com">  baidu</Link>
            <Link to="/topics?name=qqq">  topics</Link>
            <div>---------------------</div>
            <Switch>
                <Route path="/home">
                    <Home/>
                </Route>
                <Route path="/about" component={About}>
                    {/* <About/> */}
                </Route>
                <Route path="/topics">
                    <Topics/>
                </Route>                
            </Switch>
        </Router>
    </div>)
}

function Home(){
    return(<h2>home</h2>)
}


function About(){
    return(<h2>about</h2>)
}

function Topics(){
    let match = useRouteMatch();
    // console.log(match)
    
    return(<div>
       <h2>topics</h2>
       <ul>
           <li>
               <Link to={`${match.url}/compenents`}>compenents</Link>
           </li>
       </ul>

       <Switch>
           <Route path={`${match.url}/:topicId`} query={{id:123}}>
               <Topic/>
           </Route>
       </Switch>
    </div>)

}


function Topic(aaa){
    console.log(aaa)
    let paras=useParams();
    console.log(paras)
    let match = useRouteMatch();
    console.log(match)
    const location = useLocation();
    console.log(location);
    return <h3>Requested topic ID: {paras.topicId}</h3>;
}