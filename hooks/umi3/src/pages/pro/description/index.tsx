import React from 'react';
import { Button, Card, Anchor } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import style from './index.less';

import Base from './base';
import Request from './request';
import Columns from './columns';

export default () => {
  return (
    <PageContainer>
      <Card title="基本详情页" style={{ marginBottom: 15 }} key="Base">
        <Base />
      </Card>

      <Card
        title={
          <>
            获取远程数据：
            <em style={{ fontSize: 11, color: '#666' }}>通过request获取数据</em>
          </>
        }
        style={{ marginBottom: 15 }}
        key="Request"
      >
        <Request />
      </Card>

      <Card
        title={
          <>
            获取远程数据：
            <em style={{ fontSize: 11, color: '#666' }}>
              通过columns定义内容,这样可以重用columns
            </em>
          </>
        }
        style={{ marginBottom: 15 }}
        key="Columns"
      >
        <Columns />
      </Card>
    </PageContainer>
  );
};
