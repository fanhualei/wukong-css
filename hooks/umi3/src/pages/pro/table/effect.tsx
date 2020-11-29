import React from 'react';
import {} from 'antd';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import { IpLogItem, getIPLogList } from '@/services/user';

const columns: ProColumns<IpLogItem>[] = [
  {
    title: '时间区间',
    dataIndex: 'createdAtRange',
    valueType: 'dateRange',
    key: 'createdAtRange123',
  },
  {
    title: '时间点',
    dataIndex: 'createdAt',
    valueType: 'date',
    key: 'createdAt123',
  },
  {
    title: '代码',
    dataIndex: 'code',
    valueType: 'code',
    search: false,
  },
];

export default () => {
  const [count, setCount] = React.useState(0);
  const actionRef = React.useRef<ActionType | undefined>(undefined);

  function myEffect() {
    const I = setInterval(() => {
      setCount((x) => x + 1);
      actionRef.current?.reload();
    }, 6000);
    return () => clearInterval(I);
  }

  React.useEffect(myEffect, []);

  return (
    <>
      <div>每个6秒钟刷新一次，当前刷新次数：{count}</div>
      <ProTable<IpLogItem>
        columns={columns}
        toolBarRender={false}
        actionRef={actionRef}
        rowKey="createdAt"
        pagination={{ pageSize: 3 }}
        search={{
          labelWidth: 'auto',
        }}
        request={async (params, sort, filter) => {
          const result: IpLogItem[] = await getIPLogList({});
          return {
            data: result,
            success: true,
          };
        }}
      />
    </>
  );
};
