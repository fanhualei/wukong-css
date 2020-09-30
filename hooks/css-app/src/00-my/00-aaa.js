import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useHistory
} from "react-router-dom";

export default()=>{
    let { path, url } = useRouteMatch();
    return(
        <Router>
            <Switch>
                <Route exact path={url}>
                    <Home url={url} />
                </Route>
                <Route path={url+`/table`}>
                    <Table/>
                </Route>
            </Switch>

            <Route path={url+`/table`}>
                <Dialog/>
            </Route>
        </Router>  
    )
}


function Home({url}){
    return(<div>
        <h2>Home : {url}</h2>
        <Link to={url +`/table`}>table</Link>
    </div>);
}


function Dialog(){
    return(<div
        style={{
            position: "absolute",
            top: 50,
            left: 50,
            bottom: 0,
            right: 0,
            background: "rgba(0, 0, 0, 0.45)"
          }}
    >
        <h2>Dialog</h2>
    </div>);
}


function Table(){
    let history = useHistory();
    const goBack=()=>{
        console.log("dddddddddddddddddd")
        // e.stopPropagation();
        history.goBack();
    }

    return(<div>
        <h2>Table</h2>
        <button onClick={()=>goBack()}>dddd</button>
    </div>);
}