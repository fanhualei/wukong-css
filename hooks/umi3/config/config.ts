import { defineConfig } from 'umi';

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
      name: '系统管理',
      access: 'canAdmin',
      icon: 'smile',
      routes: [
        {
          name: '角色管理',
          path: '/admin/role',
          component: '@/pages/admin/role',
        },
        {
          name: '用户管理',
          path: '/admin/user',
          component: 'admin/users',
        },
      ],
    },
    {
      component: './404',
    },
  ],
});
