import React, { useRef } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card } from 'antd';
import ProForm, {
  StepsForm,
  ProFormText,
  ProFormDatePicker,
  ProFormSelect,
  ProFormTextArea,
  ProFormDigit,
  ProFormCheckbox,
  ProFormDateRangePicker,
} from '@ant-design/pro-form';
import Input001 from './input001';
import { ProFormTextEx, RowLayout } from './input002';
import { Button } from 'antd';

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
                会在 label 旁增加一个 icon <a>悬浮后展</a>{' '}
                这个组件是封装的比较麻烦
              </>
            }
          />

          <RowLayout extraEx="详细描述当前的内容">
            <ProFormDigit
              name="order"
              label="序号"
              placeholder="请输入序号"
              width="xs"
              rules={[{ required: true }]}
            />
          </RowLayout>

          <RowLayout extraEx="详细描述当前的内容">
            <ProFormTextArea label="合同备注说明" name="remark" />
          </RowLayout>

          <RowLayout
            extraEx={
              <>
                会在 label 旁增加一个 icon <a>悬浮后展</a>
              </>
            }
          >
            <ProFormText
              name="company111"
              label="公司名称"
              placeholder="请输入名称"
              width="m"
              tooltip="会在 label 旁增加一个 icon，悬浮后展示配置的信息"
              rules={[{ required: true }]}
            />
          </RowLayout>

          <RowLayout extraEx="详细描述当前的内容">
            <ProFormCheckbox.Group
              name="checkbox"
              layout="horizontal"
              label="行业分布"
              options={[
                '农业',
                '制造业',
                '互联网',
                '工业',
                '服务业',
                '银行业',
                '手工业',
                '造纸业',
              ]}
            />
          </RowLayout>
        </ProForm>
      </Card>
    </PageContainer>
  );
};
