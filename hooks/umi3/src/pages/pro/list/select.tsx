import React from 'react';
import { Button, Progress, Space } from 'antd';
import ProList from '@ant-design/pro-list';
import { ListDataSourceItem, getListDataSource } from '@/services/user';
import { useRequest } from 'ahooks';

const ProcessMap: {
  [key: string]: 'normal' | 'active' | 'success' | 'exception';
} = {
  close: 'normal',
  processing: 'active',
  success: 'success',
  error: 'exception',
};

const ProcessText: { [key: string]: string } = {
  close: '关闭',
  processing: '进行中',
  success: '成功',
  error: '错误',
};

export default () => {
  const request = useRequest(getListDataSource);
  const [selectedRowKeys, setSelectedRowKeys] = React.useState<
    React.ReactText[]
  >([]);
  const rowSelection = {
    selectedRowKeys,
    onChange: (keys: React.ReactText[], selectedRows: ListDataSourceItem[]) => {
      console.log(keys, selectedRows);
      return setSelectedRowKeys(keys);
    },
  };

  const extraRender = (
    dom: React.ReactNode,
    entity: ListDataSourceItem,
  ): React.ReactNode => {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          minWidth: 300,
        }}
      >
        <div
          style={{
            width: 100,
          }}
        >
          <div>{ProcessText[entity.status]}</div>
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
      headerTitle={
        <Space>
          支持选中的列表
          <em style={{ fontSize: 11, color: '#666' }}>
            选中条数: {selectedRowKeys.length}
          </em>
        </Space>
      }
      dataSource={request.data}
      loading={request.loading}
      toolBarRender={() => [
        <Button type="primary" key="selectKey">
          新建
        </Button>,
      ]}
      metas={{
        title: { dataIndex: 'name' },
        avatar: { dataIndex: 'image' },
        description: { dataIndex: 'desc' },
        actions: { render: () => [<a>邀请</a>] },
        extra: { render: extraRender },
      }}
      rowSelection={rowSelection}
    />
  );
};
