import './BasicLayout.less';

import React, { useContext } from 'react';

//直接引用ProLayout的接口，今后紧跟Pro的规范
import { BasicLayoutProps, ProSettings } from '@ant-design/pro-layout';
import { MenuDataItem } from '@ant-design/pro-layout/lib/typings';

//ant-design的工具类
import getMenuData from '@ant-design/pro-layout/lib/utils/getMenuData';
import useCurrentMenuLayoutProps from '@ant-design/pro-layout/lib/utils/useCurrentMenuLayoutProps';

//引入ant-design组件
import { Layout, ConfigProvider } from 'antd';
const { Header, Footer, Sider, Content } = Layout;
import { useDeepCompareEffect } from '@ant-design/pro-utils';

//引入umi组件
import { getMatchMenu } from '@umijs/route-utils';
import { useIntl } from 'umi';

//第三方组件
import { stringify } from 'use-json-comparison';
import Omit from 'omit.js';
import useMergedState from 'rc-util/lib/hooks/useMergedState';
import useAntdMediaQuery from 'use-media-antd-query';

//自己定义的组件
import MainSider from './MainSider';
import SubSider from './SubSider';
import HeadderContent from './HeaderContent';
import MyFooter from '@/components/Footer';
import RightContent from '@/components/RightContent';

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

  const intl = useIntl();
  const formatMessage = intl.formatMessage;

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
    getMenuData(route?.routes || [], menu, formatMessage, menuDataRender),
  );

  //得到当前的选择的菜单
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

  //得到页面大小
  const colSize = useAntdMediaQuery();
  const isMobile =
    (colSize === 'sm' || colSize === 'xs') && !props.disableMobile;

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

  const iconScriptUrl = '//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js';
  const [myCollapsed, setCollapsed] = React.useState(false);

  return (
    <div className={'framel'}>
      <Layout>
        <Sider
          style={
            myCollapsed
              ? { backgroundColor: '#fff', display: 'none' }
              : { backgroundColor: '#fff' }
          }
          width={64 + 130}
          collapsed={myCollapsed}
        >
          <div
            style={{ display: 'flex', flexDirection: 'row', height: '100%' }}
          >
            <MainSider
              matchMenuKeys={matchMenuKeys}
              menuData={menuData}
              iconScriptUrl={iconScriptUrl}
            />
            <SubSider
              matchMenuKeys={matchMenuKeys}
              menuData={menuData}
              iconScriptUrl={iconScriptUrl}
            />
          </div>
        </Sider>
        <Layout>
          <HeadderContent
            matchMenuKeys={matchMenuKeys}
            breadcrumbMap={breadcrumbMap}
            collapsed={myCollapsed}
            onCollapseClick={setCollapsed}
          >
            <RightContent />
          </HeadderContent>
          <Content>
            {children}
            {/* <MyFooter /> */}
          </Content>
          <Footer>
            <MyFooter />
          </Footer>
        </Layout>
      </Layout>
    </div>
  );
};

export default BasicLayout;
