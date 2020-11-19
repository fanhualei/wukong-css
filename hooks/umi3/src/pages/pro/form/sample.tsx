import React from 'react';
import ProForm, {
  StepsForm,
  ProFormText,
  ProFormDatePicker,
  ProFormSelect,
  ProFormTextArea,
  ProFormCheckbox,
  ProFormDateRangePicker,
} from '@ant-design/pro-form';

import { Form, Space } from 'antd';

export default () => {
  return (
    <div>
      <ProForm
        onFinish={async (values) => {
          console.log(values);
        }}
      >
        <ProFormText
          name="company"
          label="公司名称"
          placeholder="请输入名称"
          width="s"
          tooltip="会在 label 旁增加一个 icon，悬浮后展示配置的信息"
        />
        <ProFormDatePicker
          name="date"
          label="日期"
          extra={
            <div>
              请输入注册日期，如果不知道，点击 <a>查询链接</a>
            </div>
          }
          rules={[
            {
              required: true,
              message: '请输入手机号!',
            },
          ]}
        />
      </ProForm>
    </div>
  );
};
