import React from 'react';
import { isUrl, isImg } from '@ant-design/pro-utils';
import Icon from '@ant-design/icons';

/**
 * 根据参数来返回一个Icon组件，参数有以下形态：
 * 1：一个字符串
 *    1.1:如果是一个rul的地址或img，那么就直接显示
 *    1.2:如果'icon-'开头，那么就用传入的IconFont来进行显示。https://ant.design/components/icon-cn/
 * 2：否则就返回原组件，形态是：React.ReactNode
 */
const getIconReactNode = (
  icon: string | React.ReactNode,
  IconFont?: React.FC<{ type: string }>,
): React.ReactNode => {
  if (typeof icon === 'string' && icon !== '') {
    if (isUrl(icon) || isImg(icon)) {
      return (
        <Icon
          component={() => (
            <img src={icon} alt="icon" className="ant-pro-sider-menu-icon" />
          )}
        />
      );
    }
    if (icon.startsWith('icon-') && IconFont) {
      return <IconFont type={icon} />;
    }
  }
  return icon;
};

export default getIconReactNode;
