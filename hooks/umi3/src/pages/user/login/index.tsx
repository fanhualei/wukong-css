import React from 'react';
import styles from './index.less';

import { Tabs, Form, Input, Button, Checkbox, Row, Col } from 'antd';
import { Link, useModel, history, History } from 'umi';
import {
  UserOutlined,
  LockTwoTone,
  MobileTwoTone,
  MailTwoTone,
} from '@ant-design/icons';

import {
  AlipayCircleOutlined,
  TaobaoCircleOutlined,
  WeiboCircleOutlined,
} from '@ant-design/icons';

const { TabPane } = Tabs;

function callback(key: any) {
  console.log(key);
}

export default () => {
  return (
    <div className={styles.main}>
      <Form size="large">
        <Tabs defaultActiveKey="2" onClick={callback} centered>
          <TabPane tab="账户密码登录" key="1">
            <Form.Item
              name="username"
              rules={[{ required: true, message: '请输入用户名!' }]}
            >
              <Input
                prefix={<UserOutlined className={styles.prefixIcon} />}
                placeholder="用户名: admin or user"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[{ required: true, message: '请输入密码！' }]}
            >
              <Input
                prefix={<LockTwoTone className={styles.prefixIcon} />}
                placeholder="密码: ant.design"
              />
            </Form.Item>
          </TabPane>
          <TabPane tab="手机号登录" key="2">
            <Form.Item
              name="mobile"
              rules={[
                { required: true, message: '请输入手机号!' },
                { pattern: /^1\d{10}$/, message: '手机号格式错误！' },
              ]}
            >
              <Input
                prefix={<MobileTwoTone className={styles.prefixIcon} />}
                placeholder="手机号"
              />
            </Form.Item>
            <Form.Item
              name="captcha"
              rules={[{ required: true, message: '请输入验证码' }]}
            >
              <Row gutter={8} justify="end">
                <Col span={16}>
                  <Input
                    prefix={<MailTwoTone className={styles.prefixIcon} />}
                    placeholder="验证码"
                  />
                </Col>
                <Col span={8} className={styles.captcha_button}>
                  <Button>获取验证码</Button>
                </Col>
              </Row>
            </Form.Item>
          </TabPane>
        </Tabs>

        <div>
          <Checkbox>自动登录</Checkbox>
          <a
            style={{
              float: 'right',
            }}
          >
            忘记密码
          </a>
        </div>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className={styles.login_button}
          >
            登录
          </Button>
        </Form.Item>

        <div className={styles.other}>
          其他登录方式
          <AlipayCircleOutlined className={styles.icon} />
          <TaobaoCircleOutlined className={styles.icon} />
          <WeiboCircleOutlined className={styles.icon} />
          <Link className={styles.register} to="/user/register">
            注册账户
          </Link>
        </div>
      </Form>
    </div>
  );
};
