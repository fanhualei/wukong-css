import React from 'react';
import ProDescriptions from '@ant-design/pro-descriptions';

import { getAppByKey, AppItem } from '@/services/user';
import ProTable, { ProColumns } from '@ant-design/pro-table';

const ProcessMap: {
  [key: string]: 'normal' | 'active' | 'success' | 'exception';
} = {
  close: 'normal',
  running: 'active',
  online: 'success',
  error: 'exception',
};
const columns: ProColumns<AppItem>[] = [
  {
    title: '名称',
    dataIndex: 'name',
    render: (_) => <a>{_}</a>,
  },
  {
    title: '容器数量',
    dataIndex: 'containers',
  },
  {
    title: '调用次数',
    dataIndex: 'callNumber',
  },
  {
    title: '执行进度',
    dataIndex: 'progress',

    valueType: (item) => ({
      type: 'progress',
      status: ProcessMap[item.status],
    }),
  },
  {
    title: '创建者',
    dataIndex: 'creator',
  },

  {
    title: '创建时间',
    dataIndex: 'createdAt',
    valueType: 'date',
  },
  {
    title: '备注',
    dataIndex: 'memo',
    copyable: true,
    ellipsis: true,
  },

  {
    title: '操作',
    key: 'option',
    valueType: 'option',
    render: (_, record) => {
      return [
        <a key={record?.key} href={record.name}>
          链路
        </a>,
      ];
    },
  },
];

export default () => {
  return (
    <ProDescriptions
      column={2}
      columns={columns}
      bordered={true}
      request={async () => {
        const result = await getAppByKey({ key: 2 });
        return {
          data: result,
          success: true,
        };
      }}
    >
      <ProDescriptions.Item label="自定义内容">
        自定义内容，会显示在最前面
      </ProDescriptions.Item>
    </ProDescriptions>
  );
};
