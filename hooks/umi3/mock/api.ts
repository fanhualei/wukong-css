import mockjs from 'mockjs';
import { Request, Response } from 'express';
import { delay } from 'roadhog-api-doc';

const proxy = {
  // 支持值为 Object 和 Array
  'GET /api/users': { users: [1, 2] },
  // GET 可忽略
  '/api/users/1': { id: 1 },
  // 支持自定义函数，API 参考 express@4
  'POST /api/users/create': (req: Request, res: Response) => {
    // 添加跨域请求头
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.end('ok');
  },
  // 使用 mockjs 等三方库
  'GET /api/tags': (req: Request, res: Response) => {
    //console.log(req.headers.authorization);
    res.send(
      mockjs.mock({
        'list|10': [{ name: '@city', 'value|1-100': 50, 'type|0-2': 1 }],
      }),
    );
  },
  'GET /api/random': '39553204a',
};

export default delay(proxy, 1000);
