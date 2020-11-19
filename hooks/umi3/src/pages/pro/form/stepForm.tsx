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
import StepForm from '@ant-design/pro-form/lib/layouts/StepsForm/StepForm';

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

export default () => {
  return (
    <div>
      <StepsForm
        onFinish={async (values) => {
          console.log(values);
        }}
      >
        <StepsForm.StepForm
          name="base"
          title="创建实验"
          onFinish={async () => {
            await waitTime(2000);
            return true;
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
        </StepsForm.StepForm>

        <StepsForm.StepForm name="checkbox" title="设置参数">
          <ProFormText
            name="age"
            label="年龄"
            placeholder="请输入年龄"
            width="s"
          />
        </StepsForm.StepForm>

        <StepsForm.StepForm name="time" title="发布实验">
          <ProFormText
            name="test"
            label="实验"
            placeholder="请输入实验"
            width="s"
          />
        </StepsForm.StepForm>
      </StepsForm>
    </div>
  );
};
