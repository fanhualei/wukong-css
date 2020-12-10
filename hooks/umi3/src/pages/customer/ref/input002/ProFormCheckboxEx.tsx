import React, { useImperativeHandle } from 'react';
import { Row, Col } from 'antd';

import { ProFormCheckbox } from '@ant-design/pro-form';
import WrappedProFormCheckbox from '@ant-design/pro-form/lib/components/Checkbox';

import { CheckboxGroupProps, CheckboxProps } from 'antd/lib/checkbox';
import { ProFormItemProps } from '@ant-design/pro-form/lib/interface';

import styles from './index.less';

/**
 * 自定义的提示信息
 * @param extraEx 在右侧显示的提示信息
 */
interface MyProps extends ProFormItemProps<CheckboxProps> {
  extraEx?: React.ReactNode;
  leftSpan?: number;
}

/**
 * 自定义的组件
 * @param props 传入的参数
 * @param ref   向外暴漏的ref
 */
const ProFormCheckboxEx = (props: MyProps, ref: any) => {
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
        <ProFormCheckbox.Group {...proProps} />
      </Col>
      <Col span={24 - myLeftSpan}>
        <div className={styles.extraEx}>{extraEx}</div>
      </Col>
    </Row>
  );
};

export default React.forwardRef(ProFormCheckboxEx);
