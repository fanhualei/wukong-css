import React, { useRef, useMemo, useState } from 'react';
import { Card, Input, Button, Space, Divider } from 'antd';
import { useWebSocket, useFullscreen } from 'ahooks';
import styles from './index.less';

enum ReadyState {
  Connecting = 0,
  Open = 1,
  Closing = 2,
  Closed = 3,
}

export default () => {
  const [text, setText] = useState('send message');
  const messageHistory = useRef([]);
  const {
    readyState,
    sendMessage,
    latestMessage,
    disconnect,
    connect,
  } = useWebSocket('wss://echo.websocket.org');

  //console.log(messageHistory);

  messageHistory.current = useMemo(() => {
    if (latestMessage) {
      return messageHistory.current.concat(latestMessage);
    }
    return messageHistory.current;
  }, [latestMessage]);

  //全屏的例子
  const ref = useRef();
  const [isFullscreen, { setFull, exitFull, toggleFull }] = useFullscreen(ref);

  return (
    <Card>
      <Divider orientation="left" plain dashed>
        websocket
      </Divider>
      {text}
      <div>
        <Input
          value={text}
          style={{ width: '50%' }}
          onChange={(e) => setText(e.target.value)}
        />
      </div>

      <Space style={{ marginTop: 16, marginBottom: 16 }}>
        <Button
          disabled={readyState !== ReadyState.Open}
          onClick={() => sendMessage && sendMessage(text)}
        >
          send
        </Button>
        <Button disabled={readyState !== ReadyState.Open}>disconnect</Button>
        <Button disabled={readyState == ReadyState.Open}>connect</Button>
      </Space>

      <div>
        <p>received message: </p>
        {messageHistory.current.map((value, index) => (
          <p key={index}>{value?.data}</p>
        ))}
      </div>

      <Divider orientation="left" plain dashed>
        全屏
      </Divider>
      <div ref={ref} style={{ background: 'pink' }}>
        dddd
        <button type="button" onClick={setFull}>
          setFull
        </button>
        <button type="button" onClick={exitFull} style={{ margin: '0 8px' }}>
          exitFull
        </button>
        <button type="button" onClick={toggleFull}>
          toggle
        </button>
      </div>
    </Card>
  );
};
