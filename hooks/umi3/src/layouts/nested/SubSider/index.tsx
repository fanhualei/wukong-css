import React from 'react';
import styles from './index.less';
import { Menu } from 'antd';
const { SubMenu } = Menu;

const Header = (props: any) => {
  const { children } = props;
  return <div className={styles.header}>{children}</div>;
};

const SubSider: React.FC<{}> = (props) => {
  return (
    <div>
      <Header>
        <h1>Ant Design Pro</h1>
      </Header>
      <Menu mode="inline" selectedKeys={['2']}>
        <Menu.Item key="1" className={styles.customerSelected}>
          分类管理
        </Menu.Item>
        <Menu.Item key="2" className={styles.customerSelected}>
          品牌总览
        </Menu.Item>
        <Menu.Item key="3">商品总览</Menu.Item>
        <Menu.Item key="4">类型管理</Menu.Item>
        <Menu.Item key="5">规格管理</Menu.Item>
        <Menu.Item key="6">图片空间</Menu.Item>
      </Menu>
    </div>
  );
};

export default SubSider;
