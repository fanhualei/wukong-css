import React from 'react';
import { Tooltip, Tag, Space } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { useModel, SelectLang } from 'umi';
import Avatar from './AvatarDropdown';

import styles from './index.less';

export type SliderTheme = 'light' | 'dark';

const ENVTagColor = {
  dev: 'orange',
  test: 'green',
  pre: '#87d068',
};

const GlobalHeaderRight: React.FC<{}> = () => {
  const { initialState } = useModel('@@initialState');
  if (!initialState || !initialState.settings) {
    return null;
  }

  const { navTheme, layout } = initialState.settings;
  let className = styles.right;

  if ((navTheme === 'dark' && layout === 'top') || layout === 'mix') {
    className = `${styles.right} ${styles.dark}`;
  }

  return (
    <Space className={className}>
      <Avatar menu={true} />
      <SelectLang className={styles.action} />
    </Space>
  );
};

export default GlobalHeaderRight;
