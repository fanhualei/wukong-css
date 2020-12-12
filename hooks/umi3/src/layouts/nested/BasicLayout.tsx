import './BasicLayout.less';

import React, { CSSProperties, useContext, useEffect, useState } from 'react';
import { Layout, ConfigProvider } from 'antd';
const { Header, Footer, Sider, Content } = Layout;
import classNames from 'classnames';
//直接引用ProLayout的接口，今后紧跟Pro的规范
import { BasicLayoutProps } from '@ant-design/pro-layout';
import MainSider from './MainSider';
import SubSider from './SubSider';
import HeadderContent from './HeaderContent';
import MyFooter from '@/components/Footer';
import RightContent from '@/components/RightContent';

import useMergedState from 'rc-util/lib/hooks/useMergedState';
import { getMatchMenu } from '@umijs/route-utils';
import getMenuData from './utils/getMenuData';
import getLocales, { LocaleType } from './locales';

//自定义的内容
import {
  MenuDataItem,
  MessageDescriptor,
  Route,
  RouterTypes,
  WithFalse,
} from './typings';

/**
 * 🌃 Powerful and easy to use beautiful layout
 * 🏄‍ Support multiple topics and layout types
 * @param props
 */
const BasicLayout: React.FC<BasicLayoutProps> = (props) => {
  const {
    children,
    onCollapse: propsOnCollapse,
    location = { pathname: '/' },
    contentStyle,
    route,
    defaultCollapsed,
    style,
    disableContentMargin,
    siderWidth = 208,
    menu,
    isChildrenLayout: propsIsChildrenLayout,
    menuDataRender,
    loading,
  } = props;
  const context = useContext(ConfigProvider.ConfigContext);
  const prefixCls = props.prefixCls ?? context.getPrefixCls('pro');

  return (
    <div className={'framel'}>
      <MainSider />
      <Layout>
        <Sider style={{ backgroundColor: '#fff' }} width={130}>
          <SubSider />
        </Sider>
        <Layout>
          <HeadderContent>
            <RightContent />
          </HeadderContent>
          <Content>{children}</Content>
          <Footer>
            <MyFooter />
          </Footer>
        </Layout>
      </Layout>
    </div>
  );
};

export default BasicLayout;
