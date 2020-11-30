import React from 'react';
import { Button, Card, Anchor } from 'antd';
const { Link } = Anchor;
import ProForm, { ProFormText } from '@ant-design/pro-form';
import { PageContainer } from '@ant-design/pro-layout';

import style from './index.less';

import QueryTable from './queryTable';

import NoQueryTable from './noQueryTable';
import Expandable from './expandable';
import LeftAndRight from './leftAndRight';
import SelectTable from './selectTable';
import EffectTable from './effect';
import CustomerForm from './customerForm';

export default () => {
  return (
    <PageContainer>
      <Card title="查询表格" style={{ marginBottom: 15 }} key="QueryTable">
        <QueryTable />
      </Card>

      <Card
        title="不带查询条件:search={false} 无toolBar:toolBarRender={false}"
        style={{ marginBottom: 15 }}
        key="NoQueryTable"
      >
        <NoQueryTable />
      </Card>

      <Card title="嵌套表格" style={{ marginBottom: 15 }} key="Expandable">
        <Expandable />
      </Card>

      <Card title="左右结构" style={{ marginBottom: 15 }} key="leftAndRight">
        <LeftAndRight />
      </Card>

      <Card title="可选表格" style={{ marginBottom: 15 }} key="selectTable">
        <SelectTable />
      </Card>

      <Card title="定期轮询" style={{ marginBottom: 15 }} key="effectTable">
        <EffectTable />
      </Card>

      <Card
        title="自定义搜索框"
        style={{ marginBottom: 15 }}
        key="customerForm"
      >
        <CustomerForm />
      </Card>
    </PageContainer>
  );
};
