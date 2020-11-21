import React from 'react';
import { Button } from 'antd';
import {
  QueryFilter,
  ProFormText,
  ProFormDatePicker,
  ProFormRadio,
} from '@ant-design/pro-form';

export default () => {
  return (
    <QueryFilter
      //   layout="vertical"
      //   defaultCollapsed
      onFinish={async (values) => {
        console.log(values);
      }}
    >
      <ProFormText name="name" label="项目名称" />
      <ProFormDatePicker name="createDate" label="创建事件" />
      <ProFormText name="status" label="状态" />
      <ProFormDatePicker name="replyDate" label="反馈时间" />
      <ProFormDatePicker name="endDate" label="结束时间" />
      <ProFormRadio.Group
        name="freq"
        label="查询频率"
        options={[
          { value: 'weekly', label: '每周' },
          { value: 'monthly', label: '每月' },
          {
            value: 'quarterly',
            label: '每季度',
          },
          {
            value: 'yearly',
            label: '每年',
          },
        ]}
      />
    </QueryFilter>
  );
};
