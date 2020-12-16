import React from 'react';
import styles from './index.less';
import { Menu } from 'antd';
import { MenuInfo } from 'rc-menu/lib/interface';
import { history } from 'umi';

//自定义的内容
import { MenuDataItem } from '@ant-design/pro-layout/lib/typings';

import { useIntl } from 'umi';

const Header = (props: any) => {
  const { children } = props;
  return <div className={styles.header}>{children}</div>;
};

type siderProps = {
  matchMenuKeys: string[];
  menuData: MenuDataItem[];
  hide?: boolean;
  iconScriptUrl?: string;
};

const SubSider: React.FC<siderProps> = (props) => {
  const formatMessage = useIntl().formatMessage;
  const { matchMenuKeys, menuData } = props;

  //得到一级菜单的标示
  const parentMenuKey = matchMenuKeys[0];
  //得到这个级别下菜单的子菜单
  let subMenuData: MenuDataItem[] = [];
  menuData.forEach((item) => {
    if (item.path === parentMenuKey) {
      subMenuData = item.children || [];
    }
  });

  const menuClicked = (menu: MenuInfo) => {
    //console.log(menu);
    history.push(menu.key);
  };
  return (
    <div className={styles.subsider}>
      <Header>
        <h1>Ant Design Pro</h1>
      </Header>
      <Menu
        mode="inline"
        selectedKeys={matchMenuKeys}
        className={styles.menu}
        onClick={menuClicked}
      >
        {subMenuData.map((menu, index) => {
          var text = formatMessage({
            id: menu.locale || '',
            defaultMessage: menu.name,
          });
          return (
            <Menu.Item
              key={menu.key || menu.path}
              className={styles.customerSelected}
            >
              {text}
            </Menu.Item>
          );
        })}
      </Menu>
    </div>
  );
};

export default SubSider;
