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
}

export async function getUserList(params: {
  current: number;
  pageSize: number;
  gender?: string;
}) {
  return request<{ total: number; list: UserListItem[] }>(
    `/api/demo/getUserList?current=${params?.current}&pageSize=${params?.pageSize}`,
  );
}
