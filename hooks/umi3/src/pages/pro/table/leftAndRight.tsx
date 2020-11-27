import React from 'react';
import { Button, Badge } from 'antd';
import { BadgeProps } from 'antd/lib/badge';
import ProTable, { ProColumns } from '@ant-design/pro-table';
import ProCard from '@ant-design/pro-card';
import { ListToolBarProps } from '@ant-design/pro-table/lib/component/ListToolBar';
import { IpItem, IpLogItem, getIPList, getIPLogList } from '@/services/user';
import { values } from 'lodash';

const IpLogList: React.FC = () => {
  const columns: ProColumns<IpLogItem>[] = [
    {
      title: '时间区间',
      key: 'createdAtRange',
      dataIndex: 'createdAtRange',
      valueType: 'dateRange',
    },
    {
      title: '时间点',
      key: 'createdAt',
      dataIndex: 'createdAt',
      valueType: 'date',
    },
    {
      title: '代码',
      key: 'code',
      width: 80,
      dataIndex: 'code',
      valueType: 'code',
    },
  ];

  return (
    <ProTable<IpLogItem>
      columns={columns}
      search={false}
      toolBarRender={false}
      rowKey="createdAt"
      pagination={{
        pageSize: 3,
        showSizeChanger: false,
      }}
      request={async (params, sorter, filter) => {
        const result: IpLogItem[] = await getIPLogList({
          current: params.current,
          pageSize: params.pageSize,
        });
        return {
          data: result,
          total: result.length,
          success: true,
        };
      }}
    />
  );
};

const IpList: React.FC = () => {
  const columns: ProColumns<IpItem>[] = [
    {
      title: 'IP',
      render: (_, item) => {
        return <Badge status={item.status} text={item.ip} />;
      },
    },
    {
      title: 'cpu',
      dataIndex: 'cpu',
      valueType: {
        type: 'percent',
        precision: 0,
      },
    },
    {
      title: 'mem',
      dataIndex: 'mem',
    },
    {
      title: 'disk',
      dataIndex: 'disk',
    },
  ];

  const toolBarRender: ListToolBarProps = {
    search: {
      onSearch: (keyWords: string) => {
        //console.log(keyWords);
        alert(keyWords);
      },
    },
    actions: [
      <Button type="primary" key="leftRightButton">
        新建项目
      </Button>,
    ],
  };

  return (
    <ProTable<IpItem>
      columns={columns}
      search={false}
      options={false}
      rowKey={() => Math.floor(Math.random() * 1000)}
      pagination={false}
      toolbar={toolBarRender}
      request={async (params, sort, filter) => {
        const result: IpItem[] = await getIPList({});
        return {
          data: result,
          total: result.length,
          success: true,
        };
      }}
    />
  );
};

export default () => {
  return (
    <ProCard split="vertical" key="totle">
      <ProCard colSpan="420px" key="left" ghost>
        <IpList />
      </ProCard>
      <ProCard title="IP: 106.14.98.124" key="right">
        <IpLogList />
      </ProCard>
    </ProCard>
  );
};
