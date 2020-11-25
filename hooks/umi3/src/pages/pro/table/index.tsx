import React from 'react';
import { Button, Card, Anchor } from 'antd';
const { Link } = Anchor;
import ProForm, { ProFormText } from '@ant-design/pro-form';
import { PageContainer } from '@ant-design/pro-layout';

import style from './index.less';

import QueryTable from './queryTable';

import NoQueryTable from './noQueryTable';

export default () => {
  return (
    <>
      {/* <Anchor
        affix={true}
        style={{ float: 'right', marginRight: 25, paddingRight: 40 }}
        offsetTop={180}
      >
        <Link href="#demoLogin" title="登录表单" />
        <Link href="#demoSqmple" title="基础用法">
          <Link href="#demoSqmple" title="基本" />
          <Link href="#demoSampleEx" title="扩展" />
          <Link href="#demoSampleGroup" title="分组" />
        </Link>
      </Anchor> */}
      <PageContainer>
        <Card title="查询表格">
          <QueryTable />
        </Card>
      </PageContainer>

      <PageContainer>
        <Card title="不带查询条件:search={false}">
          <NoQueryTable />
        </Card>
      </PageContainer>
    </>
  );
};
