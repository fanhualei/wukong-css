import React from 'react';
import ProDescriptions from '@ant-design/pro-descriptions';
import { AppItem, getAppByKey } from '@/services/user';
import { Button } from 'antd';
const { Item } = ProDescriptions;

export default () => {
  return (
    <ProDescriptions
      column={2}
      request={async () => {
        const result = await getAppByKey({ key: 2 });
        return {
          data: result,
          success: true,
        };
      }}
    >
      <Item label="编号" dataIndex="key" />
      <Item label="名称" dataIndex="name" />
      <Item label="进度" dataIndex="progress" valueType="progress" />
      <Item label="创建时间" dataIndex="createdAt" valueType="dateTime" />
      <Item valueType="option">
        <Button type="primary">提交</Button>
        <Button>重置</Button>
        <Button type="link">修改</Button>
      </Item>
    </ProDescriptions>
  );
};
