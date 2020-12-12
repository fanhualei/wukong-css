import React from 'react';
import { Button, Tag, Space, Menu, Dropdown } from 'antd';
import ProTable, {
  ProColumns,
  TableDropdown,
  ActionType,
  ColumnsState,
} from '@ant-design/pro-table';
import {} from '@ant-design/pro-form';
import { PlusOutlined, EllipsisOutlined } from '@ant-design/icons';
//import { useRequest } from 'ahooks';
import request from 'umi-request';
import { FormInstance } from 'antd/lib/form';

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

const columns: ProColumns<GithubIssueItem>[] = [
  {
    dataIndex: 'index',
    valueType: 'indexBorder',
    width: 48,
  },
  {
    title: '标题',
    dataIndex: 'title',
    copyable: true,
    ellipsis: true,
    tip: '标题过长会自动收缩',
    formItemProps: {
      rules: [
        {
          required: true,
          message: '此项为必填项',
        },
      ],
    },
    width: '30%',
    search: false,
  },
  {
    title: '状态',
    dataIndex: 'state',
    key: 'state',
    initialValue: 'open',
    filters: true,
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
        valueEnum: {
          all: { text: '全部', status: 'Default' },
          close: { text: '关闭', status: 'Default' },
          running: { text: '运行中', status: 'Processing' },
          online: { text: '已上线', status: 'Success' },
          error: { text: '异常', status: 'Error' },
        },
      },
    },
  },
  {
    title: '创建时间',
    key: 'since',
    dataIndex: 'created_at',
    valueType: 'date',
  },
  {
    title: '操作',
    valueType: 'option',
    render: (text, row, _, action) => [
      <a href={row.url} target="_blank" rel="noopener noreferrer" key="link">
        链路
      </a>,
      <a href={row.url} target="_blank" rel="noopener noreferrer" key="view">
        查看
      </a>,
      <TableDropdown
        key="actionGroup"
        onSelect={() => action.reload()}
        menus={[
          { key: 'copy', name: '复制' },
          { key: 'delete', name: '删除' },
        ]}
      />,
    ],
  },
];

const menu = (
  <Menu>
    <Menu.Item key="1">1st time</Menu.Item>
    <Menu.Item key="2">2st time</Menu.Item>
    <Menu.Item key="3">3st time</Menu.Item>
  </Menu>
);

export default () => {
  const actionRef = React.useRef<ActionType>();
  const ref = React.useRef<FormInstance>();
  //隐藏某一列
  const [columnsStateMap, setColumnsStateMap] = React.useState<{
    [key: string]: ColumnsState;
  }>({
    state: {
      show: false,
    },
  });
  return (
    <ProTable<GithubIssueItem>
      columns={columns}
      columnsStateMap={columnsStateMap}
      onColumnsStateChange={(map) => setColumnsStateMap(map)}
      rowKey="id"
      actionRef={actionRef}
      formRef={ref}
      pagination={{ pageSize: 5 }}
      dateFormatter="string"
      headerTitle="高级表格"
      request={async (params = {}) => {
        //console.log(params);
        return request<{
          data: GithubIssueItem[];
        }>('https://proapi.azurewebsites.net/github/issues', {
          params,
        });
      }}
      search={{
        labelWidth: 'auto',
      }}
      toolBarRender={() => [
        <Button
          key="button"
          icon={<PlusOutlined />}
          type="primary"
          onClick={() => {
            console.log(actionRef.current);

            if (actionRef.current?.reload && actionRef.current?.reset) {
              actionRef.current?.reset();
              actionRef.current?.reload();
            }

            ref.current?.setFieldsValue({
              state: 'dddddd',
            });
          }}
        >
          新增
        </Button>,
        <Dropdown key="menu" overlay={menu}>
          <Button>
            <EllipsisOutlined />
          </Button>
        </Dropdown>,
      ]}
    />
  );
};
