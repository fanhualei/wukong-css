﻿import { omitUndefined } from '@ant-design/pro-utils';
import { useEffect, useState } from 'react';
import { ProSettings } from '../defaultSettings';

const useCurrentMenuLayoutProps = (currentMenu: ProSettings) => {
  const [currentMenuLayoutProps, setCurrentMenuLayoutProps] = useState({});

  useEffect(() => {
    setCurrentMenuLayoutProps(
      omitUndefined({
        // 有时候会变成对象，是原来的方式
        layout: typeof currentMenu.layout !== 'object' ? currentMenu.layout : undefined,
        navTheme: currentMenu.navTheme,
        menuRender: currentMenu.menuRender,
        footerRender: currentMenu.footerRender,
        menuHeaderRender: currentMenu.menuHeaderRender,
        headerRender: currentMenu.headerRender,
        fixSiderbar: currentMenu.fixSiderbar,
        headerTheme: currentMenu.headerTheme,
      }),
    );
  }, [
    currentMenu.layout,
    currentMenu.navTheme,
    currentMenu.menuRender,
    currentMenu.footerRender,
    currentMenu.menuHeaderRender,
    currentMenu.headerRender,
    currentMenu.fixSiderbar,
    currentMenu.headerTheme,
  ]);
  return currentMenuLayoutProps;
};

export default useCurrentMenuLayoutProps;
