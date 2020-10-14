import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  layout: {
    name: 'Wukong Pro',
    locale: true,
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
      component: './404',
    },
  ],
});
