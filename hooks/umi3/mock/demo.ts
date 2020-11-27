import mockjs from 'mockjs';
import { Request, Response } from 'express';
import { delay } from 'roadhog-api-doc';

interface IpLogItem {
  createdAtRange?: number[];
  createdAt: number;
  code: string;
}

const ipLogList: IpLogItem[] = [];
for (let i = 0; i < 15; i += 1) {
  ipLogList.push({
    createdAt: Date.now() - Math.floor(Math.random() * 2000),
    createdAtRange: [
      Date.now() - Math.floor(Math.random() * 2000),
      Date.now() - Math.floor(Math.random() * 2000),
    ],
    code: `const getData = async params => {
            const data = await getData(params);
            return { list: data.data, ...data };
          };`,
  });
}

const valueEnum: string[] = ['success', 'error', 'processing', 'default'];
interface IpItem {
  ip?: string;
  cpu?: number | string;
  mem?: number | string;
  disk?: number | string;
  status: string;
}

const ipList: IpItem[] = [];
for (let i = 0; i < 10; i += 1) {
  ipList.push({
    ip: '106.14.98.124',
    cpu: Math.floor(Math.random() * 100),
    mem: Math.floor(Math.random() * 100),
    status: valueEnum[Math.floor(Math.random() * 10) % 4],
    disk: 30,
  });
}

//应用列表
interface AppItem {
  key: number;
  name: string;
  progress: number;
  containers: number;
  callNumber: number;
  creator: string;
  status: string;
  createdAt: number;
  memo: string;
}

const appListDataSource: AppItem[] = [];
const appStatus: string[] = ['close', 'running', 'online', 'error'];
const creators = ['付小小', '曲丽丽', '林东东', '陈帅帅', '兼某某'];

for (let i = 1; i < 150; i = i + 1) {
  appListDataSource.push({
    key: i,
    name: `AppName${i}`,
    progress: Math.ceil(Math.random() * 100) + 1,
    containers: Math.floor(Math.random() * 20),
    callNumber: Math.floor(Math.random() * 2000),
    creator: creators[Math.floor(Math.random() * creators.length)],
    status: appStatus[Math.floor(Math.random() * 10) % 4],
    createdAt: Date.now() - Math.floor(Math.random() * 100000),
    memo:
      i % 2 === 1
        ? '很长很长很长很长很长很长很长的文字要展示但是要留下尾巴'
        : '简短备注文案',
  });
}

const proxy = {
  'GET /api/demo/getIpLogList': (req: Request, res: Response) => {
    console.log(`/api/demo/getIpLogList`);
    res.send(ipLogList);
  },

  'GET /api/demo/getIpList': (req: Request, res: Response) => {
    console.log(`/api/demo/getIpList`);
    res.send(ipList);
  },

  //模拟一个分页列表
  'GET /api/demo/getAppList': (req: Request, res: Response) => {
    console.log(`/api/demo/getAppList`);

    let current: number = <number>(req.query.current || 1);
    const pageSize: number = <number>(req.query.pageSize || 10);

    const total: number = appListDataSource.length;
    const totalPage: number = Math.ceil(total / pageSize);

    const sorter = JSON.parse(
      (req.query.sorter ? req.query.sorter : '{}') as string,
    );
    const filters = JSON.parse(
      (req.query.filters ? req.query.filters : '{}') as string,
    );

    if (current > totalPage) {
      current = totalPage;
    }
    if (current <= 0) {
      current = 1;
    }
    console.log(current);

    let renList: AppItem[] = appListDataSource.slice(
      (current - 1) * pageSize,
      current * pageSize,
    );

    res.send({
      total,
      list: renList,
    });
  },
};

export default delay(proxy, 1000);
