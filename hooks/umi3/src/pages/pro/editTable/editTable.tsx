import React from 'react';
import ProTable, { ProColumns, EditableProTable } from '@ant-design/pro-table';
import ProCard from '@ant-design/pro-card';
import ProField from '@ant-design/pro-field';
import { Button } from 'antd';
import { getUserList, UserListItem } from '@/services/user';
import { useRequest } from 'ahooks';
import { json } from 'express';

const columns: ProColumns<UserListItem>[] = [
  {
    title: '编号',
    dataIndex: 'id',
    search: false,
    sorter: true,
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
    title: '操作',
    valueType: 'option',
    width: 200,
    render: (text, record, _, action) => [
      <a
        key="editable"
        onClick={() => {
          action.startEditable?.(record.id);
        }}
      >
        编辑
      </a>,
    ],
  },
];

const newUser: UserListItem = {
  id: (Math.random() * 1000000).toFixed(0).toString(),
  name: '',
  gender: 'female',
  email: '',
  memo: '',
  disabled: true,
  status: '',
  gradeId: 1,
  createdAt: Date.now() - Math.floor(Math.random() * 100000),
  creator: 'system',
};

export default () => {
  //const [editableKeys, setEditableRowKeys] = React.useState<React.Key[]>([]);
  const [currentDataList, setCurrentDataList] = React.useState<UserListItem[]>(
    [],
  );

  const userList = useRequest(() => getUserList({ pageSize: 3, current: 1 }), {
    onSuccess: (result, params) => {
      setCurrentDataList(result.list);
    },
  });

  const onSave = async (key: React.Key, row: UserListItem) => {
    console.log(key, row);
  };

  const onDelete = async (key: React.Key, row: UserListItem) => {
    console.log(key, row);
  };

  const onChange = (
    editableKeys: React.Key[],
    editableRows: UserListItem[],
  ) => {
    console.log(editableKeys, editableRows);
    //setEditableRowKeys(editableKeys);
  };

  return (
    <>
      <EditableProTable<UserListItem>
        columns={columns}
        rowKey="id"
        headerTitle="可编辑表格"
        //可编辑表格
        loading={userList?.loading}
        value={currentDataList}
        onChange={setCurrentDataList}
        editable={{
          type: 'singe',
          //editableKeys,
          onChange,
          onSave,
          onDelete,
          deletePopconfirmMessage: (
            <>
              <p>'删除数据要谨慎呀！！！</p>真的要删除吗？'
            </>
          ),
          // actionRender: (row, config) => {
          //   console.log(row, config);
          //   return [
          //     <div onClick={() => config.cancelEditable(row.id)}>取消</div>,
          //     <div onClick={() => config.onSave(row)}>保存</div>,
          //   ];
          // },
        }}
        recordCreatorProps={{
          position: 'end',
          record: newUser,
        }}
      />
      <ProCard title="表格数据">
        <ProField
          fieldProps={{ style: { width: '100%' } }}
          mode="read"
          valueType="jsonCode"
          text={JSON.stringify(currentDataList)}
        />
      </ProCard>
    </>
  );
};
