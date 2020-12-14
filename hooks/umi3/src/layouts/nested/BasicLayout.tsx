import './BasicLayout.less';

import React, { CSSProperties, useContext, useEffect, useState } from 'react';
import { createFromIconfontCN } from '@ant-design/icons';
import { Layout, ConfigProvider } from 'antd';
const { Header, Footer, Sider, Content } = Layout;
import classNames from 'classnames';
//直接引用ProLayout的接口，今后紧跟Pro的规范
import { BasicLayoutProps, ProSettings } from '@ant-design/pro-layout';
import {
  useDeepCompareEffect,
  useDocumentTitle,
  isBrowser,
} from '@ant-design/pro-utils';
import MainSider from './MainSider';
import SubSider from './SubSider';
import HeadderContent from './HeaderContent';
import MyFooter from '@/components/Footer';
import RightContent from '@/components/RightContent';

import useMergedState from 'rc-util/lib/hooks/useMergedState';
import { getMatchMenu } from '@umijs/route-utils';
import getMenuData from './utils/getMenuData';
import getLocales, { LocaleType } from './locales';
import useCurrentMenuLayoutProps from './utils/useCurrentMenuLayoutProps';
import compatibleLayout from './utils/compatibleLayout';
import useAntdMediaQuery from 'use-media-antd-query';
import { stringify } from 'use-json-comparison';
import Omit from 'omit.js';

import { useIntl } from 'umi';

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

  // console.log(context, prefixCls);
  //console.log(props.formatMessage);

  const intl = useIntl();
  const aa = intl.formatMessage({
    id: 'menu.first',
    defaultMessage: '你好，旅行者',
  });
  //console.log(aa);

  const formatMessage = intl.formatMessage;
  /**
   * 定义一个翻译多语言的函数
   * 如果有props的formatMessage，那么就是用外部的函数。否则就用自己的。
   */
  // const formatMessage = ({
  //   id,
  //   defaultMessage,
  //   ...restParams
  // }: {
  //   id: string;
  //   defaultMessage?: string;
  // }): string => {
  //   if (props.formatMessage) {
  //     console.log('locales---------------------');
  //     return props.formatMessage({
  //       id,
  //       defaultMessage,
  //       ...restParams,
  //     });
  //   }

  //   const locales = getLocales();
  //   console.log(locales);
  //   return locales[id] ? locales[id] : (defaultMessage as string);
  // };
  ``;
  /**
   * 得到菜单信息
   */
  const [menuInfoData, setMenuInfoData] = useMergedState<{
    breadcrumb?: {
      [key: string]: MenuDataItem;
    };
    breadcrumbMap?: Map<string, MenuDataItem>;
    menuData?: MenuDataItem[];
  }>(() =>
    getMenuData(route?.routes || [], menu, intl.formatMessage, menuDataRender),
  );

  const { breadcrumb = {}, breadcrumbMap, menuData = [] } = menuInfoData;
  const matchMenus = getMatchMenu(location.pathname || '/', menuData, true);
  const matchMenuKeys = Array.from(
    new Set(matchMenus.map((item) => item.key || item.path || '')),
  );

  // 当前选中的menu，一般不会为空
  const currentMenu = (matchMenus[matchMenus.length - 1] || {}) as ProSettings &
    MenuDataItem;
  const currentMenuLayoutProps = useCurrentMenuLayoutProps(currentMenu);
  const { fixSiderbar, navTheme, layout: defaultPropsLayout, ...rest } = {
    ...props,
    ...currentMenuLayoutProps,
  };

  const propsLayout = compatibleLayout(defaultPropsLayout);

  // console.log(menuInfoData, matchMenus, matchMenuKeys);

  const colSize = useAntdMediaQuery();

  const isMobile =
    (colSize === 'sm' || colSize === 'xs') && !props.disableMobile;

  //console.log(colSize);
  /**
   *  如果 menuRender 不存在，可以做一下性能优化
   *  只要 routers 没有更新就不需要重新计算
   */
  useDeepCompareEffect(() => {
    if (menu?.loading) {
      return () => null;
    }
    const infoData = getMenuData(
      route?.routes || [],
      menu,
      intl.formatMessage,
      menuDataRender,
    );
    // 稍微慢一点 render，不然会造成性能问题，看起来像是菜单的卡顿
    const animationFrameId = requestAnimationFrame(() => {
      setMenuInfoData(infoData);
    });
    return () =>
      window.cancelAnimationFrame &&
      window.cancelAnimationFrame(animationFrameId);
  }, [props.route, stringify(menu)]);

  // If it is a fix menu, calculate padding
  // don't need padding in phone mode
  const hasLeftPadding = propsLayout !== 'top' && !isMobile;

  const [collapsed, onCollapse] = useMergedState<boolean>(
    defaultCollapsed || false,
    {
      value: props.collapsed,
      onChange: propsOnCollapse,
    },
  );

  // Splicing parameters, adding menuData and formatMessage in props
  const defaultProps = Omit(
    {
      prefixCls,
      ...props,
      siderWidth,
      ...currentMenuLayoutProps,
      formatMessage,
      breadcrumb,
      layout: propsLayout as 'side',
    },
    ['className', 'style'],
  );

  const iconScriptUrl = '//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js';

  return (
    <div className={'framel'}>
      <MainSider
        matchMenuKeys={matchMenuKeys}
        menuData={menuData}
        iconScriptUrl={iconScriptUrl}
      />
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
