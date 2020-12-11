import { IRouteComponentProps } from 'umi';
import React from 'react';
import styles from './index.less';
import ProLayout, { PageContainer } from '@ant-design/pro-layout';
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import complexMenu from './complexMenu';

export default function Layout({
  children,
  location,
  route,
  history,
  match,
}: IRouteComponentProps) {
  return (
    <ProLayout
      style={{ height: '100%' }}
      siderWidth={162}
      location={{
        pathname: '/home',
      }}
      collapsedButtonRender={false}
      collapsed
      iconfontUrl="//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js"
      route={{
        routes: [
          {
            path: '/home',
            name: '收藏',
            icon: 'icon-shoucang1',
          },
          {
            path: '/home/overview',
            name: 'FaceBook',
            icon: 'icon-facebook',
          },
          {
            path: '/home/search',
            name: 'Twitter',
            icon: 'icon-twitter',
          },
        ],
      }}
      headerRender={false}
      disableContentMargin
    >
      <ProLayout
        location={{
          pathname: '/home/overview',
        }}
        route={{
          routes: complexMenu,
        }}
        navTheme="light"
        style={{
          height: '400px',
        }}
        rightContentRender={() => (
          <div>
            <Avatar shape="square" size="small" icon={<UserOutlined />} />
          </div>
        )}
        menuHeaderRender={false}
      >
        {children}
      </ProLayout>
    </ProLayout>
  );
}
