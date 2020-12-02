import React from 'react';
import { Button, Card, Anchor } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import style from './index.less';

import Base from './base';

export default () => {
  return (
    <PageContainer>
      <Card title="基本详情页" style={{ marginBottom: 15 }} key="QueryTable">
        <Base />
      </Card>
    </PageContainer>
  );
};
