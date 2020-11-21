import React from 'react';
import { Button, Card } from 'antd';
import { FooterToolbar, PageContainer } from '@ant-design/pro-layout';
import ProForm, { ProFormText, ProFormSelect } from '@ant-design/pro-form';

const valueEnum1 = {
  all: { text: '全部', status: 'Default' },
  open: {
    text: '未解决',
    status: 'Error',
  },
  closed: {
    text: '已解决',
    status: 'Success',
  },
};

const valueEnum2 = {
  all: '全部',
  open: '未解决',
  closed: '已解决',
};

const valueEnum3 = {
  all: { text: '全部', age: 123 },
  open: {
    text: '未解决',
    status: 'Error',
  },
  closed: {
    text: '已解决',
    status: 'Success',
  },
};

const options1 = [
  {
    label: 'item 1',
    value: 'a',
  },
  {
    label: 'item 2',
    value: 'b',
  },
  {
    label: 'item 3',
    value: 'c',
  },
];
// 或者不需要 label -这个是错误的
const options2 = { a: 'chapter', b: 'chapter2' };

const request1 = async (values: {}) => {
  console.log('values--------');
  console.log(values);

  return [
    { text: 'text', label: '全部', value: 'all' },
    { label: '未解决', value: 'open' },
    { label: '已解决', value: 'closed' },
    { label: '解决中', value: 'processing' },
  ];
};

export default () => {
  const [params, setParams] = React.useState({});

  return (
    <PageContainer>
      <Card>
        <ProForm
          onFinish={async (values) => {
            console.log(values);
          }}
          submitter={{
            render: (_, dom) => <FooterToolbar>{dom}</FooterToolbar>,
          }}
        >
          <ProFormText name="name" label="姓名" />
          <ProFormSelect name="s1" label="选择1" valueEnum={valueEnum1} />
          <ProFormSelect name="s2" label="选择2" valueEnum={valueEnum2} />
          <ProFormSelect name="s3" label="选择3" valueEnum={valueEnum3} />

          <ProFormSelect name="options1" label="options1" options={options1} />

          <ProFormSelect
            name="select2"
            label="Select"
            request={request1}
            params={params}
            placeholder="Please select a country"
          />
          <Button
            onClick={() => {
              setParams({ name: 'test' });
            }}
          >
            修改按钮
          </Button>
        </ProForm>
      </Card>
    </PageContainer>
  );
};
