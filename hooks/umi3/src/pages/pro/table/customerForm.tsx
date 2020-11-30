import React from 'react';
import { Button, Input } from 'antd';

import ProTable, { ProColumns } from '@ant-design/pro-table';
import { getUserList, UserListItem } from '@/services/user';
import { PlusOutlined } from '@ant-design/icons';

const columns: ProColumns<UserListItem>[] = [
  {
    title: '编号',
    dataIndex: 'id',
    search: false,
  },
  {
    title: '名称',
    dataIndex: 'name',
    search: false,
  },
  {
    title: '性别',
    dataIndex: 'gender',
    valueEnum: {
      all: { text: '全部' },
      male: { text: '男' },
      female: { text: '女' },
    },
  },
  {
    title: 'email',
    dataIndex: 'email',
    search: false,
  },
  {
    title: '自定义框',
    dataIndex: 'customer',
    key: 'customer',
    hideInTable: true,
    //自定义显示的内容
    renderFormItem: (item, { type, defaultRender, ...rest }, form) => {
      if (type == 'form') {
        return null;
      }
      console.log(type);
      console.log(item, type, rest);
      const gender = form.getFieldValue('gender');
      return <div>{gender}</div>;
    },
  },
];

export default () => {
  return (
    <ProTable<UserListItem>
      columns={columns}
      rowKey="id"
      pagination={{
        pageSize: 3,
      }}
      //   toolBarRender={() => [
      //     <Button key="new" type="primary">
      //       <PlusOutlined />
      //       新建
      //     </Button>,
      //   ]}

      toolbar={{
        menu: {
          type: 'inline',
          items: [
            {
              key: 'tab1',
              label: <span>应用</span>,
            },
            {
              key: 'tab2',
              label: <span>项目</span>,
            },
            {
              key: 'tab3',
              label: <span>文章</span>,
            },
          ],
          onChange: (key) => {
            console.log(key);
          },
        },
        filter: [<Input.Search key="input" type="search" />],
        actions: [
          <Button key="new" type="primary">
            <PlusOutlined />
            新建
          </Button>,
        ],
      }}
      search={{
        labelWidth: 'auto',
        optionRender: ({ searchText, resetText }, { form }) => [
          <Button key="search" type="primary" onClick={() => form?.submit()}>
            {searchText}
          </Button>,
          <Button key="reset" onClick={() => form?.resetFields}>
            {resetText}
          </Button>,
          <Button key="out">导出</Button>,
        ],
      }}
      request={async (params, sorter, filter) => {
        console.log(filter);
        const result = await getUserList({
          current: params.current,
          pageSize: params.pageSize,
        });
        return {
          data: result.list,
          total: result.total,
          success: true,
        };
      }}
    />
  );
};
