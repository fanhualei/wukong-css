import React from 'react';
import {
  BasicLayoutProps,
  Settings as LayoutSettings,
} from '@ant-design/pro-layout';
import Footer from '@/components/Footer';

import RightContent from '@/components/RightContent';
import defaultSettings from '../config/defaultSettings';

export async function getInitialState(): Promise<{
  settings?: LayoutSettings;
  currentUser: API.CurrentUser;
}> {
  return {
    settings: defaultSettings,
    currentUser: {},
  };
}

export const layout = ({
  initialState,
}: {
  initialState: { settings?: LayoutSettings };
}): BasicLayoutProps => {
  return {
    rightContentRender: () => <RightContent />,
    footerRender: () => <Footer />,
    ...initialState?.settings,
  };
};
