# 用户登陆



# 1. 分析与设计



## 1.1 需求描述

假设用例描述如下（实际用例描述要详细的多）：

* 可以通过用户名登陆
* 可以通过手机号+验证码登陆
* 可以通过第三方登陆
* 也可以注册



## 1.2 UI设计



### ① 总体布局

* 由于登陆、注册或者错误提示，都会使用到公用的部分。
  * 所以这部分页面单独做了一个模板，也就是红色以外的部分。
* 中间区域有一个切换的地方，所以把自动登陆一下作为公用部分。

![](imgs/example-login.png)



### ② 页面规划

使用到的ant组件：

* Tabs,Form, Input, Button, Checkbox, Row,Col
* @ant-design/icons  图标

总体规划：

 * 整个区域的子组件靠左，因为父组件是居中。
   	* text-align: left;
 * [忘记密码]  [注册账户] 浮动到右边。
   	* float: right;
 * 除了使用浮动功能，还可以使用Row与Col组件
   	* [获取验证码]就使用了Row与Col组件
      	* 使用Row组件的好处是在不同屏幕尺寸在可以自动放缩，缺点是写的代码多。



![](imgs/example-login-user.png)



![](imgs/example-login-mobile.png)





> 使用Row或者样式的代码

```tsx
              <Input
                prefix={<MailTwoTone className={styles.prefixIcon} />}
                placeholder="验证码"
                style={{
                  width: '65%',
                  marginRight: 10,
                }}
              />
              <Button
                style={{
                  float: 'right',
                }}
              >
                获取验证码
              </Button>
```

```tsx
              <Row gutter={8} justify="end">
                <Col span={16}>
                  <Input
                    prefix={<MailTwoTone className={styles.prefixIcon} />}
                    placeholder="验证码"
                  />
                </Col>
                <Col span={8} className={styles.captcha_button}>
                  <Button>获取验证码</Button>
                </Col>
              </Row>
```



### ③ 页面逻辑

> 两个Tab页面，如果取消某个的输入

通过if来显示不同的控件，以及输入内容。



> 验证码的操作

* 初始化状态，可以点击获取验证码按钮。
* 点击获取验证码按钮
  * 状态变成倒计时:使用了`Statistic统计数值`控件
    * 这个控件可以设置结束时间，当时间到了之后，会触发`onFinish`函数，这时候将状态设置回去。
  * 为了测试用，显示一个`message`提示信息。





## 1.3 运行配置-app.tsx

UMI默认的一个运行配置，具体运行时配置，[见这个文档](https://umijs.org/zh-CN/docs/runtime-config)。

antDesignPro的app.tsx主要用到了下面的内容：

* [生产和消费初始化数据:getInitialState()](https://umijs.org/zh-CN/plugins/plugin-initial-state)
  * 布局的配置
  * 当前用户信息
  * 得到当前用户信息

* layout:[默认使用了proLayout](https://procomponents.ant.design/components/layout)
  * onPageChange:页面改变时，进行逻辑判断
  * 设置头部、左边框、底部
  * 设定页面的样式
* [网络请求和错误处理方案](https://umijs.org/zh-CN/plugins/plugin-request)
  * 错误处理
  * 拦截器
  * 

## 1.4 网络请求

`@umijs/plugin-request` 基于 [umi-request](https://github.com/umijs/umi-request) 和 [ahooks](http://ahooks.js.org/hooks) 的 `useRequest` 提供了一套统一的网络请求和错误处理方案。



### 1.4.1 主要接口

#### ① useRequest

该插件内置了 [@ahooksjs/use-request](https://ahooks.js.org/zh-CN/hooks/async)，你可以在组件内通过该 Hook 简单便捷的消费数据。示例如下：

```typescript
import { useRequest } from 'umi';

export default () => {
  const { data, error, loading } = useRequest(() => {
    return services.getUserList('/api/test');
  });
  if (loading) {
    return <div>loading...</div>;
  }
  if (error) {
    return <div>{error.message}</div>;
  }
  return <div>{data.name}</div>;
};
```

更多配置你可以参考 [@ahooksjs/use-request](https://ahooks.js.org/zh-CN/hooks/async) 的文档，你也可以查看知乎专栏文章[《useRequest- 蚂蚁中台标准请求 Hooks》](https://zhuanlan.zhihu.com/p/106796295)了解 useRequest。



#### ② request

通过 `import { request } from 'umi';` 你可以使用内置的请求方法。 `request` 接收两个参数，第一个参数是 `url`，第二个参数是请求的 `options`。`options` 具体格式参考 [umi-request](https://github.com/umijs/umi-request)。

`request` 的大部分用法等同于 `umi-request`，一个不同的是 `options` 扩展了一个配置 `skipErrorHandler`，该配置为 `true` 是会跳过默认的错误处理，用于项目中部分特殊的接口。

示例如下：

```typescript
request('/api/user', {
  params: {
    name: 1,
  },
  skipErrorHandler: true,
})
```

#### ③ 拦截器-token

该配置接收一个数组，数组的每一项为一个 request 拦截器。等同于 umi-request 的 `request.interceptors.request.use()`。具体见 umi-request 的[拦截器文档](https://github.com/umijs/umi-request#interceptor)。







### 1.4.2 统一返回格式

错误处理是所有项目都会遇到的问题，我们约定了一个接口格式规范如下：

```typescript
interface ErrorInfoStructure {
  success: boolean; // if request is success
  data?: any; // response data
  errorCode?: string; // code for errorType
  errorMessage?: string; // message display to user 
  showType?: number; // error display type： 0 silent; 1 message.warn; 2 message.error; 4 notification; 9 page
  traceId?: string; // Convenient for back-end Troubleshooting: unique request ID
  host?: string; // onvenient for backend Troubleshooting: host of current access server
}
```

后端接口规范不满足的情况下你可以通过配置 `errorConfig.adaptor` 来做适配。



#### ① 疑问：成功是否用这个接口？

如果在看有些API返回值，不管是错误还是成功，都用这个接口，只不过通过`success`来做判断。

当然，有些系统只有错误才使用这个接口规范，通过捕获异常，来让系统处理。

所以，需要专门讨论这个问题？



#### ②后端相应的改进

springboot提供的错误返回值，要做相应的处理。

详细内容见：[详细配置文档](https://umijs.org/plugins/plugin-request)

> wukong的错误返回值

```json
{
    "timestamp": "2018-05-24T06:31:51.423+0000",
    "status": 500,
    "error": "Internal Server Error",
    "message": "para1.name: 长度需要在6和50之间, para1.email: 不是一个合法的电子邮件地址",
    "path": "/result/para"
}
```



### 1.4.3 默认错误处理

antDesignPro使用自定义错误处理，我看了UMI的文档，实际antPro的错误还没有默认的错误处理机制好。

默认的错误处理机制有如下好处：

* 可以定时是否要提示。
* 可以定义要跳转的页面



```typescript
export enum ErrorShowType {
  SILENT = 0, // 不提示错误
  WARN_MESSAGE = 1, // 警告信息提示
  ERROR_MESSAGE = 2, // 错误信息提示
  NOTIFICATION = 4, // 通知提示
  REDIRECT = 9, // 页面跳转
}
```



### 1.4.4 自定义错误处理

当然如果感觉默认的错误提示不详细，可以使用自定错误处理机制，建议在antPro的基础上进行修改。

```typescript
const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  405: '请求方法不被允许。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

const errorHandler = (error: ResponseError) => {
  const { response, data } = error;

  console.log(data);
  if (response && response.status) {
    let errorText = codeMessage[response.status] || response.statusText;
    const { status, url } = response;
    if (data && data.errorMessage) {
      errorText = data.errorMessage;
    }
    notification.error({
      message: `请求错误 ${status}: ${url}`,
      description: errorText,
    });
  }
  if (!response) {
    notification.error({
      description: '您的网络发生异常，无法连接服务器',
      message: '网络异常',
    });
  }
  throw error;
};

export const request: RequestConfig = {
  errorHandler,
};
```



### 1.4.5 页面中捕获错误

使用`try` 来捕获错误，并且使用`const { response, data } = error`，来得到错误的内容

```typescript
  const fetchUserInfo = async () => {
    try {
      const currentUser = await queryCurrent();
      return currentUser;
    } catch (error) {
      console.log(error);
      const { response, data } = error;
      console.log(response);
      console.log(data);
      history.push('/user/login');
    }
    return undefined;
  };
```





### 1.4.6 Jwt的token

①②③④⑤⑥⑦⑧⑨

#### ① 得到token

通过login得到token



#### ② 将token保存到缓存



```js
const tokenKey = 'wk-token';
const autoLoginKey = 'wk-autoLogin';

/**
 * 设置自动登录装填
 * @param autoLogin
 */
export function setAutoLogin(autoLogin) {
  return localStorage.setItem(autoLoginKey, autoLogin);
}

/**
 * 得到是否自动登录
 * @returns {boolean}
 */
export function getAutoLogin() {
  const value = localStorage.getItem(autoLoginKey);
  if (typeof value === 'undefined') {
    return false;
  }
  if (value === 'true') {
    return true;
  }
  return false;
}

/**
 * 得到token 如果是自动登录，那么就从local得到session
 * @returns {string}
 */
export function getToken() {
  localStorage.getItem(tokenKey);
  if (getAutoLogin()) {
    return localStorage.getItem(tokenKey);
  }
  return sessionStorage.getItem(tokenKey);
}

/**
 * 清空token
 */
export function clearnToken() {
  localStorage.removeItem(tokenKey);
  sessionStorage.removeItem(tokenKey);
}

/**
 * 设置token，如果没有自动登录，那么就设置到session，当关闭浏览器，就不会自动登录
 * @param token token
 */
export function setToken(token) {
  clearnToken();
  if (getAutoLogin()) {
    localStorage.setItem(tokenKey, token);
  } else {
    sessionStorage.setItem(tokenKey, token);
  }
}
```

> 上面有一个隐患

网上有人说：`sessionStorage` 当打开一个新的页面时候，会消失



> 我试着将token保存到



#### ③ 设置headers

```typescript
export const request: RequestConfig = {
  errorHandler,
  headers: {
    Authorization: `123456789`,
  },
};
```



#### ④ 刷新token

通过request 拦截器来进行处理

### 1.4.7 request 拦截器

requestInterceptors该配置接收一个数组，数组的每一项为一个 request 拦截器。等同于 umi-request 的 `request.interceptors.request.use()`。具体见 umi-request 的[拦截器文档](https://github.com/umijs/umi-request#interceptor)。

```
可以拦截下来，去刷新一个新的token
```

> 参考文档

* [做jwt拦截器](https://github.com/ant-design/ant-design-pro/issues/7225)

  

> 例子代码

```typescript
import { ResponseError, RequestOptionsInit } from 'umi-request';
const requestInterceptors = (url: string, options: RequestOptionsInit) => {
  console.log('---------------------------');
  console.log(url);
  console.log(options);
  return {
    url,
    options: { ...options },
  };
};

export const request: RequestConfig = {
  errorHandler,
  headers: {
    Authorization: `123456789`,
  },
  requestInterceptors: [requestInterceptors],
};
```



## 1.5 API调用

有两种调用方法：

* 在service调用，页面调用service
* 在页面中调用。

### 1.5.1 useRequest

还有点问题，data没有得到

```typescript
import {  useRequest } from 'umi';
const { data, error, loading } = useRequest('/api/tags');
  if (loading) {
    return <div>loading...</div>;
  }
  if (error) {
    return <div>{error.message}</div>;
  }
  console.log(data);
  return <div>111:</div>;
```









## 1.6 逻辑设计



### 1.6.1 login

整理一下思路：

* 页面逻辑
  * 点击按钮后调用：异步Service函数
    * 点击按钮后，有一个状态
    * 异步函数有正确返回值，也可能有错误返回值
      * 正常情况下，跳转到上次浏览的页面。或者是首页
      * 错误情况下，提示一个错误提示框。
* Service层
  * 调用Mock API
  * 可能会处理一部分逻辑，大部分都很简单。
* Mock API
  * [可以做一些延迟处理-roadhog-api-doc]([https://pro.ant.design/docs/mock-api-cn#%E5%A6%82%E4%BD%95%E6%A8%A1%E6%8B%9F%E5%BB%B6%E8%BF%9F](https://pro.ant.design/docs/mock-api-cn#如何模拟延迟))



#### ① mock

```ts
  'POST /api/login/account': (req: Request, res: Response) => {
    const { password, username, type } = req.body;
    if (password === 'ant.design' && username === 'admin') {
      res.send({
        status: 'ok',
        type,
        currentAuthority: 'admin',
      });
      access = 'admin';
      return;
    }
    if (password === 'ant.design' && username === 'user') {
      res.send({
        status: 'ok',
        type,
        currentAuthority: 'user',
      });
      access = 'user';
      return;
    }
    if (type === '2') {
      res.send({
        status: 'ok',
        type,
        currentAuthority: 'admin',
      });
      return;
    }

    res.send({
      status: 'error',
      type,
      currentAuthority: 'guest',
    });
    access = 'guest';
  },
      
// 调用 delay 函数，统一处理
export default delay(proxy, 1000);
```

#### ② service

```ts
export interface LoginParamsType {
  username: string;
  password: string;
  mobile: string;
  captcha: string;
  type: string;
  autoLogin: boolean;
}

export async function fakeAccountLogin(params: LoginParamsType) {
  return request<API.LoginStateType>('/api/login/account', {
    method: 'POST',
    data: params,
  });
}
```



#### ③ 页面函数

> Demo的逻辑有点特殊。

* 调用登录函数，返回成功后
  * 调用得到当前用户的函数。
  * 将当前用户填写到一个公用变量中



> 悟空框架的逻辑

* 登录成功后返回token信息与用户信息





#### 

