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
  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
  };

  return (
    <div style={{ width: '80%', margin: 'auto' }}>
      <ProForm
        onFinish={async (values) => {
          console.log(values);
        }}
        layout="horizontal"
        {...formItemLayout}
        submitter={{
          render: (props, doms) => {
            return (
              <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
                <Space>{doms}</Space>
              </Form.Item>
            );
          },
        }}
      >
        <ProFormText
          name="company"
          label="公司名称"
          placeholder="请输入名称"
          width="s"
          tooltip="会在 label 旁增加一个 icon，悬浮后展示配置的信息"
        />

        <ProFormDatePicker name="date" label="日期" />
      </ProForm>
    </div>
  );
};
