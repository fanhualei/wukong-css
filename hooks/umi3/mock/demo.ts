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

const valueEnum: [] = ['success', 'error', 'processing', 'default'];
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

const proxy = {
  'GET /api/demo/getIpLogList': (req: Request, res: Response) => {
    console.log(`/api/demo/getIpLogList`);
    res.send(ipLogList);
  },

  'GET /api/demo/getIpList': (req: Request, res: Response) => {
    console.log(`/api/demo/getIpList`);
    res.send(ipList);
  },
};

export default delay(proxy, 1000);
