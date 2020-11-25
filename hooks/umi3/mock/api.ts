import mockjs from 'mockjs';
import { Request, Response } from 'express';
import { delay } from 'roadhog-api-doc';

export interface UserListItem {
  id: string;
  name: string;
  gender: 'male' | 'female';
  email: string;
  disabled: boolean;
  creator: string;
  status: string;
  createdAt: number;
  memo: string;
  gradeId: number;
}

export interface UserSearchParams {
  current: number;
  pageSize: number;
  filters?: {};
  sorter?: { field?: string; order?: ['ascend', 'descend'] };
}

const valueEnum = {
  0: 'close',
  1: 'running',
  2: 'online',
  3: 'error',
};
const creators = ['付小小', '曲丽丽', '林东东', '陈帅帅', '兼某某'];

function fakeUserList(count: number): UserListItem[] {
  const list: UserListItem[] = [];

  for (let i = 1; i < count + 1; i++) {
    list.push(
      mockjs.mock({
        id: `${i}`,
        name: `@cname`,
        'gender|1': ['male', 'female'],
        email: '@email',
        'disabled|1': [true, false],
        creator: creators[Math.floor(Math.random() * creators.length)],
        status: valueEnum[Math.floor(Math.random() * 10) % 4],
        createdAt: Date.now() - Math.floor(Math.random() * 100000),
        gradeId: (Math.floor(Math.random() * 10) % 6) + 1,
        memo:
          i % 2 === 1
            ? '很长很长很长很长很长很长很长的文字要展示但是要留下尾巴'
            : '简短备注文案',
      }),
    );
  }
  return list;
}

const userListConst: UserListItem[] = fakeUserList(55);

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
    console.log('run /api/random');
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

  //模拟并行操作
  'GET /api/demo/getUserByName': (req: Request, res: Response) => {
    console.log('getUserByName');
    res.send({ id: '1', username: mockjs.mock('@cname') });
  },
  'GET /api/demo/getUserTodoList': (req: Request, res: Response) => {
    console.log(req.query.id + ':todo List');
    res.send(
      mockjs.mock({
        'list|3': [{ 'id|+1': 1, todoname: '去 @city', 'value|1-100': 50 }],
      }).list,
    );
  },

  //模拟依赖刷新
  'GET /api/demo/getSchool': (req: Request, res: Response) => {
    console.log(req.query.id);
    const id = req.query.id;
    switch (id) {
      case '1':
        res.status(200).send('Tsinghua University');
        break;
      case '2':
        res.status(200).send('Beijing University');
        break;
      case '3':
        res.status(200).send('Zhejiang University');
        break;
      default:
        res.status(200).send('none12333');
    }
  },

  //模拟一个分页列表
  'GET /api/demo/getUserList': (req: Request, res: Response) => {
    console.log(`/api/demo/getUserList`);

    let current: number = <number>(req.query.current || 1);
    const pageSize: number = <number>(req.query.pageSize || 10);

    const total: number = userListConst.length;
    const totalPage: number = Math.ceil(total / pageSize);

    const sorter = JSON.parse(
      (req.query.sorter ? req.query.sorter : '{}') as string,
    );
    const filters = JSON.parse(
      (req.query.filters ? req.query.filters : '{}') as string,
    );

    let currentList: UserListItem[] = userListConst;

    console.log(sorter);
    if (sorter) {
      currentList = currentList.sort((prev, next) => {
        const key = sorter['field'] as string;
        // @ts-ignore
        if (sorter[key] === 'descend') {
          // @ts-ignore
          return next[key] - prev[key];
        } else {
          // @ts-ignore
          return prev[key] - next[key];
        }
      });
    } else {
      currentList = userListConst;
    }

    if (current > totalPage) {
      current = totalPage;
    }
    if (current <= 0) {
      current = 1;
    }
    console.log(current);

    let renList: UserListItem[] = currentList.slice(
      (current - 1) * pageSize,
      current * pageSize,
    );

    res.send({
      total,
      list: renList,
    });
  },

  'GET /api/demo/getUserList1': (req: Request, res: Response) => {
    res.send(userListConst);
  },
};

export default delay(proxy, 1000);
