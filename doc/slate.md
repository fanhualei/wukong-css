# Slate 新征程



# 1. 参考文档

* 官方文档

  * [中文文档](https://www.yuque.com/jacob.lcs/slatejs/uazemv)
  * 英文
    * [文档](https://docs.slatejs.org/)
    * [代码](https://github.com/ianstormtaylor/slate)
    * [例子](https://www.slatejs.org/examples/richtext)

* 工具

  * [雀语](https://www.yuque.com/):使用微信登录了

* 网友

  





# 2. 快速开始



## 2.1 新建React工程

你需要在你的机器上安装 [Node >= 8.10 和 npm >= 5.6](https://nodejs.org/en/)。要创建项目，请执行：

```shell
npx create-react-app slate
cd slate
npm start
```



> 新建立一个文件

```tsx
import React from 'react';
import './slate.css';
export default()=>{
    return <div className="app">dddds</div>
}
```





## 2.2 引入Slate



```shell
tyarn add slate slate-react
```



## 2.3 基本功能

第一个例子

* import 相关的组件
* 使用useMemo来提高性能
* 使用useState来保存数据
* 添加【Slate】 与【Editable】

```tsx
import React, { useEffect, useMemo, useState } from "react";
import { createEditor } from "slate";
import { Slate, Editable, withReact } from "slate-react";

import "./slate.css";
export default () => {
  // Create a Slate editor object that won't change across renders.
  const editor = useMemo(() => withReact(createEditor()), []);

  // Keep track of state for the value of the editor.
  const [value, setValue] = useState([
    {
      type: "paragraph",
      children: [{ text: "A line of text in a paragraph." }],
    },
  ]);

  // Render the Slate context.
  return (
    <div className="app">
      编辑框
      <Slate
        editor={editor}
        value={value}
        onChange={(newValue) => setValue(newValue)}
      >
        <Editable />
      </Slate>
    </div>
  );
};

```



## 2.4 捕获键盘事件

让我们使用 `onKeyDown` 处理程序在按下键时**更改编辑器的内容**。

> 看看效果

 添加【onKeyDown】

```tsx
<Editable
    // Define a new handler which prints the key that was pressed.
    onKeyDown={(event) => {
        console.log(event.key);
    }}
/>
```



> 改变内容

在这样修改后，试试输入 `&`，你会发现它自动变成了 `and`！

```tsx
 <Editable
        onKeyDown={event => {
          if (event.key === '&') {
            // Prevent the ampersand character from being inserted.
            event.preventDefault()
            // Execute the `insertText` method when the event occurs.
            editor.insertText('and')
          }
        }}
      />
```

上面的代码在新版本上运行不了，可以使用下面的

```tsx
<Editable
    onKeyDown={(event) => {
        if (event.key === "Process" && event.code === "Digit7") {
            // Prevent the ampersand character from being inserted.
            event.preventDefault();
            // Execute the `insertText` method when the event occurs.
            editor.insertText("and");
        }
    }}
/>
```





## 2.5 定制节点

这里可以通过一些快捷键，来改变当前节点的样式。

参考网址：https://www.yuque.com/jacob.lcs/slatejs/zswm6l



> 定义两个组件

```tsx
// Define a React component renderer for our code blocks.
const CodeElement = (props) => {
  return (
    <pre {...props.attributes}>
      <code style={{ color: "red" }}>{props.children}</code>
    </pre>
  );
};

const DefaultElement = (props) => {
  return <p {...props.attributes}>{props.children}</p>;
};

```



> 定义callback事件

```tsx
  // Define a rendering function based on the element passed to `props`. We use
  // `useCallback` here to memoize the function for subsequent renders.
  const renderElement = useCallback((props) => {
    switch (props.element.type) {
      case "code":
        return <CodeElement {...props} />;
      default:
        return <DefaultElement {...props} />;
    }
  }, []);
```



> 修改editable

```tsx
        <Editable
          renderElement={renderElement}
          onKeyDown={(event) => {
            if (event.key === "&") {
              event.preventDefault();
              editor.insertText("and");
            }
            if (event.key === "`" && event.ctrlKey) {
              event.preventDefault();
              // Determine whether any of the currently selected blocks are code blocks.
              const [match] = Editor.nodes(editor, {
                match: (n) => n.type === "code",
              });
              // Toggle the block type depending on whether there's already a match.
              Transforms.setNodes(
                editor,
                { type: match ? "paragraph" : "code" },
                { match: (n) => Editor.isBlock(editor, n) }
              );
            }
          }}
        />
```

