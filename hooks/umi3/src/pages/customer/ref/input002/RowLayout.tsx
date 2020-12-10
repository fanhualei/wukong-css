import React from 'react';
import { Row, Col } from 'antd';
import styles from './index.less';

interface MyRowProps {
  extraEx?: React.ReactNode;
  leftSpan?: number;
  children?: React.ReactNode;
}

export default (props: MyRowProps) => {
  const { extraEx, leftSpan, children } = props;

  //定义一个间隔
  let myLeftSpan = 10;
  if (leftSpan) {
    myLeftSpan = leftSpan;
  }
  return (
    <Row>
      <Col span={myLeftSpan}>{children}</Col>
      <Col span={24 - myLeftSpan}>
        <div className={styles.extraEx}>{extraEx}</div>
      </Col>
    </Row>
  );
};
