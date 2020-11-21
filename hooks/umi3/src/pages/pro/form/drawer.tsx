import React, { useRef } from 'react';
import { Button, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import ProForm, {
  DrawerForm,
  ProFormText,
  ProFormDatePicker,
  ProFormSelect,
} from '@ant-design/pro-form';

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

export default () => {
  return (
    <DrawerForm
      title="抽屉表单"
      trigger={
        <Button type="primary">
          <PlusOutlined /> 新建
        </Button>
      }
      onFinish={async (values) => {
        console.log(values);
        waitTime(1000);
        message.success('提交成功！');
        return true;
      }}
    >
      <ProForm.Group>
        <ProFormText
          name="customer"
          label="签约客户名称"
          width="m"
          tooltip="最长为 24 位"
          placeholder="请输入名称"
        />

        <ProFormText
          name="company"
          label="我方公司名称"
          placeholder="请输入名称"
          width="m"
        />

        <ProFormDatePicker name="date" label="签约时间" width="m" />

        <ProFormSelect
          width="m"
          name="unuseMode"
          label="合约失效方式"
          options={[
            { value: 'time', label: '履行完毕' },
            { value: 'person', label: '人为' },
          ]}
        />
      </ProForm.Group>

      <ProFormText width="m" name="id" label="主合同编号" />
      <ProFormText name="project" label="项目名称" />
    </DrawerForm>
  );
};
