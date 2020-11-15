import React, { useRef } from 'react';
import { useRequest } from 'ahooks';
import { Card, Button, Divider, message, Table } from 'antd';

import { getUserList, UserListItem } from '@/services/user';
import listTest from '@/pages/listTest';

const getUserListFun = (params: { current: number; pageSize: number }) => {
  return getUserList({ ...params });
};

const columns = [
  {
    title: '编号',
    dataIndex: 'id',
    sorter: true,
    filters: [
      { text: '1-10', value: '10' },
      { text: '11-?', value: '55' },
    ],
  },
  { title: '名称', dataIndex: 'name', sorter: true },
  {
    title: '性别',
    dataIndex: 'gender',
    sorter: true,
    filters: [
      { text: '男', value: 'male' },
      { text: '女', value: 'female' },
    ],
  },
];

export default () => {
  const useTable = useRequest(getUserListFun, {
    paginated: true,
    defaultPageSize: 10,
  });
  //console.log(useTable?.params);
  //定义查询与排序
  const { sorter = {}, filters = {} } = useTable?.params[0] || ({} as any);

  //loadmore例子
  const containerRef = useRef<HTMLDivElement>(null);
  const pageSize = 10;
  const useLoadMore = useRequest(
    (d: { total: number; list: [] } | undefined) => {
      const current = d ? d?.list.length / pageSize + 1 : 1;
      return getUserListFun({ current, pageSize });
    },
    {
      loadMore: true,
      ref: containerRef,
      isNoMore: (d) => (d ? d.list.length >= d.total : false),
    },
  );

  //console.log(useLoadMore.data);

  return (
    <Card>
      <Button onClick={useTable?.refresh} style={{ marginBottom: 16 }}>
        刷新
      </Button>
      <Table columns={columns} rowKey="id" {...useTable?.tableProps} />

      <Divider orientation="left" plain dashed>
        loadmore
      </Divider>

      <div ref={containerRef} style={{ height: 200, overflowY: 'auto' }}>
        {useLoadMore.loading ? (
          <p>loading</p>
        ) : (
          <ul style={{ marginLeft: 28 }}>
            {useLoadMore.data?.list.map((user: UserListItem) => (
              <li key={user.id}>
                {user.id} - {user.name}
              </li>
            ))}
          </ul>
        )}

        <Button
          onClick={useLoadMore?.loadMore}
          disabled={useLoadMore.data?.total === useLoadMore.data?.list.length}
          loading={useLoadMore.loadingMore}
        >
          LoadMore
        </Button>
      </div>
    </Card>
  );
};
