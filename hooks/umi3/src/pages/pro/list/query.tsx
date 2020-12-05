import React from 'react';
import ProList from '@ant-design/pro-list';
import request from 'umi-request';

import { Button, Space, Tag } from 'antd';
import { render } from 'react-dom';

interface GithubIssueItem {
  url: string;
  id: number;
  number: number;
  title: string;
  labels: {
    name: string;
    color: string;
  }[];
  state: string;
  comments: number;
  created_at: string;
  updated_at: string;
  closed_at?: string;
}

export default () => {
  const url = 'https://proapi.azurewebsites.net/github/issues';
  return (
    <ProList<GithubIssueItem>
      headerTitle="查询与筛选"
      pagination={{
        pageSize: 3,
      }}
      request={async (params, sort, filter) => {
        console.log(params, sort, filter);
        return request(url, { params });
      }}
      rowKey="id"
      toolBarRender={() => [
        <Button key="queryNew" type="primary">
          新建
        </Button>,
      ]}
      metas={{
        title: { dataIndex: 'user', search: false },
        avatar: { dataIndex: 'avatar', search: false },
        description: { dataIndex: 'title', search: false },
        subTitle: {
          title: '标题',
          render: (_, row) => {
            return (
              <Space>
                {row.labels?.map((label: { name: string; color: string }) => (
                  <Tag key={label.name} color={label.color}>
                    {label.name}
                  </Tag>
                ))}
              </Space>
            );
          },
        },
        actions: {
          search: false,
          render: () => [<a>链路</a>, <a>报警</a>, <a>查看</a>],
        },
        status: {
          // 自己扩展的字段，主要用于筛选，不在列表中显示
          title: '状态',
          valueType: 'select',
          valueEnum: {
            all: { text: '全部', status: 'Default' },
            open: {
              text: '未解决',
              status: 'Error',
            },
            closed: {
              text: '已解决',
              status: 'Success',
            },
            processing: {
              text: '解决中',
              status: 'Processing',
            },
          },
        },
      }}
      showActions="hover"
      search={{ filterType: 'light' }}
      size="small"
      split={false}
    />
  );
};
