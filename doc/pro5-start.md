# Pro5 



# 1. 快速开始



## 1.1 安装

[参考文档](https://beta-pro.ant.design/docs/getting-started-cn)

```cmd
yarn create umi
```

推荐使用 [tyarn](https://www.npmjs.com/package/tyarn) 来进行包管理，可以极大地减少 install 的时间和失败的概率，并且完全兼容 npm。



## 1.2 常用方法



```shell
#安装组件
yarn install

#启动程序
yarn start

#分析组件
yarn analyze

#查看你的代码有哪些问题: lint:fix 会自动修复代码
yarn lint 

#打包
yarn build
```



# 2. 从0开始

假设从umi开始，构建整个antPro框架。



## 2.1 加入布局



### 2.1.1 全局布局

[ProLayout - 高级布局官方说明](https://procomponents.ant.design/components/layout)

这里有一个坑，如果用UMI来生成项目，那么使用的`pro-layout`版本比较低，需要参考`antPro5`中的版本，使用最新的`pro-layout`。

#### ① 基本配置

比如想要 ant-design-pro 的布局。在配置文件中添加：

这个方法好像不太灵活。

```diff
import { defineConfig } from 'umi';
export default defineConfig({
+ layout: {},
  routes: [
    { path: '/', component: '@/pages/index' },
  ],
});
```



#### ② 添加404

在配置文件中添加：

```json
    {
      component: './404',
    },
```

在`pages`中添加`404.tsx`文件，具体内容省略



#### ③ 添加Footer与Header

[自定义页脚](https://procomponents.ant.design/components/layout#自定义页脚)

有两种方法：

* 单独做一个layout，来实现。
* 使用app.tsx扩展能力来实现。

### 2.1.2 局部布局

例如：为login添加Layout

在`user`目录下，建立`login regist`目录，但是在`user`下有很多相同的内容，所以要做一个统一的样式。



#### ① 取消默认Layout

配置`loyout:false`

```json
    {
      path: '/user',
      layout: false,
      routes: [
        {
          name: 'login',
          path: '/user/login',
          component: '@/pages/user/login/index',
        },
      ],
    },
```



#### ②  创建特有Layout

[官方文档](https://umijs.org/zh-CN/docs/convention-routing#动态路由) , 目录下有 `_layout.tsx` 时会生成嵌套路由。



①②③④⑤⑥⑦⑧⑨

#### ③ 配置路由

这里要配置`exact: false,`  同时要单独配置一个 `404`的页面，这个页面可以重用。

```json
      path: '/user',
      layout: false,
      component: '@/pages/user/_layout',
      exact: false,
      routes: [
        {
          name: 'login',
          path: '/user/login',
          component: '@/pages/user/login/index',
        },
        {
          component: './404',
        },
      ],
    },
```



## 2.2 运行时配置

运行时配置和配置的区别是他跑在浏览器端，基于此，我们可以在这里写函数、jsx、import 浏览器端依赖等等，注意不要引入 node 依赖。[参考文档](https://umijs.org/zh-CN/docs/runtime-config)

约定 `src/app.tsx` 为运行时配置。

### 2.2.1 应用点

* 修改路由：patchRoutes
* 覆盖渲染：render
  * 比如用于渲染之前做权限校验
  * 请求服务端根据响应动态更新路由
* 路由切换：onRouteChange
  * 埋点统计
  * 设置标题

### 2.2.2 插件

[官网地址](https://umijs.org/zh-CN/plugins/preset-react)

* 权限管理
* 统计管理
  * 百度
  * google
* 初始化数据管理
  * 导出 `getInitialState` 方法时启用

### 2.2.3 自定义插件

[官网说明](https://umijs.org/zh-CN/guide/plugin-develop)











## 2.3 添加菜单



### 2.3.1 手工添加





### 2.3.2 自动添加





# 3. CSS

做前端CSS是绕不过去的。

> 重要的知识点

* less
* flex布局
* 媒体查询布局
* css模块化
  * 公用CSS
  * 引用组件CSS
  * 覆盖组件CSS

> 心得体会

* antPro Demo的css写的一般，可以参考
* 要重点了解antPro中一些可以公用的CSS
* `vscode`中，使用逗点，可以自动出现下拉框，把less文件中的css显示出来。

