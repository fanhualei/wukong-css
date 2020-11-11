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
        'list|3': [{ name: '@city', 'value|1-100': 50, 'type|0-2': 1 }],
      }),
    );
  },
  'GET /api/random': (req: Request, res: Response) => {
    res.send('"' + mockjs.mock('@cname') + '"');
  },

  //模拟了一个update数据
  'POST /api/setting/update': (req: Request, res: Response) => {
    console.log(req.body);
    console.log('--------------------');
    const { name, value } = req.body;
    console.log(name + ':' + value);
    res.send({ data: { name, value }, success: true });
  },

  //模拟得到用户列表
  'GET /api/demo/getUsers': (req: Request, res: Response) => {
    res.send([
      { id: '1', username: 'A' },
      { id: '2', username: 'B' },
      { id: '3', username: 'C' },
    ]);
  },
  //模拟删除一个用户
  'POST /api/demo/delUser': (req: Request, res: Response) => {
    console.log(req.query.id);
    res.send('1');
  },
  'GET /api/demo/delUser': (req: Request, res: Response) => {
    console.log(req.query.id + 'ddd');
    res.send('1');
  },
};

export default delay(proxy, 1000);
