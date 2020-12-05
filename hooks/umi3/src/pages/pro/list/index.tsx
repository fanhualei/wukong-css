import React from 'react';
import { Card, Space, Statistic, Button, Steps } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import ProCard from '@ant-design/pro-card';

import Base from './base';
import Select from './select';
import Query from './query';
import Vertical from './vertical';

export default () => {
  return (
    <>
      <PageContainer subTitle="ProCard例子">
        <Space direction="vertical" size={26} style={{ width: '100%' }}>
          <Base />
          <Select />
          <Query />
          <Vertical />
        </Space>
      </PageContainer>
    </>
  );
};
