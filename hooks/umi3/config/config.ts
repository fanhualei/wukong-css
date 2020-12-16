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
    //登录相关
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

    // 新的一种布局
    {
      path: '/shop',
      layout: false,
      component: '@/layouts/nested',
      exact: false,
      icon: 'smile',
      routes: [
        {
          name: 'overview',
          path: '/shop/overview',
          icon: 'HomeOutlined',
          routes: [
            {
              name: 'dashboard',
              path: '/shop/overview/dashboard',
              component: '@/pages/newLayout',
            },
          ],
        },
        {
          name: 'goods',
          path: '/shop/goods',
          icon: 'SketchOutlined',
          routes: [
            {
              //分类管理
              name: 'category',
              path: '/shop/goods/category',
              component: '@/pages/newLayout',
            },
            {
              //品牌管理
              name: 'brand',
              path: '/shop/goods/brand',
              component: '@/pages/newLayout',
            },
            {
              //商品总览
              name: 'list',
              path: '/shop/goods/list',
              component: '@/pages/newLayout',
            },
            {
              //类型管理
              name: 'typology',
              path: '/shop/goods/typology',
              component: '@/pages/newLayout',
            },
            {
              //规格管理
              name: 'specification',
              path: '/shop/goods/specification',
              component: '@/pages/newLayout',
            },
            {
              //图片空间
              name: 'imageSpace',
              path: '/shop/goods/imageSpace',
              component: '@/pages/newLayout',
            },
          ],
        },

        //店铺
        {
          name: 'store',
          path: '/shop/store',
          icon: 'ShopOutlined',
          routes: [
            {
              name: 'list',
              path: '/shop/store/list',
              component: '@/pages/newLayout',
            },
          ],
        },

        //会员
        {
          name: 'user',
          path: '/shop/user',
          icon: 'UserOutlined',
          routes: [
            {
              name: 'list',
              path: '/shop/user/list',
              component: '@/pages/newLayout',
            },
          ],
        },

        //交易
        {
          name: 'transaction',
          path: '/shop/transaction',
          icon: 'TransactionOutlined',
          routes: [
            {
              name: 'order',
              path: '/shop/transaction/order',
              component: '@/pages/newLayout',
            },
          ],
        },

        //内容
        {
          name: 'content',
          path: '/shop/content',
          icon: 'ProfileOutlined',
          routes: [
            {
              name: 'content',
              path: '/shop/content',
              component: '@/pages/newLayout',
            },
          ],
        },

        //运营
        {
          name: 'operation',
          path: '/shop/operation',
          icon: 'AccountBookOutlined',
          routes: [
            {
              name: 'operation',
              path: '/shop/operation',
              component: '@/pages/newLayout',
            },
          ],
        },

        //风控
        {
          name: 'risk',
          path: '/shop/risk',
          icon: 'PropertySafetyOutlined',
          routes: [
            {
              name: 'risk',
              path: '/shop/risk',
              component: '@/pages/newLayout',
            },
          ],
        },

        //统计
        {
          name: 'statistics',
          path: '/shop/statistics',
          icon: 'AreaChartOutlined',
          routes: [
            {
              name: 'statistics',
              path: '/shop/statistics',
              component: '@/pages/newLayout',
            },
          ],
        },

        //移动端
        {
          name: 'mobile',
          path: '/shop/mobile',
          icon: 'MobileOutlined',
          routes: [
            {
              name: 'home',
              path: '/shop/mobile/order',
              component: '@/pages/newLayout',
            },
          ],
        },

        //设置
        {
          name: 'setting',
          path: '/shop/setting',
          icon: 'SettingOutlined',
          routes: [
            {
              //基本信息
              name: 'baseInfo',
              path: '/shop/setting/baseInfo',
              component: '@/pages/newLayout',
            },
          ],
        },
      ],
    },

    // 老的布局
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
        {
          name: 'formFoot',
          path: '/pro/formFoot',
          component: '@/pages/pro/formFoot',
        },
        {
          name: 'table',
          path: '/pro/table',
          component: '@/pages/pro/table',
        },
        {
          name: 'editTable',
          path: '/pro/editTable',
          component: '@/pages/pro/editTable',
        },
        {
          name: 'description',
          path: '/pro/description',
          component: '@/pages/pro/description',
        },
        {
          name: 'card',
          path: '/pro/card',
          component: '@/pages/pro/card',
        },
        {
          name: 'list',
          path: '/pro/list',
          component: '@/pages/pro/list',
        },
      ],
    },
    {
      path: '/css',
      name: 'css',
      access: 'canAdmin',
      icon: 'smile',
      component: '@/pages/css',
    },

    {
      path: '/customer',
      name: 'customer',
      access: 'canAdmin',
      icon: 'smile',
      routes: [
        {
          name: 'ref',
          path: '/customer/ref',
          component: '@/pages/customer/ref',
        },
      ],
    },

    {
      path: 'http://localhost:8000/user/login',
      target: '_blank', // 点击新窗口打开
      name: 'gotlogin',
      icon: 'smile',
    },

    {
      component: './404',
    },
  ],
  // @ts-ignore
  proxy: proxy[REACT_APP_ENV || 'dev'],
});
