import { defineConfig } from 'umi';

import proxy from './proxy';

const { REACT_APP_ENV } = process.env;

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  layout: {
    name: 'Wukong Pro',
    locale: true,
  },

  locale: {
    // default zh-CN
    default: 'zh-CN',
    antd: true,
    // default true, when it is true, will use `navigator.language` overwrite default
    baseNavigator: true,
  },
  routes: [
    { path: '/', component: '@/pages/index', name: 'welcome', icon: 'smile' },
    {
      path: '/user',
      layout: false,
      component: '@/pages/user/_layout',
      exact: false,
      routes: [
        {
          name: 'login',
          path: '/user/login',
          component: '@/pages/user/login/index',
        },
        {
          component: './404',
        },
      ],
    },
    {
      path: '/admin',
      name: 'sysadmin',
      access: 'canAdmin',
      icon: 'smile',
      routes: [
        {
          name: 'role',
          path: '/admin/role',
          component: '@/pages/admin/role',
        },
        {
          name: 'user',
          path: '/admin/user',
          component: 'admin/users',
        },
        {
          name: 'table',
          path: '/admin/table',
          component: 'admin/table',
        },
        {
          name: 'ui',
          path: '/admin/ui',
          component: 'admin/ui',
        },
        {
          name: 'state',
          path: '/admin/state',
          component: 'admin/state',
        },
      ],
    },
    {
      path: '/pro',
      name: 'pro',
      access: 'canAdmin',
      icon: 'smile',
      routes: [
        {
          name: 'form',
          path: '/pro/form',
          component: '@/pages/pro/form',
        },
      ],
    },
    {
      component: './404',
    },
  ],
  // @ts-ignore
  proxy: proxy[REACT_APP_ENV || 'dev'],
});
