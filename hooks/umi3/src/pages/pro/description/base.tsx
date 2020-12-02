import React from 'react';
import { Button } from 'antd';
import ProDescriptions from '@ant-design/pro-descriptions';
const { Item } = ProDescriptions;
import moment from 'moment';

export default () => {
  return (
    <ProDescriptions
      column={2}

      //   title="高级定义列表"
      //   tooltip="包含了从服务器请求，column等功能！"
    >
      <Item label="文本" valueType="option">
        <Button type="primary">提交</Button>
      </Item>

      <Item label="文本">这是一段文本</Item>
      <Item label="金额" valueType="money">
        102
      </Item>

      <Item label="百分比" valueType="percent">
        100
      </Item>
      <Item
        label="选择框"
        valueEnum={{
          all: { text: '全部', status: 'Default' },
          open: { text: '未解决', status: 'Error' },
          closed: { text: '已解决', status: 'Success' },
          processing: { text: '解决中', status: 'Processing' },
        }}
      >
        open
      </Item>

      <Item
        label="远程数据"
        request={async () => [
          { label: '全部', value: 'all' },
          { label: '未解决', value: 'open' },
          { label: '已解决', value: 'closed' },
        ]}
      >
        closed
      </Item>
      <Item label="进度条" valueType="progress">
        40
      </Item>

      <Item label="日期时间" valueType="dateTime">
        {moment().valueOf()}
      </Item>
      <Item label="日期" valueType="date">
        {moment().valueOf()}
      </Item>

      <Item label="日期区间" valueType="dateRange">
        {[moment().add(-1, 'd').valueOf(), moment().valueOf()]}
      </Item>
      <Item label="时间" valueType="time">
        {moment().valueOf()}
      </Item>

      <Item label="代码块" valueType="code">
        {`yarn run v1.22.0
$ eslint --format=pretty ./packages
Done in 9.70s.`}
      </Item>

      <Item label="Json代码块" valueType="jsonCode">{`{
  "compilerOptions": {
    "target": "esnext",
    "moduleResolution": "node",
    "jsx": "preserve",
    "esModuleInterop": true,
    "experimentalDecorators": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noImplicitReturns": true,
    "suppressImplicitAnyIndexErrors": true,
    "declaration": true,
    "skipLibCheck": true
  },
  "include": ["**/src", "**/docs", "scripts", "**/demo", ".eslintrc.js"]
}`}</Item>
    </ProDescriptions>
  );
};
