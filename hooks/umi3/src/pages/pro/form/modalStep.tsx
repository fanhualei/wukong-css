import React, { useState } from 'react';
import { Button, message, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import ProForm, {
  ModalForm,
  ProFormText,
  StepsForm,
} from '@ant-design/pro-form';

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

export default () => {
  const [visible, setVisible] = useState<boolean>(false);

  return (
    <div>
      <Button type="primary" onClick={() => setVisible(true)}>
        <PlusOutlined /> 新建表单
      </Button>
      <p style={{ marginTop: 15, color: '#6e6e6e' }}>
        <em>需要调用 stepsFormRender 来刷新出一个弹出层.</em>
      </p>
      <StepsForm
        onFinish={async (values) => {
          console.log(values);
          waitTime(1000);
          setVisible(false);
          message.success('保存成功');
        }}
        stepsFormRender={(dom, submitter) => {
          return (
            <Modal
              title="分布表单"
              width={800}
              onCancel={() => setVisible(false)}
              visible={visible}
              footer={submitter}
              destroyOnClose
              maskClosable={false}
            >
              {dom}
            </Modal>
          );
        }}
      >
        <StepsForm.StepForm name="base" title="创建实验">
          <ProFormText name="id" label="编号" />
        </StepsForm.StepForm>

        <StepsForm.StepForm name="checkbox" title="设置参数">
          <ProFormText name="name" label="名称" />
        </StepsForm.StepForm>

        <StepsForm.StepForm name="time" title="发布实验">
          <ProFormText name="age" label="年龄" />
        </StepsForm.StepForm>
      </StepsForm>
    </div>
  );
};
