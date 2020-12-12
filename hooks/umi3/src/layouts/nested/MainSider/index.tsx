import React, { useEffect } from 'react';
import './index.less';
import classNames from 'classnames';

import {
  HomeOutlined,
  SettingFilled,
  SmileOutlined,
  SyncOutlined,
  LoadingOutlined,
} from '@ant-design/icons';

type menuBoxProps = {
  text: string;
  icon: string;
  selected: boolean;
};

/**
 * 菜单组件
 * @param props
 */
const MenuBox: React.ReactNode = (props: menuBoxProps) => {
  return (
    <div className={classNames({ menuBoxLg: true, selected: props.selected })}>
      <HomeOutlined className={classNames('menuIcon')} />
      <div className={classNames('menuText')}>{props.text}</div>
    </div>
  );
};

type logoProps = {
  src: string;
};

/**
 * Logo组件
 * @param props
 */
const Logo = (props: logoProps) => {
  return (
    <div className={classNames('logoBox')}>
      <a>
        <img src={props.src} alt="logo" />
      </a>
    </div>
  );
};

const MainSider: React.FC<{}> = (props) => {
  return (
    <div className={classNames('mainSider')}>
      <Logo src="https://gw.alipayobjects.com/zos/antfincdn/PmY%24TNNDBI/logo.svg" />
      <MenuBox text="概况" selected={true} />
      <MenuBox text="商品" />
      <MenuBox text="店铺" />
      <MenuBox text="订单" />
      <MenuBox text="客户" />
      <MenuBox text="数据" />
      <MenuBox text="资产" />
      <MenuBox text="营销" />
      <MenuBox text="设置" />
    </div>
  );
};

export default MainSider;
