import React, { useRef, useMemo, useState } from 'react';
import { Card, Input, Button, Space } from 'antd';
import { useWebSocket } from 'ahooks';
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

  console.log(messageHistory);

  messageHistory.current = useMemo(() => {
    if (latestMessage) {
      return messageHistory.current.concat(latestMessage);
    }
    return messageHistory.current;
  }, [latestMessage]);

  return (
    <Card>
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
        {messageHistory.current.map((message, index) => (
          <p key={index}>{message?.data}</p>
        ))}
      </div>
    </Card>
  );
};
