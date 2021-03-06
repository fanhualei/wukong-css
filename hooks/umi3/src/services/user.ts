import { request } from 'umi';

export async function query() {
  return request<API.CurrentUser[]>('/api/users');
}

export async function queryCurrent() {
  const aa = request<API.CurrentUser>('/api/currentUser');
  return aa;
}

export async function queryNotices(): Promise<any> {
  return request<{ data: API.NoticeIconData[] }>('/api/notices');
}

//模拟查询tags
export async function queryTags() {
  return request<API.Tags[]>('/api/tags');
}

//模拟一个update

export interface updateSettingParamType {
  name?: string;
  value?: number;
}

export async function updateSetting(params: updateSettingParamType) {
  console.log(params);
  return request<any>('/api/setting/update', {
    method: 'POST',
    data: params,
  });
}

//模拟得到一个用户列表，或删除一个用户列表
export interface userType {
  id: string;
  username: string;
}

export async function getUsers() {
  return request<userType[]>('/api/demo/getUsers');
}

export async function delUser(id: string) {
  return request<number>('/api/demo/delUser?id=' + id, { method: 'POST' });
}

export async function getSchool(id: string) {
  return request<string>('/api/demo/getSchool?id=' + id);
}

//模拟一个分页列表
export interface UserListItem {
  id: string;
  name: string;
  gender: 'male' | 'female';
  email: string;
  disabled: boolean;
  creator: string;
  status: string;
  createdAt: number;
  gradeId: number;
  memo: string;
}

export async function getUserList(params: {
  current?: number;
  pageSize?: number;
  filters?: {};
  sorter?: { field?: string; order?: ['ascend', 'descend'] };
}) {
  // console.log(params?.filters);
  // console.log(params?.sorter);
  console.log(params);
  return request<{ total: number; list: UserListItem[] }>(
    `/api/demo/getUserList`,
    {
      params: { ...params },
    },
  );
}

export interface LogListItem {
  logId: number;
  userId: string;
  actionType: string;
  createdAt: number;
  memo: string;
}

export async function getLogList(params: {
  current?: number;
  pageSize?: number;
  userId: string;
  filters?: {};
  sorter?: { field?: string; order?: ['ascend', 'descend'] };
}) {
  // console.log(params?.filters);
  console.log(params);
  return request<{ total: number; list: LogListItem[] }>(
    `/api/demo/getLogList`,
    {
      params: { ...params },
    },
  );
}

export interface IpLogItem {
  createdAtRange?: number[];
  createdAt: number;
  code: string;
}

export async function getIPLogList(params: {
  current?: number;
  pageSize?: number;
  filters?: {};
  sorter?: { field?: string; order?: ['ascend', 'descend'] };
}) {
  //console.log(params);
  return request<IpLogItem[]>(`/api/demo/getIPLogList`, {
    params: { ...params },
  });
}

export interface IpItem {
  ip?: string;
  cpu?: number | string;
  mem?: number | string;
  disk?: number | string;
  status: string;
}

export async function getIPList(params: {
  current?: number;
  pageSize?: number;
  filters?: {};
  sorter?: { field?: string; order?: ['ascend', 'descend'] };
}) {
  console.log(params);
  return request<IpItem[]>(`/api/demo/getIPList`, {
    params: { ...params },
  });
}

export interface AppItem {
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

export async function getAppList(params: {
  current?: number;
  pageSize?: number;
  filters?: {};
  sorter?: { field?: string; order?: ['ascend', 'descend'] };
}) {
  console.log(params);
  return request<{ total: number; list: AppItem[] }>(`/api/demo/getAppList`, {
    params: { ...params },
  });
}

export async function getAppByKey(params: { key: number }) {
  console.log(params);
  const list = request<{ total: number; list: AppItem[] }>(
    `/api/demo/getAppList`,
    {
      params: { ...params },
    },
  );
  return (await list).list[params.key];
}

export interface ListDataSourceItem {
  name: string;
  image: string;
  desc: string;
  progress: number;
  status: string;
  avatar: string;
  tags: { name: string; color: string }[];
  actions: { star: number; praise: number; repeat: number };
}

export async function getListDataSource() {
  const list = request<ListDataSourceItem[]>(`/api/demo/getListDataSource`);
  return list;
}
