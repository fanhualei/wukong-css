import React from 'react';
import { Card, Space, Statistic, Button, Steps } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import ProCard from '@ant-design/pro-card';

import Base from './base';
import Select from './select';

export default () => {
  return (
    <>
      <PageContainer subTitle="ProCard例子">
        <Space direction="vertical" style={{ width: '100%' }}>
          <Base />
          <Select />
        </Space>
      </PageContainer>
    </>
  );
};
