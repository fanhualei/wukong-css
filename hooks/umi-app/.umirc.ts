import { IConfig } from 'umi-types';

// ref: https://umijs.org/config/
const config: IConfig = {
  treeShaking: true,
  routes: [
    {
      path: '/users',
      component: './users/_layout',
      routes: [
        { path: '/users', component: './users/index' },
        { path: '/users/list', component: './users/list' },
      ],
    },
    {
      path: '/',
      component: '../layouts/index',
      routes: [{ path: '/', component: './index' }],
    },
  ],
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    [
      'umi-plugin-react',
      {
        antd: true,
        dva: false,
        dynamicImport: false,
        title: 'umi-app',
        dll: true,

        routes: {
          exclude: [/components\//],
        },
      },
    ],
  ],
};

export default config;
