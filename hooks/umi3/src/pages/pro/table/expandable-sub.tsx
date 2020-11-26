import React from 'react';
import ProTable, { ProColumns } from '@ant-design/pro-table';
import { UserListItem, LogListItem, getLogList } from '@/services/user';

interface SubTableProps {
  user: UserListItem;
}

const columns: ProColumns<LogListItem>[] = [
  {
    title: '编号',
    dataIndex: 'logId',
  },
  {
    title: '操作',
    dataIndex: 'actionType',
    valueEnum: {
      login: { text: '登录' },
      logout: { text: '退出' },
      searchGoods: { text: '查询商品' },
      regist: { text: '注册' },
      delGoogs: { text: '删除商品' },
    },
  },
  {
    title: '操作时间',
    dataIndex: 'createdAt',
    valueType: 'dateTime',
  },
  {
    title: '备注',
    dataIndex: 'memo',
    ellipsis: true,
  },
];

const SubTable: React.FC<SubTableProps> = ({ user }) => {
  console.log(user);
  return (
    <div>
      <ProTable<LogListItem>
        headerTitle={user?.name}
        search={false}
        toolBarRender={false}
        rowKey="logId"
        pagination={{
          pageSize: 5,
          showSizeChanger: false,
        }}
        size="small"
        columns={columns}
        request={async (params, sort, filter) => {
          const result = await getLogList({
            current: params.current,
            pageSize: params.pageSize,
            userId: user.id,
          });
          return {
            data: result.list,
            total: result.total,
            success: true,
          };
        }}
      />
    </div>
  );
};

export default SubTable;
