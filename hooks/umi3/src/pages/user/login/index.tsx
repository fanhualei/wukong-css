import React, { useState } from 'react';
import styles from './index.less';

import {
  Tabs,
  Form,
  Input,
  Button,
  Checkbox,
  Row,
  Col,
  Statistic,
  message,
} from 'antd';

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

import { LoginParamsType, fakeAccountLogin } from '@/services/login';

const { TabPane } = Tabs;
const { Countdown } = Statistic;

export default () => {
  const [loginType, setLoginType] = useState('1');
  const [autoLogin, setAutoLogin] = useState(true);
  const [captchaFlag, setCaptchaFlag] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (values: LoginParamsType) => {
    setSubmitting(true);
    values.type = loginType;
    values.autoLogin = autoLogin;
    console.log('Received values of form: ', values);
    try {
      // 登录
      const msg = await fakeAccountLogin(values);
      console.log(msg);
      if (msg.status === 'ok') {
        message.success('登录成功！');
      }
      // 如果失败去设置用户错误信息
    } catch (error) {
      message.error('登录失败，请重试！');
    }
    setSubmitting(false);
  };

  const onTabChange = (activeKey: any) => {
    console.log(activeKey);
    setLoginType(activeKey);
  };

  function onFinish() {
    console.log('finished!');
    setCaptchaFlag(false);
  }

  const onCaptchaClick = () => {
    console.log('test');
    message.success('获取验证码成功！验证码为：1234');
    setCaptchaFlag(true);
  };

  const deadline = Date.now() + 1000 * 15; // Moment is also OK

  return (
    <div className={styles.main}>
      <Form size="large" onFinish={handleSubmit}>
        <Tabs defaultActiveKey="1" onChange={onTabChange} centered>
          <TabPane tab="账户密码登录" key="1">
            {'1' == loginType && (
              <div>
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
                  <Input.Password
                    prefix={<LockTwoTone className={styles.prefixIcon} />}
                    placeholder="密码: ant.design"
                  />
                </Form.Item>
              </div>
            )}
          </TabPane>
          <TabPane tab="手机号登录" key="2">
            {'2' == loginType && (
              <div>
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
                      <Button
                        style={{ width: '100%' }}
                        disabled={captchaFlag}
                        onClick={onCaptchaClick}
                      >
                        {captchaFlag ? (
                          <Countdown
                            value={deadline}
                            format="s 秒"
                            valueStyle={{
                              color: 'rgba(0, 0, 0, 0.25)',
                              fontSize: 16,
                            }}
                            onFinish={onFinish}
                          />
                        ) : (
                          '获取验证码'
                        )}
                      </Button>
                    </Col>
                  </Row>
                </Form.Item>
              </div>
            )}
          </TabPane>
        </Tabs>

        <div>
          <Checkbox
            checked={autoLogin}
            onChange={(e) => {
              console.log(e.target.checked);
              setAutoLogin(e.target.checked);
            }}
          >
            自动登录
          </Checkbox>
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
            loading={submitting}
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
