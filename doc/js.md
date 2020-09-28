# Js&Tc



# 1. Web API

浏览器提供的功能：Bom与Dom





## 1.1 获取元素



### ① 通过ID

```js
var ele=document.getElementById('idName');

//可以打印一个对象的详细
console.dir(ele);
```



### ② 通过TagName

```js
var lis=document.getElementByTagName('li');

//可以打印一个对象的详细
console.log(lis)
```

返回伪数组



### ③ H5新增方法

* 根据类名：getElementByClassName
* 返回第一个：querySelector
  * 参数：`.nav #nav li  `
* 返回多个: querySelectorsAll



### ④ 获取body与html

* body：document.body
* html：document.documentElement



## 1.2 事件基础

* 事件源
* 事件类型
* 事件处理程序

```js
var btn = document.getElementById('btn');
btn.onclick=function(){
	alert("hello function")
}
```



> 移除事件：

```typescript
const fun1 = (e: MouseEvent) => {
  console.log("mouse enter");
};

p.addEventListener("mouseenter", fun1);
p.removeEventListener("mouseenter", fun1);


//也可以配置只执行一次
p.addEventListener("mouseenter", fun1,{once:true});
```







## 1.3 操作元素



### ① 改变元素内容

```js
/*从起始位置到终止位置的内容，但它去除html标签，同时空格和换行也会去掉*/
element.innerText

/*起始位置到终止位置的全部内容,包括html标签,同时保留空格和换行*/
element.innerHTMLs
```

innerText：如果有Html标签，不识别。

innerHTML：建议使用这个，可以输入一个html标签。

除了设置，还可以得到相应的内容。



### ② 改变元素属性

例如改变一个img的src属性。

```js
var img = document.querySelector('img');
img.src = 'imgages/ldh.jpg';
```



### ③ 改变表单属性

* type
* value
* checked
* selected
* disabled

`this` 在函数中，一般指向事件的调用者。



### ④ 修改样式属性

* 样式少
  * 修改style
* 样式多
  * 修改class名称



```js
/*修改style*/
div.style.backgroundColor='red';
div.style.width='12px';
div.style.display='none';

/*修改className*/
div.className = 'message right';

```



```typescript
let p = document.getElementById("#qq");

p.style.fontSize = "12px";

//添加一个class
p.classList.add("a");

// 移除class
p.classList.remove("a", "c");

// 判断是否存在某个class
p.classList.contains("a");
```







> 案例

* 遍历精灵图
  * 京东轮播图右侧的功能入口





# 2.  TS基础



## 2.1 准备环境



* 安装vscode
* 安装nodejs
* 安装TS转换工具包
  * `npm i -g typescipte`
  * 可以输入：`tsc --help`
  * 转换：`tsc hello.ts`
* 执行
  * `node hello.js`
* `ts-node` 将上面两步操作合并成一步
  * 安装：`npm i -g ts-node` 
  * 执行：`ts-node hello.ts`











## 2.2 变量与类型



```typescript
let age: number;

let time: number = 2;
```



### ① 基本数据类型

* number
* string
* boolean
* undefined
  * 表示声明但未赋值的变量值
* null



### ② 对象数据类型







## 2.3 运算符



### ① 算术运算符

`+-*/`

`+`  还可以拼接字符串

`+` 放在字符串前，可以把字符串转成number类型。

### ② 赋值运算符

`=`

### ③ 自增和自减运算符

`++  --`  

### ④ 比较运算符

`> < === !==  >=  <=`



### ⑤ 逻辑运算符

`&&   ||  !`



## 2.4 语句

①②③ ④ ⑤⑥⑦⑧⑨



### ① 条件

```typescript
if (age > 0) {
  console.log("ha ha");
} else if (age < 0) {
  console.log("wu wu");
}
```



### ② 三元

```typescript
let result: number = age > 0 ? 2 : 4;
console.log(result);
```



### ③ 循环

`for while`





# 3. vscode配置



## 3.1 断点调试

[官方说明](https://code.visualstudio.com/docs/typescript/typescript-debugging)



### ①  添加tsconfig.json



```json
{
  "compilerOptions": {
    "target": "es5",
    "module": "commonjs",
    "outDir": "out",
    "sourceMap": true
  }
}
```



### ②  添加 launch.json

使用` (Ctrl+Shift+D) `

```json
{
  // Use IntelliSense to learn about possible attributes.
  // Hover to view descriptions of existing attributes.
  // For more information, visit: https://go.microsoft.com/fwlink/?linkid=830387
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Launch Program",
      "program": "${workspaceFolder}/helloworld.ts",
      "preLaunchTask": "tsc: build - tsconfig.json",
      "outFiles": ["${workspaceFolder}/out/**/*.js"]
    }
  ]
}
```



### ③  保存时自动生成JS

[ts-vscode配置保存ts自动编译生成js](https://blog.csdn.net/Dong_Alex/article/details/103589016)



## 3.2 在浏览器中联调



### ① 安装插件

安装插件 [Debugger for Chrome](https://marketplace.visualstudio.com/items?itemName=msjsdiag.debugger-for-chrome) [extension](https://code.visualstudio.com/docs/editor/extension-gallery). 



### ② 配置`launch.json`



> launch.json

`ulr`可以设置成: http://127.0.0.1:5500/index.html

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "chrome",
      "request": "launch",
      "name": "Launch Chrome against localhost",
      "url": "file:///C:/Users/username/deleteMe/HelloWeb/helloweb.html",
      "webRoot": "${workspaceFolder}"
    }
  ]
}
```



### ③ 执行调式Task

` Launch Chrome against localhost. `

