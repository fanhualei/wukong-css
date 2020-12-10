import React, { useImperativeHandle } from 'react';
import { Row, Col } from 'antd';

import { ProFormText } from '@ant-design/pro-form';
import { InputProps } from 'antd/lib/input';
import { ProFormItemProps } from '@ant-design/pro-form/lib/interface';
import { ExtendsProps } from '@ant-design/pro-form/lib/BaseForm/createField';

import styles from './index.less';

//ProFormText的原始props
type originalProps = Pick<
  ProFormItemProps<InputProps> & ExtendsProps,
  | 'children'
  | 'label'
  | 'style'
  | 'valuePropName'
  | 'id'
  | 'disabled'
  | 'placeholder'
  | 'className'
  | 'bordered'
  | 'secondary'
  | 'allowClear'
  | 'colSize'
  | 'params'
  | 'ignoreFormItem'
  | 'readonly'
  | 'transform'
  | 'formItemProps'
  | 'name'
  | 'dependencies'
  | 'getValueFromEvent'
  | 'normalize'
  | 'rules'
  | 'shouldUpdate'
  | 'trigger'
  | 'validateTrigger'
  | 'validateFirst'
  | 'getValueProps'
  | 'messageVariables'
  | 'initialValue'
  | 'onReset'
  | 'preserve'
  | 'isListField'
  | 'isList'
  | 'fieldProps'
  | 'width'
  | 'prefixCls'
  | 'noStyle'
  | 'hasFeedback'
  | 'validateStatus'
  | 'required'
  | 'hidden'
  | 'tooltip'
  | 'fieldKey'
  | 'colon'
  | 'htmlFor'
  | 'labelAlign'
  | 'labelCol'
  | 'requiredMark'
  | 'wrapperCol'
  | 'help'
  | 'extra'
  | 'status'
>;

/**
 * 自定义的提示信息
 * @param extraEx 在右侧显示的提示信息
 */
interface MyProps extends originalProps {
  extraEx?: React.ReactNode;
  leftSpan?: number;
}

/**
 * 自定义的组件
 * @param props 传入的参数
 * @param ref   向外暴漏的ref
 */
const ProFormTextEx = (props: MyProps, ref: any) => {
  const { extraEx, leftSpan, ...proProps } = props;

  //现在没有用
  useImperativeHandle(ref, () => ({
    readme: () => {
      console.log('author:fanhl');
    },
  }));

  //定义一个间隔
  let myLeftSpan = 10;
  if (leftSpan) {
    myLeftSpan = leftSpan;
  }
  return (
    <Row>
      <Col span={myLeftSpan}>
        <ProFormText {...proProps} />
      </Col>
      <Col span={24 - myLeftSpan}>
        <div className={styles.extraEx}>{extraEx}</div>
      </Col>
    </Row>
  );
};

export default React.forwardRef(ProFormTextEx);
