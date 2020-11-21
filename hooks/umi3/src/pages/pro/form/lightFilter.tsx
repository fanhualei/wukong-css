import React from 'react';
import { Radio, Button, Form, Checkbox, Divider } from 'antd';
import {
  LightFilter,
  ProFormText,
  ProFormRadio,
  ProFormSelect,
  ProFormSlider,
  ProFormTimePicker,
  ProFormDigit,
  ProFormSwitch,
  ProFormDatePicker,
  ProFormDateRangePicker,
  ProFormDateTimePicker,
} from '@ant-design/pro-form';
import { SizeType } from 'antd/lib/config-provider/SizeContext';

export default () => {
  const [size, setSize] = React.useState<SizeType>('middle');
  const [border, setBorder] = React.useState<boolean>(false);
  const [params, setParams] = React.useState({});

  return (
    <div key="lightquery" id="lightquery">
      <Form>
        <Radio.Group value={size} onChange={(e) => setSize(e.target.value)}>
          <Radio.Button value="middle">Middle</Radio.Button>
          <Radio.Button value="small">Small</Radio.Button>
        </Radio.Group>
        <Checkbox
          style={{ marginLeft: 35 }}
          checked={border}
          onChange={(e) => {
            console.log(e.target.checked);
            setBorder(e.target.checked);
          }}
        >
          边框
        </Checkbox>
      </Form>
      <br />
      <LightFilter
        size={size}
        onFinish={async (values) => {
          console.log(values);
          setParams(values);
        }}
        bordered={border}
      >
        <ProFormText name="name" label="名称" />
        <ProFormSelect
          name="sex"
          label="性别"
          //valueEnum={{ man: '男', woman: '女' }}
          options={[
            { value: 'man', label: '男' },
            { value: 'woman', label: '女' },
          ]}
        />

        <ProFormSelect
          name="area"
          label="地区"
          mode="multiple"
          valueEnum={{
            beijing: '北京',
            shanghai: '上海',
            guangzhou: '广州',
            long: '这是一个很长的用来测试溢出的项目',
          }}
        />

        <ProFormRadio.Group
          name="radio"
          radioType="button"
          options={[
            { value: 'weekly', label: '每周' },
            {
              value: 'quarterly',
              label: '每季度',
            },
            {
              value: 'monthly',
              label: '每月',
            },
            {
              value: 'yearly',
              label: '每年',
            },
          ]}
        />

        <ProFormSlider name="range" label="范围" range max={200} />
        <ProFormDigit name="count" label="数量" />
        <ProFormSwitch name="open" label="开关" />

        <ProFormDatePicker
          name="name3"
          label="不能清空的日期"
          allowClear={false}
        />
        <ProFormDateRangePicker name="date" label="日期范围" secondary />
        <ProFormDateTimePicker name="datetime" label="日期时间" secondary />
        <ProFormTimePicker name="time" label="时间" secondary />
      </LightFilter>
      <Divider />
      检索条件：{JSON.stringify(params)}
    </div>
  );
};
