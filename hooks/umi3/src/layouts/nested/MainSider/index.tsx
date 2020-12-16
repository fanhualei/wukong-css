import React, { useEffect } from 'react';
import './index.less';
import classNames from 'classnames';
import { createFromIconfontCN } from '@ant-design/icons';

import getIcon from '../getIconReactNode';
import { history } from 'umi';

import { useIntl } from 'umi';

import { MenuDataItem } from '@ant-design/pro-layout/lib/typings';

type menuBoxProps = {
  text?: string;
  iconReactNode?: React.ReactNode;
  selected?: boolean;
  menu: MenuDataItem;
};

/**
 * 菜单组件
 * @param props
 */
const MenuBox = (props: menuBoxProps) => {
  return (
    <a
      className={classNames({
        menuBoxLg: true,
        selected: props.selected,
        noSelected: !props.selected,
      })}
      onClick={() => {
        if (props.menu.redirect) {
          history.push(props.menu.redirect);
        } else {
          const a = props.menu.children ? props.menu.children[0] : undefined;
          if (a) {
            history.push(a.path);
          }
        }
      }}
    >
      <div className={classNames('menuIcon')}>{props.iconReactNode}</div>
      <div className={classNames('menuText')}>{props.text}</div>
    </a>
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
            key={menu.key || menu.path}
            menu={menu}
            iconReactNode={iconReactNode}
            selected={menu.path == selectMenuKey}
          />
        );
      })}
    </div>
  );
};

export default MainSider;
