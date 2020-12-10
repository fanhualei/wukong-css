import React, { useRef, useState, useImperativeHandle } from 'react';

const FancyInput = React.forwardRef((props, ref) => {
  const inputRef: any = useRef();
  useImperativeHandle(ref, () => ({
    focus1: () => {
      inputRef.current.focus();
    },
  }));

  return <input ref={inputRef} type="text" />;
});

export default FancyInput;
