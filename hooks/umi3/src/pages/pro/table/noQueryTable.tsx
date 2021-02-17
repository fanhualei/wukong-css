import React from 'react';
import { Button, Form } from 'antd';
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
    sorter: true,
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
    title: '年级',
    dataIndex: 'gradeId',
    valueEnum: {
      0: { text: '全部' },
      1: { text: '一年级' },
      2: { text: '二年级' },
      3: { text: '三年级' },
      4: { text: '四年级' },
      5: { text: '五年级' },
      6: { text: '六年级' },
    },
    fieldProps: {
      options: [
        {
          label: '低年级',
          value: '1-2年级',
        },
        {
          label: '中年级',
          value: '3-4年级',
        },
        {
          label: '高年级',
          value: '5-6年级',
        },
      ],
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
    filters: true,
    // onFilter: (value, record) => {
    //   console.log(value, record);
    //   return true;
    // },
    valueType: 'checkbox',
  },

  {
    title: '创建时间',
    dataIndex: 'createdAt',
    valueType: 'date',
    sorter: true,
  },

  {
    title: '备注',
    dataIndex: 'memo',
    ellipsis: true,
    search: false,
  },
  {
    title: '操作',
    key: 'option',
    width: 100,
    valueType: 'option',
    render: () => [<a key="modify">编辑</a>, <a key="delete">删除</a>],
  },
];

const toolBar = (): React.ReactNode[] => {
  return [
    <Button key="ddd">
      导出数据
      <DownOutlined />
    </Button>,
    <Button type="primary" key="bbb">
      新建
    </Button>,
  ];
};

export default () => {
  return (
    <ProTable
      headerTitle="普通表格1"
      columns={columns}
      // search={false}
      search={{
        labelWidth: 'auto',
        //filterType: 'light',
      }}
      //toolBarRender={false}
      toolBarRender={toolBar}
      rowKey="id"
      pagination={{ pageSize: 5 }}
      request={async (params, sorter, filter) => {
        console.log(JSON.stringify(params), sorter, filter);
        const result = await getUserList({
          current: params.current,
          pageSize: params.pageSize,
        });
        //console.log(result);
        return {
          data: result.list,
          total: result.total,
          success: true,
        };
      }}
    />
  );
};
