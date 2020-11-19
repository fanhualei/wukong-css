import React from 'react';
import { Card, Space } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';

import Login from './login';

import Sample from './sample';
import SampleEx from './sampleEx';
import SampleGroup from './sampleGroup';
import StepForm from './stepForm';

export default () => {
  return (
    <PageContainer subTitle="高级表单相关例子">
      <Card title="模拟登录" style={{ marginBottom: 16 }}>
        <Login />
      </Card>

      <Card title="基本表单" style={{ marginBottom: 16 }}>
        <Sample />
      </Card>

      <Card title="基本表单-扩展" style={{ marginBottom: 16 }}>
        <SampleEx />
      </Card>

      <Card title="基本表单-分组样式" style={{ marginBottom: 16 }}>
        <SampleGroup />
      </Card>

      <Card title="分布式表单" style={{ marginBottom: 16 }}>
        <StepForm />
      </Card>
    </PageContainer>
  );
};
