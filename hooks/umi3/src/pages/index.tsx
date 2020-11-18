import React from 'react';
import styles from './index.less';
import { PageContainer } from '@ant-design/pro-layout';
import bcImg from '../../public/home_bg.png';

import { Link } from 'umi';

export default () => {
  return (
    <PageContainer>
      <h1 className={styles.title}>Page index</h1>
      <p className="gtitle">test</p>

      <Link to="/login">aa</Link>
      <img
        src={bcImg}
        alt="logo"
        style={{ width: '80px', height: '80px', border: '1px solid red' }}
      />
    </PageContainer>
  );
};
