import React from 'react';
import { Button, Tooltip } from 'antd';
import { DownOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import ProTable, { ProColumns, TableDropdown } from '@ant-design/pro-table';

import { getUserList, UserListItem } from '@/services/user';

const valueEnum = {
  0: 'close',
  1: 'running',
  2: 'online',
  3: 'error',
};

const columns: ProColumns<UserListItem>[] = [
  {
    title: '编号',
    dataIndex: 'id',
  },
  {
    title: '名称',
    dataIndex: 'name',
    render: (_) => <a>{_}</a>,
  },
  {
    title: '性别',
    dataIndex: 'gender',
    filters: true,
    valueEnum: {
      all: { text: '全部' },
      male: { text: '男' },
      female: { text: '女' },
    },
  },
  {
    title: '邮箱',
    dataIndex: 'email',
  },
  {
    title: '状态',
    dataIndex: 'status',
    valueEnum: {
      all: { text: '全部', status: 'Default' },
      close: { text: '关闭', status: 'Default' },
      running: { text: '运行中', status: 'Processing' },
      online: { text: '已上线', status: 'Success' },
      error: { text: '异常', status: 'Error' },
    },
  },

  {
    title: '创建时间',
    dataIndex: 'createdAt',
    valueType: 'date',
  },

  {
    title: '备注',
    dataIndex: 'memo',
    ellipsis: true,
  },
];

export default () => {
  return (
    <ProTable
      headerTitle="普通表格"
      columns={columns}
      rowKey="id"
      search={{
        labelWidth: 'auto',
      }}
      pagination={{ pageSize: 5 }}
      request={async (params, sorter, filter) => {
        console.log(params, sorter, filter);
        const result = await getUserList({
          current: params.current,
          pageSize: params.pageSize,
        });
        console.log(result);
        return {
          data: result.list,
          total: result.total,
          success: true,
        };
      }}
    />
  );
};
