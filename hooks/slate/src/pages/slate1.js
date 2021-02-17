import React, { useEffect, useCallback, useMemo, useState } from "react";
import { createEditor, Editor, Transforms, Text } from "slate";
import { Slate, Editable, withReact } from "slate-react";

import "./slate.css";

// https://www.yuque.com/jacob.lcs/slatejs/keotzc
// 自定义样式

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

  // Define a leaf rendering function that is memoized with `useCallback`.
  const renderLeaf = useCallback((props) => {
    return <Leaf {...props} />;
  }, []);

  // Render the Slate context.
  return (
    <div className="app">
      aaaa
      <Slate
        editor={editor}
        value={value}
        onChange={(value) => setValue(value)}
      >
        <Editable
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          onKeyDown={(event) => {
            if (event.key === "&") {
              event.preventDefault();
              editor.insertText("and");
            }

            if (event.ctrlKey) {
              switch (event.key) {
                // When "`" is pressed, keep our existing code block logic.
                case "`": {
                  event.preventDefault();
                  const [match] = Editor.nodes(editor, {
                    match: (n) => n.type === "code",
                  });
                  Transforms.setNodes(
                    editor,
                    {
                      type: match ? "paragraph" : "code",
                    },
                    { match: (n) => Editor.isBlock(editor, n) }
                  );
                  break;
                }
                // When "B" is pressed, bold the text in the selection.
                case "b": {
                  event.preventDefault();
                  Transforms.setNodes(
                    editor,
                    { bold: true },
                    { match: (n) => Text.isText(n), split: true }
                  );
                  break;
                }
              }
            }

            // ----------------------
          }}
        />
      </Slate>
    </div>
  );
};

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

// Define a React component to render leaves with bold text.
const Leaf = (props) => {
  return (
    <span
      {...props.attributes}
      style={{ fontWeight: props.leaf.bold ? "bold" : "normal" }}
    >
      {props.children}
    </span>
  );
};
