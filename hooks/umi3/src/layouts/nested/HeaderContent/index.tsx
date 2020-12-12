import React from 'react';
import './index.less';

import classNames from 'classnames';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  HomeOutlined,
} from '@ant-design/icons';
import { Breadcrumb } from 'antd';

const HeadderContent: React.FC<{}> = (props) => {
  return (
    <div className={classNames({ header: true, fixed: false })}>
      <MenuFoldOutlined className={classNames('menuFold')} />
      <div className={classNames('breadcrumb')}>
        <Breadcrumb>
          <Breadcrumb.Item>
            <a href="">概况</a>
          </Breadcrumb.Item>
          <Breadcrumb.Item>品牌总览</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <div className={classNames('left')}></div>
      <div className={classNames('right')}>{props.children}</div>
    </div>
  );
};

export default HeadderContent;
