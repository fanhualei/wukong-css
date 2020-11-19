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
        submitter={{
          render: (props, doms) => {
            return (
              <Form.Item wrapperCol={{ span: 6, offset: 8 }}>
                <Space>{doms}</Space>
              </Form.Item>
            );
          },
        }}
      >
        <ProForm.Group>
          <ProFormText
            name="company"
            label="公司名称"
            placeholder="请输入名称"
            width="s"
            tooltip="会在 label 旁增加一个 icon，悬浮后展示配置的信息"
          />

          <ProFormDatePicker name="date" label="日期" />
        </ProForm.Group>

        <ProForm.Group>
          <ProFormText
            name="company2"
            label="公司名称"
            placeholder="请输入名称"
            width="s"
            tooltip="会在 label 旁增加一个 icon，悬浮后展示配置的信息"
          />

          <ProFormDatePicker name="date2" label="日期" />
          <ProFormDatePicker name="date3" label="日期" />
          <ProFormText
            name="company3"
            label="公司名称2"
            placeholder="请输入名称"
            width="s"
            tooltip="会在 label 旁增加一个 icon，悬浮后展示配置的信息"
          />
        </ProForm.Group>

        <ProFormDatePicker name="date4" label="日期" />
        <ProFormDatePicker name="date5" label="日期" />
        <ProFormText
          name="company4"
          label="公司名称2"
          placeholder="请输入名称"
          width="s"
          tooltip="会在 label 旁增加一个 icon，悬浮后展示配置的信息"
        />
      </ProForm>
    </div>
  );
};
