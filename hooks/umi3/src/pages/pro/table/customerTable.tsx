import React from 'react';
import { Card, Descriptions, Button, Menu } from 'antd';
import ProTable, { ProColumns } from '@ant-design/pro-table';
import { getUserList, UserListItem } from '@/services/user';

const columns: ProColumns<UserListItem>[] = [
  {
    title: '编号',
    dataIndex: 'id',
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
  },
  {
    title: '邮箱',
    dataIndex: 'email',
  },
  {
    title: '注册时间',
    dataIndex: 'createdAt',
    valueType: 'date',
  },
];

export default () => {
  return (
    <ProTable
      rowKey="id"
      columns={columns}
      search={{ labelWidth: 'auto' }}
      pagination={{ pageSize: 3 }}
      tableRender={(_, dom) => {
        return (
          <div style={{ display: 'flex', width: '100%' }}>
            <Menu
              style={{ width: 256 }}
              mode="inline"
              defaultSelectedKeys={['1']}
              defaultOpenKeys={['sub1']}
            >
              <Menu.SubMenu key="sub1" title="导航带单">
                <Menu.ItemGroup key="g1" title="权限管理">
                  <Menu.Item key="1">Option1</Menu.Item>
                  <Menu.Item key="2">Option2</Menu.Item>
                </Menu.ItemGroup>
                <Menu.ItemGroup key="g2" title="人员管理">
                  <Menu.Item key="3">Option1</Menu.Item>
                  <Menu.Item key="4">Option2</Menu.Item>
                </Menu.ItemGroup>
              </Menu.SubMenu>
            </Menu>
            <div style={{ flex: 1 }}>{dom}</div>
          </div>
        );
      }}
      tableExtraRender={(_, data) => {
        return (
          <Card>
            <Descriptions column={3}>
              <Descriptions.Item label="Row">{data.length}</Descriptions.Item>
              <Descriptions.Item label="Created">Lili Qu</Descriptions.Item>
              <Descriptions.Item label="Association">
                <a>421421</a>
              </Descriptions.Item>
              <Descriptions.Item label="Creation Time">
                2017-01-10
              </Descriptions.Item>
              <Descriptions.Item label="Effective Time">
                2017-10-10
              </Descriptions.Item>
            </Descriptions>
          </Card>
        );
      }}
      request={async (params, sort, filter) => {
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
