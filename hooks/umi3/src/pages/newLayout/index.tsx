import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card } from 'antd';
import QueryTable from '@/pages/pro/table/queryTable';

export default () => {
  return (
    <PageContainer subTitle="ProCard例子">
      <Card title="查询表格" style={{ marginBottom: 15 }} key="QueryTable">
        <QueryTable />
      </Card>
    </PageContainer>
  );
};
