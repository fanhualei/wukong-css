import React, { useEffect, useContext } from 'react';
import { useState } from 'react';


// 存储颜色的对象
const themes = {
  light: {
    foreground: "#000000",
    background: "#eeeeee"
  },
  dark: {
    foreground: "#ffffff",
    background: "#222222"
  }
};


// 第一步：要创建一个context
const ThemeContext = React.createContext({
  theme: themes.light,
  toggle: ()=>{}
});


const getThemeContextValue=(theme,setTheme)=>{
  return {
    theme,
    toggle: ()=>{
      setTheme(theme===themes.light? themes.dark:themes.light);
    }
  }
}


// 默认页面,不想将参数一层一层传递到 button
export default()=>{
  
  const [theme,setTheme] = useState(themes.light);

  //第二步：在最上层来包含一个父组件
  return (
    <ThemeContext.Provider value={getThemeContextValue(theme,setTheme)}>
      <Toolbar />
    </ThemeContext.Provider>
  );
};



const Toolbar=()=>{
  return(
    <ThemedButton/>
  );
};


// 最底层的按钮
const ThemedButton=()=>{
  // 第三步使用
  const context = useContext(ThemeContext);
  return(
    <button style={{
      fontSize: "32px",
      color: context.foreground,
      backgroundColor: context.theme.background
    }}

    onClick ={context.toggle}
    >click me</button>
    
    );
};