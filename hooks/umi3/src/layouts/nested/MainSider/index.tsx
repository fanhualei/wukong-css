import React, { useEffect } from 'react';
import './index.less';
import classNames from 'classnames';
import { isUrl, isImg } from '@ant-design/pro-utils';
import Icon, { createFromIconfontCN } from '@ant-design/icons';

import getIcon from '../getIconReactNode';

import {
  HomeOutlined,
  SettingFilled,
  SmileOutlined,
  SyncOutlined,
  LoadingOutlined,
} from '@ant-design/icons';
import { useIntl } from 'umi';

//自定义的内容
import {
  MenuDataItem,
  MessageDescriptor,
  Route,
  RouterTypes,
  WithFalse,
} from '../typings';

type menuBoxProps = {
  text?: string;
  iconReactNode?: React.ReactNode;
  selected?: boolean;
};

/**
 * 菜单组件
 * @param props
 */
const MenuBox = (props: menuBoxProps) => {
  return (
    <div className={classNames({ menuBoxLg: true, selected: props.selected })}>
      <div className={classNames('menuIcon')}>{props.iconReactNode}</div>
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

/**
 * 主要侧边栏
 * @param props
 */

type mainSiderProps = {
  matchMenuKeys?: string[];
  menuData?: MenuDataItem[];
  onMenuHeaderClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  hide?: boolean;
  iconScriptUrl?: string;
};

const MainSider: React.FC<mainSiderProps> = (props) => {
  console.log(props);
  const { menuData, matchMenuKeys } = props;
  const selectMenuKey = matchMenuKeys ? matchMenuKeys?.[0] : '';
  const formatMessage = useIntl().formatMessage;
  let IconFont = createFromIconfontCN({
    scriptUrl: props.iconScriptUrl,
  });

  return (
    <div className={classNames('mainSider')}>
      <Logo src="https://gw.alipayobjects.com/zos/antfincdn/PmY%24TNNDBI/logo.svg" />

      {menuData?.map((menu, index) => {
        var text = formatMessage({
          id: menu.locale || '',
          defaultMessage: menu.name,
        });

        const iconReactNode = getIcon(menu.icon, IconFont);
        return (
          <MenuBox
            text={text}
            key={`mainSiderMenu${index}`}
            iconReactNode={iconReactNode}
            selected={menu.path == selectMenuKey}
          />
        );
      })}
      {/* <MenuBox text="概况" selected={true} />
      <MenuBox text="商品" />
      <MenuBox text="店铺" />
      <MenuBox text="订单" />
      <MenuBox text="客户" />
      <MenuBox text="数据" />
      <MenuBox text="资产" />
      <MenuBox text="营销" />
      <MenuBox text="设置" /> */}
    </div>
  );
};

export default MainSider;
