import React from 'react';
import ProTable, { ProColumns } from '@ant-design/pro-table';
import { Button } from 'antd';
import { getUserList, UserListItem } from '@/services/user';

import { RequestData } from '@ant-design/pro-table/lib/useFetchData';
import { SortOrder, ColumnFilterItem } from 'antd/lib/table/interface';

const columns: ProColumns<UserListItem>[] = [
  {
    title: '编号',
    dataIndex: 'id',
    search: false,
    sorter: true,
  },
  {
    title: '名称',
    dataIndex: 'name',
  },
  {
    title: '性别',
    dataIndex: 'gender',
    valueEnum: {
      all: { text: '全部' },
      male: { text: '男' },
      female: { text: '女' },
    },
    filters: true,
  },
  {
    title: '邮箱',
    dataIndex: 'email',
  },
];

export default () => {
  const requestFun = async (
    params: {
      pageSize?: number;
      current?: number;
      keyword?: string;
    },
    sorter: { [key: string]: SortOrder },
    filter: { [key: string]: React.ReactText[] },
  ) => {
    console.log(params, sorter, filter);
    const result = await getUserList({
      current: params.current,
      pageSize: params.pageSize,
    });
    return {
      data: result.list,
      total: result.total,
      success: true,
    };
  };

  return (
    <ProTable<UserListItem>
      columns={columns}
      pagination={{ pageSize: 3 }}
      rowKey="id"
      headerTitle="可编辑表格"
      request={requestFun}
    />
  );
};
