import React from 'react';
import ProForm, { ProFormText, ProFormDatePicker } from '@ant-design/pro-form';
import { Button, Space, Row, Col } from 'antd';
import styles from './index.less';

export default () => {
  const leftSpan = 8;
  return (
    <ProForm>
      <Row gutter={[32, 16]} align="middle">
        <Col span={leftSpan}>
          <ProFormText
            name="company"
            label="公司名称"
            placeholder="请输入名称"
            width="m"
            tooltip="会在 label 旁增加一个 icon，悬浮后展示配置的信息"
          />
        </Col>
        <Col span={12}>
          <div className={styles.desc}>请输入公司的全称</div>
        </Col>
      </Row>

      <Row gutter={[32, 16]} align="middle">
        <Col span={leftSpan}>
          <ProFormDatePicker
            name="date"
            label="日期"
            width="m"
            rules={[
              {
                required: true,
                message: '请输入手机号!',
              },
            ]}
          />
        </Col>
        <Col span={12}>
          <div className={styles.desc}>
            请输入注册日期，如果不知道，点击 <a>查询链接</a>
          </div>
        </Col>
      </Row>
    </ProForm>
  );
};
