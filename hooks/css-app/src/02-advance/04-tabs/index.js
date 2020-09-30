import React, { useState, useEffect } from 'react'
import './styles.css'


const useRequest=(url,delay=3000)=>{
    const [{data,loading,inited},setState]=useState({
        loading:true,
        inited:false,
        data:null
    });

    useEffect(()=>{
        const I = setInterval(()=>{
            setState(prev=>{
                return {
                    ...prev,
                    loading:false,
                    data:['apple','orangle','banana']
                }
            })
        },delay);

        return(()=>{
            clearInterval(I)
        });

    },[]);

    return {data,loading,inited};
}


// 一个动画的效果，进入的时候全部透明，过了300后显示不透明
const useAnimation=({className,delay=300})=>{
    const [state,setState]=useState('enter');
    useEffect(()=>{
        const I = setInterval(()=>{
            setState("entered")
        },delay);
        return(()=>{
            clearInterval(I);
        })

    },[])
    return `${className}-${state}`;
}


const Page=({children})=>{
    const animationClass = useAnimation({
        className: 'page'
    });
    const {data,loading,inited} = useRequest("http://www.baidu.com");

    if(loading){
        return(<div className={`page ${animationClass}`}>loading</div>);
    }
    return(
        <div className={`page ${animationClass}`}>
            {children}
            <ul>
                {data.map((v,k)=>{
                    return(<li key={k}>{v}</li>)
                })}
            </ul>
        </div>
    );
}

//必须大写开头
const  Page1=()=>{
    return(<Page>page1</Page>);
}
const  Page2=()=>{
    return(<Page>page2</Page>);
}
const  Page3=()=>{
    return(<Page>page3</Page>);
}

function Tabs({options,onTabClicked}){
    return(<div className="tabs">
        {
            options.map((item,i)=>{
                return(<div  
                            onClick={()=>onTabClicked(item.key)}  
                            className="tabs-item"  
                            key={i} >
                                {item.title}
                        </div>);
            })
        }
    </div>);
}

const tabsArray=[
    {
        title: '页面1',
        key: 'page1'
    },
    {
        title: '页面2',
        key: 'page2'
    },
    {
        title: '页面3',
        key: 'page3'
    }
];

export default()=>{
    const [tabKey,setTabKey] = useState("page1");

    const onTabClicked=(key)=>{
        setTabKey(key)
    }

    return(
        <div className={"tabsPage"}>
            <header>Tabs Example</header>
            {tabKey==="page1" && <Page1/>}
            {tabKey==="page2" && <Page2/>}
            {tabKey==="page3" && <Page3/>}
            <Tabs options={tabsArray} onTabClicked={onTabClicked}/>
        </div>
    );
}