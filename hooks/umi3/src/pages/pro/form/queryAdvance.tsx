import React, { useState, useRef } from 'react';
import { Form, Card, Input, Tabs } from 'antd';
const { TabPane } = Tabs;
const { Search } = Input;
import ProForm, {
  QueryFilter,
  ProFormText,
  ProFormDatePicker,
} from '@ant-design/pro-form';
import styles from './index.less';
import { DownOutlined, UpOutlined } from '@ant-design/icons';

export default () => {
  const quickSearch = ['小程序开发', '入驻', 'ISV 权限'];
  const [showFilter, setShowFilter] = useState<boolean>(true);
  const formRef: any = useRef();
  const tabKey = useRef<string>('articles');
  const [params, setParams] = useState({});

  return (
    <div>
      <Card>
        <Form>
          <Input.Search
            enterButton="搜索"
            size="large"
            onSearch={(value) => {
              setParams({ search: value, type: tabKey.current });
              formRef.current.submit();
            }}
            style={{ maxWidth: 500, width: '100%' }}
          />
          <span className={styles.quickSearch}>
            {quickSearch.map((text) => (
              <a key={text}>{text}</a>
            ))}
          </span>
        </Form>

        <Tabs
          onChange={(key) => {
            console.log(key);
            tabKey.current = key;
          }}
          tabBarExtraContent={
            <a
              className={styles.filterTrigger}
              onClick={() => {
                setShowFilter(!showFilter);
              }}
            >
              高级筛选{showFilter ? <UpOutlined /> : <DownOutlined />}
            </a>
          }
          className={showFilter ? '' : styles.hiddenLine}
        >
          <TabPane tab="文章" key="articles" />
          <TabPane tab="项目" key="projects" />
          <TabPane tab="应用" key="application" />
        </Tabs>

        <QueryFilter
          submitter={false}
          span={24}
          labelWidth="auto"
          split
          className={showFilter ? '' : styles.hiddenFilter}
          formRef={formRef}
          onFinish={async (values) => {
            setParams({ ...params, ...values });
            console.log(values);
            console.log(params);
          }}
        >
          <ProForm.Group title="名称">
            <ProFormText name="name" />
          </ProForm.Group>
          <ProForm.Group title="详情">
            <ProFormText name="age" label="年龄" />
            <ProFormDatePicker name="replyDate" label="反馈时间" />
          </ProForm.Group>
        </QueryFilter>
      </Card>

      <Card style={{ marginTop: -30 }}>
        {' '}
        <p>检索条件：{JSON.stringify(params)}</p>
      </Card>
    </div>
  );
};
