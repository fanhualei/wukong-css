import React from 'react';
import { Badge } from 'antd';
import { BellOutlined } from '@ant-design/icons';
import classNames from 'classnames';

import styles from './index.less';

const Notic: React.FC<{}> = () => {
  return (
    <span className={classNames(styles.noticeButton, { opened: false })}>
      <Badge count={11} style={{ boxShadow: 'none' }} className={styles.badge}>
        <BellOutlined className={styles.icon} />
      </Badge>
    </span>
  );
};

export default Notic;
