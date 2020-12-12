import React from 'react';
import { Tooltip, Tag, Space, Badge } from 'antd';
import { QuestionCircleOutlined, BellOutlined } from '@ant-design/icons';
import { useModel, SelectLang } from 'umi';
import Avatar from './AvatarDropdown';
import Notic from './Notic';

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
      <Tooltip title="使用文档">
        <span
          className={styles.action}
          onClick={() => {
            window.location.href =
              'https://pro.ant.design/docs/getting-started';
          }}
        >
          <QuestionCircleOutlined />
        </span>
      </Tooltip>

      <Notic />
      <Avatar menu={true} />
      <SelectLang className={styles.action} />
    </Space>
  );
};

export default GlobalHeaderRight;
