import React from 'react';
import ProList from '@ant-design/pro-list';
import { Button, Tag, Space, Progress } from 'antd';
import { getListDataSource, ListDataSourceItem } from '@/services/user';
import { useRequest } from 'ahooks';

const ProcessMap: {
  [key: string]: 'normal' | 'active' | 'success' | 'exception';
} = {
  close: 'normal',
  processing: 'active',
  success: 'success',
  error: 'exception',
};

export default () => {
  const request = useRequest(getListDataSource);
  const [expandedRowKeys, setExpandedRowKeys] = React.useState<
    React.ReactText[]
  >([]);

  const actionRender = (
    text: React.ReactNode,
    row: ListDataSourceItem,
  ): React.ReactNode => {
    return [
      <a href={row.image} target="_blank" rel="noopener noreferrer" key="link">
        链路
      </a>,
      <a
        href={row.image}
        target="_blank"
        rel="noopener noreferrer"
        key="warning"
      >
        报警
      </a>,
      <a href={row.image} target="_blank" rel="noopener noreferrer" key="view">
        查看
      </a>,
    ];
  };

  const subTitleRender = (
    dom: React.ReactNode,
    entity: ListDataSourceItem,
  ): React.ReactNode => {
    return (
      <Space size={0}>
        <Tag color="blue">Ant Design</Tag>
        <Tag color="#5BD8A6">TechUI</Tag>
      </Space>
    );
  };

  const contentRender = (
    dom: React.ReactNode,
    entity: ListDataSourceItem,
  ): React.ReactNode => {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
        }}
      >
        <div
          style={{
            width: 100,
          }}
        >
          <div>{entity.status}</div>
          <Progress
            percent={entity.progress}
            status={ProcessMap[entity.status]}
          />
        </div>
      </div>
    );
  };

  return (
    <ProList<ListDataSourceItem>
      rowKey="name"
      headerTitle="基础列表"
      dataSource={request.data}
      loading={request.loading}
      toolBarRender={() => [
        <Button type="primary" key="basekey">
          新建
        </Button>,
      ]}
      metas={{
        title: {
          dataIndex: 'name',
        },
        avatar: { dataIndex: 'avatar' },
        description: { dataIndex: 'desc' },
        subTitle: {
          render: subTitleRender,
        },
        actions: {
          render: actionRender,
        },
        content: { render: contentRender },
      }}
      showActions="always"
      expandable={{ expandedRowKeys, onExpandedRowsChange: setExpandedRowKeys }}
    />
  );
};
