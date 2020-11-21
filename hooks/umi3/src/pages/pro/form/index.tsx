import React from 'react';
import { Card, Space, Anchor, Button } from 'antd';
const { Link } = Anchor;
import { PageContainer } from '@ant-design/pro-layout';

import Login from './login';

import Sample from './sample';
import SampleEx from './sampleEx';
import SampleGroup from './sampleGroup';
import StepForm from './stepForm';
import Modal from './modal';
import ModalStep from './modalStep';
import Drawer from './drawer';
import Query from './query';
import QueryAdvance from './queryAdvance';

export default () => {
  return (
    <>
      <Anchor
        affix={true}
        style={{ float: 'right', marginRight: 25, paddingRight: 40 }}
        offsetTop={230}
      >
        <Link href="#demoLogin" title="登录表单" />
        <Link href="#demoSqmple" title="基础用法">
          <Link href="#demoSqmple" title="基本" />
          <Link href="#demoSampleEx" title="扩展" />
          <Link href="#demoSampleGroup" title="分组" />
        </Link>
        <Link href="#demoStepForm" title="分步表单" />
        <Link href="#demoModal" title="弹出层表单">
          <Link href="#demoModal" title="基本用法" />
          <Link href="#demoModalStep" title="分步提交" />
        </Link>
        <Link href="#demoDrawer" title="抽屉表单" />

        <Link href="#demoQuery" title="查询表单">
          <Link href="#demoQuery" title="基本用法" />
          <Link href="#demoQueryAdvance" title="高级查询" />
        </Link>
      </Anchor>
      <PageContainer subTitle="高级表单相关例子">
        <Button
          type="primary"
          onClick={() => {
            console.log('dddddd');
          }}
        >
          ddddd
        </Button>
        <Card title="模拟登录" style={{ marginBottom: 16 }} id="demoLogin">
          <Login />
        </Card>

        <Card title="基本表单" style={{ marginBottom: 16 }} id="demoSqmple">
          <Sample />
        </Card>

        <Card
          title="基本表单-扩展"
          style={{ marginBottom: 16 }}
          id="demoSampleEx"
        >
          <SampleEx />
        </Card>

        <Card
          title="基本表单-分组样式"
          style={{ marginBottom: 16 }}
          id="demoSampleGroup"
        >
          <SampleGroup />
        </Card>

        <Card title="分步式表单" style={{ marginBottom: 16 }} id="demoStepForm">
          <StepForm />
        </Card>

        <Card title="Modal弹出表单" style={{ marginBottom: 16 }} id="demoModal">
          <Modal />
        </Card>

        <Card
          title="Modal弹出表单-分布表单"
          style={{ marginBottom: 16 }}
          id="demoModalStep"
        >
          <ModalStep />
        </Card>

        <Card title="抽屉表单" style={{ marginBottom: 16 }} id="demoDrawer">
          <Drawer />
        </Card>

        <Card title="查询表单" style={{ marginBottom: 16 }} id="demoQuery">
          <Query />
        </Card>

        <Card
          title="高级查询"
          style={{ marginBottom: 16 }}
          id="demoQueryAdvance"
        >
          <QueryAdvance />
        </Card>
      </PageContainer>
    </>
  );
};
