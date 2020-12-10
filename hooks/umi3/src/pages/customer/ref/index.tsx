import React, { useRef } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card } from 'antd';
import ProForm, {
  StepsForm,
  ProFormText,
  ProFormDatePicker,
  ProFormSelect,
  ProFormTextArea,
  ProFormCheckbox,
  ProFormDateRangePicker,
} from '@ant-design/pro-form';
import Input001 from './input001';
import { ProFormTextEx, ProFormDigitEx, ProFormTextAreaEx } from './input002';
import { Button } from 'antd';

type Foo = {
  a: string;
};

type Bar = Foo & {
  b: string;
  c: String;
};

const w: Partial<Bar> = { b: 'www' };
console.log(w);

export default () => {
  const fancyInputRef: any = useRef();

  return (
    <PageContainer>
      <Card title="封装组件">
        <Input001 ref={fancyInputRef} />
        <button onClick={() => fancyInputRef.current.focus1()}>focus</button>
      </Card>

      <Card title="封装Pro组件" style={{ marginTop: 16 }}>
        <ProForm
          onFinish={async (values) => {
            console.log(values);
          }}
        >
          <ProFormTextEx
            name="company"
            label="公司名称"
            placeholder="请输入名称"
            width="m"
            tooltip="会在 label 旁增加一个 icon，悬浮后展示配置的信息"
            rules={[{ required: true }]}
            //extra="会在 label 旁增加一个 icon，悬浮后展示配置的信息"
            extraEx={
              <>
                会在 label 旁增加一个 icon <a>悬浮后展</a>
              </>
            }
          />

          <ProFormDigitEx
            name="order"
            label="序号"
            placeholder="请输入序号"
            width="xs"
            rules={[{ required: true }]}
            extraEx="序号：0-255,越大越靠前。"
          />

          <ProFormTextAreaEx
            label="合同备注说明"
            name="remark"
            extraEx="详细描述当前的内容"
          />
        </ProForm>
      </Card>
    </PageContainer>
  );
};
