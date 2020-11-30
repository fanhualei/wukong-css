import React from 'react';
import { Button, Card } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import style from './index.less';
import EditTable from './editTable';

export default () => {
  return (
    <PageContainer>
      <EditTable />
    </PageContainer>
  );
};
