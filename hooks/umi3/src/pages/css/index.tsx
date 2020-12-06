import React from 'react';
import { Button } from 'antd';
import styles from './index.less';
import styles1 from './test.less';

export default () => {
  return (
    <>
      <div className="gtitle">在global.less中定义</div>
      <div className="gpink">使用:global来在某个less文件中定义：不起作用</div>
      <div className={styles.title}>你好</div>
      <Button className={styles.customButton}> 覆盖Ant Button样式 </Button>
      <Button> 没有覆盖Ant Button样式 </Button>
    </>
  );
};
