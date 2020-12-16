## 自定义Layout

①②③④⑤⑥⑦⑧⑨

希望做成下面的样子。

![](imgs/newpage.png)



参考了

![](imgs/newPage2.png)



![](imgs/newPage3.png)



# 1 现有功能逻辑

Pro 中默认会读取 `config/config.tsx` 中的 routes 配置作为 ProLayout 的菜单数据来生成菜单，并且配合 [`plugin-access`](https://umijs.org/plugins/plugin-access) 还可以很方便的进行菜单的权限管理。这个模式可以满足大部分需求，但是业务的复杂度总是在的，有些时候就需要一些高级的用法。



## 1.1 路由

路由必须全部定义吗？ 是不是可以动态的从服务器获取呢？

[看官方的文档，定义路由与约定路由](https://umijs.org/zh-CN/docs/routing)



## 1.2 菜单

有两种定义方式：



### ① 文件定义

`config.ts`来定义。



### ② 服务器定义

[看官方的说明](https://beta-pro.ant.design/docs/advanced-menu-cn)



## 1.3 默认Layout使用

在`app.tsx`初始化数据，

```tsx
export const layout = ({
  initialState,
}: {
  initialState: { settings?: LayoutSettings };
}): BasicLayoutProps => {
  return {
    rightContentRender: () => <RightContent />,
    footerRender: () => <Footer />,
    ...initialState?.settings,
  };
};
```





# 2 自定义Layout



## 2.1 修改config文件

`layout: false`  并设置 `component: '@/layouts/nested'`

```tsx
    // 新的一种布局
    {
      path: '/shop',
      layout: false,
      component: '@/layouts/nested',
      exact: false,
      icon: 'smile',
      routes: []
    }    
```



## 2.2 公用组件

可以引用ant Pro umi的一些组件。例如：

```tsx
//直接引用ProLayout的接口，今后紧跟Pro的规范
import { BasicLayoutProps, ProSettings } from '@ant-design/pro-layout';
import { MenuDataItem } from '@ant-design/pro-layout/lib/typings';

//ant-design的工具类

//根据route来得到menu:
//用法getMenuData(route?.routes || [], menu, formatMessage, menuDataRender)
import getMenuData from '@ant-design/pro-layout/lib/utils/getMenuData';


import useCurrentMenuLayoutProps from '@ant-design/pro-layout/lib/utils/useCurrentMenuLayoutProps';

import compatibleLayout from '@ant-design/pro-layout/lib/utils/compatibleLayout';

import { getBreadcrumbProps } from '@ant-design/pro-layout/lib/utils/getBreadcrumbProps';

//引入ant-design组件
import { Layout, ConfigProvider } from 'antd';
const { Header, Footer, Sider, Content } = Layout;
import { useDeepCompareEffect } from '@ant-design/pro-utils';

//引入umi组件
import { getMatchMenu } from '@umijs/route-utils';
import { useIntl } from 'umi';

//第三方组件
import { stringify } from 'use-json-comparison';
import Omit from 'omit.js';
import useMergedState from 'rc-util/lib/hooks/useMergedState';

//得到页面的大小
import useAntdMediaQuery from 'use-media-antd-query';

//常用工具#####
import { isUrl, isImg } from '@ant-design/pro-utils';

//根据名称，获取Icon的方法
import Icon from '@ant-design/icons';


//自己定义的组件
import MainSider from './MainSider';
import SubSider from './SubSider';
import HeadderContent from './HeaderContent';
import MyFooter from '@/components/Footer';
import RightContent from '@/components/RightContent';
```



 ## 2.3 功能

* 根据route，得到菜单、面包屑列表。
* 根据URL，得到当前选中的菜单列表
  * getMatchMenu matchMenus  matchMenuKeys
  * 

