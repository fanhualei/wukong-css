import React from 'react';
import './index.less';

import classNames from 'classnames';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Breadcrumb } from 'antd';
import { useIntl } from 'umi';

import { MenuDataItem } from '@ant-design/pro-layout/lib/typings';

type headerProps = {
  matchMenuKeys?: string[];
  breadcrumbMap?: Map<string, MenuDataItem>;
  children?: React.ReactNode;
  collapsed: boolean;
  onCollapseClick: (collapsed: boolean) => void;
};

const HeadderContent: React.FC<headerProps> = (props) => {
  const { matchMenuKeys, breadcrumbMap, collapsed, onCollapseClick } = props;

  const formatMessage = useIntl().formatMessage;

  return (
    <div className={classNames({ header: true, fixed: false })}>
      <a
        className={classNames('menuFold')}
        onClick={() => onCollapseClick(!collapsed)}
      >
        {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </a>

      <div className={classNames('breadcrumb')}>
        <Breadcrumb>
          {matchMenuKeys?.map((key, index) => {
            const menu: any = breadcrumbMap?.get(key);
            if (menu) {
              return (
                <Breadcrumb.Item key={menu.path}>
                  {formatMessage({
                    id: menu.locale || '',
                    defaultMessage: menu.name,
                  })}
                </Breadcrumb.Item>
              );
            }
          })}
        </Breadcrumb>
      </div>
      <div className={classNames('left')}></div>
      <div className={classNames('right')}>{props.children}</div>
    </div>
  );
};

export default HeadderContent;
