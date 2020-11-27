import React, { AriaAttributes } from 'react';
import { AppItem, getAppList } from '@/services/user';
import ProTable, { ProColumns } from '@ant-design/pro-table';
import { Button, Table, DatePicker, Space } from 'antd';

const ProcessMap: {
  [key: string]: 'normal' | 'active' | 'success' | 'exception';
} = {
  close: 'normal',
  running: 'active',
  online: 'success',
  error: 'exception',
};

const columns: ProColumns<AppItem>[] = [
  {
    title: '名称',
    dataIndex: 'name',
    render: (_) => <a>{_}</a>,
  },
  {
    title: '容器数量',
    dataIndex: 'containers',
    sorter: true,
  },
  {
    title: '调用次数',
    dataIndex: 'callNumber',
  },
  {
    title: '执行进度',
    dataIndex: 'progress',

    valueType: (item) => ({
      type: 'progress',
      status: ProcessMap[item.status],
    }),
  },
  {
    title: '创建者',
    dataIndex: 'creator',
  },
  {
    title: '创建时间',
    dataIndex: 'createdAt',
    valueType: 'date',
  },
  {
    title: '备注',
    dataIndex: 'memo',
    copyable: true,
    ellipsis: true,
  },
  {
    title: '操作',
    key: 'option',
    valueType: 'option',
    render: (_, record) => {
      return [
        <a key={record?.key} href={record.name}>
          链路
        </a>,
      ];
    },
  },
];

const SelectTable: React.FC = () => {
  const [selected, setSelected] = React.useState({
    selectedRowKeys: [],
    selectedRows: [],
  });
  const getSelectedRowKeys = () => {
    return selected.selectedRowKeys;
  };

  const setSelectHanl = (selectedRowKeys: any, selectedRows: any) => {
    console.log(selectedRowKeys, selectedRows);
    setSelected({ selectedRowKeys, selectedRows });
  };
  return (
    <ProTable<AppItem>
      headerTitle="批量操作"
      rowSelection={{
        // 自定义选择项参考: https://ant.design/components/table-cn/#components-table-demo-row-selection-custom
        // 注释该行则默认不显示下拉选项
        selections: [Table.SELECTION_ALL, Table.SELECTION_INVERT],
        onChange: setSelectHanl,
        selectedRowKeys: getSelectedRowKeys(),
      }}
      tableAlertOptionRender={() => {
        return (
          <Space>
            <a>批量删除</a>
            <a>导出数据</a>
          </Space>
        );
      }}
      tableAlertRender={({
        selectedRowKeys,
        selectedRows,
        onCleanSelected,
      }) => (
        <Space>
          <span>
            已选 {selectedRowKeys.length} 项
            <a style={{ marginLeft: 8 }} onClick={onCleanSelected}>
              取消选择
            </a>
          </span>
          <span>{`容器数量: ${selectedRows.reduce(
            (pre, item) => pre + item.containers,
            0,
          )} 个`}</span>
          <span>{`调用量: ${selectedRows.reduce(
            (pre, item) => pre + item.callNumber,
            0,
          )} 次`}</span>
        </Space>
      )}
      options={false}
      rowKey="key"
      search={false}
      toolBarRender={() => [<Button key="show">查看日志</Button>]}
      columns={columns}
      pagination={{
        pageSize: 5,
        onChange: (page, pageSize) => console.log(page, pageSize),
      }}
      request={async (params, sorter, filter) => {
        //console.log(params, sorter, filter);
        const result = await getAppList({
          current: params.current,
          pageSize: params.pageSize,
        });
        //console.log(result);
        return {
          data: result.list,
          total: result.total,
          success: true,
        };
      }}
    />
  );
};

export default SelectTable;
