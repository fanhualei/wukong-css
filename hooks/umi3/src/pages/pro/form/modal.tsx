import React, { useState } from 'react';
import { Button, message, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import ProForm, { ModalForm, ProFormText } from '@ant-design/pro-form';

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

export default () => {
  return (
    <ModalForm
      title="新建表单"
      trigger={
        <Button type="primary">
          <PlusOutlined /> 新建表单
        </Button>
      }
      onFinish={async (values) => {
        console.log(values);
        await waitTime(2000);
        message.success('提交成功');
        return true;
      }}
      modalProps={{
        maskClosable: false,
        okText: '点一下就知道了',
      }}
    >
      <ProFormText name="id" initialValue="师父，什么是自然呀？" />
    </ModalForm>
  );
};
