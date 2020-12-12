import React from 'react';
import styles from './index.less';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';

const HeadderContent: React.FC<{}> = (props) => {
  return (
    <div className={''}>
      <MenuFoldOutlined className={styles.menuFold} />
    </div>
  );
};

export default HeadderContent;
