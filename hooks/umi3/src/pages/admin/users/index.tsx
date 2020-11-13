import React, { useState } from 'react';
import { useRequest } from 'ahooks';
import { List, Avatar, Divider, Card, message } from 'antd';
import {
  queryCurrent,
  updateSetting,
  updateSettingParamType,
  getUsers,
  delUser,
  getSchool,
} from '@/services/user';
import styles from './index.less';
import { result, runInContext } from 'lodash';

export interface tag {
  name: string;
  value: number;
  type?: number;
}

export default () => {
  //直接从一个api获取数据
  const tagsReq = useRequest('/api/tags');

  //从一个service中获取数据
  const userReq = useRequest(queryCurrent);

  //手工触发一个update
  const [sName, setSName] = useState('');
  const userSettingUpdate = useRequest(updateSetting, {
    manual: true,
    onSuccess: (result, params) => {
      console.log(result);
      // console.log(params);
      if (result.sucess) {
      }
    },
  });

  //做一个轮询
  const usePolling = useRequest('/api/random', {
    pollingInterval: 3000,
    pollingWhenHidden: false,
    manual: true,
  });

  //做一个并发的例子
  const useUserList = useRequest(getUsers);
  const useDelUser = useRequest(delUser, {
    manual: true,
    fetchKey: (id) => id,
    onSuccess: (result, params) => {
      console.log(result);
      if (result) {
        message.success(`Disabled user ${params[0]}`);
      }
    },
  });

  //做一个串行的例子
  const useChun1 = useRequest('/api/demo/getUserByName?name=123', {
    manual: true,
  });
  const useChun2 = useRequest('/api/demo/getUserTodoList?id=1', {
    ready: !!useChun1?.data,
  });
  //console.log(useChun2?.data);

  //做一个防抖例子
  const useDeb = useRequest('/api/demo/getUserTodoList', {
    debounceInterval: 500,
    manual: true,
  });

  //做一个缓存 & SWR
  const useSwr = useRequest('/api/demo/getUserTodoList', {
    cacheKey: 'article',
    manual: true,
  });

  //做一个突变
  const useMutate = useRequest('/api/random', {
    manual: true,
    onSuccess: (result) => {
      useMutate.mutate('dddd');
    },
  });

  //依赖
  const [schoolId, setSchoolId] = useState('1');
  const useDep = useRequest(() => getSchool(schoolId), {
    refreshDeps: [schoolId],
  });

  if (tagsReq.loading) {
    return <div>loading...</div>;
  }
  if (tagsReq.error) {
    return <div>{tagsReq.error.message}</div>;
  }

  //console.log(tagsReq.data);
  //console.log(userReq.data);

  return (
    <Card title="useRequest例子" bordered={false}>
      <Divider orientation="left" plain dashed>
        从service获取数据
      </Divider>
      <div>
        <Avatar src={userReq?.data?.avatar} />
        {userReq?.data?.name}
      </div>

      <Divider orientation="left" plain dashed>
        从API获取数据
      </Divider>
      <List
        itemLayout="horizontal"
        dataSource={tagsReq.data.list}
        renderItem={(item: tag) => (
          <List.Item>
            <List.Item.Meta
              title={item.name}
              description={'生产总值：' + item.value + '亿元'}
            />
          </List.Item>
        )}
      />

      <Divider orientation="left" plain dashed>
        手工点击后触发获取数据
      </Divider>
      <input
        onChange={(e) => setSName(e.target.value)}
        value={sName}
        placeholder="请输入名称"
        style={{ width: 240, marginRight: 16 }}
      />
      <button
        disabled={userSettingUpdate.loading}
        type="button"
        onClick={() => userSettingUpdate.run({ name: sName, value: 123 })}
      >
        {userSettingUpdate.loading ? 'loading' : 'Edit'}
      </button>

      <Divider orientation="left" plain dashed>
        轮询
      </Divider>

      <p>UserName:{usePolling.loading ? 'loading.....' : usePolling.data}</p>
      <button type="button" onClick={usePolling.run}>
        start
      </button>
      <button
        type="button"
        onClick={usePolling.cancel}
        style={{ marginLeft: 8 }}
      >
        stop
      </button>

      <Divider orientation="left" plain dashed>
        并行处理：同一个函数
      </Divider>
      <p>
        默认情况下，新请求会覆盖旧请求。如果设置了
        fetchKey，则可以实现多个请求并行，fetches
        存储了多个请求的状态。外层的状态为最新触发的 fetches 数据。
      </p>
      <ul>
        {useUserList?.data?.map((user) => (
          <li key={user.id} style={{ marginTop: 8 }}>
            <button
              type="button"
              disabled={useDelUser?.fetches[user.id]?.loading}
              onClick={() => {
                useDelUser?.run(user.id);
              }}
            >
              delete {user.username}
            </button>
          </li>
        ))}
      </ul>

      <Divider orientation="left" plain dashed>
        串行处理：例如：先查询出用户编号，然后再查出待办事项
      </Divider>
      <p>
        User: {useChun1?.loading ? 'loading....' : useChun1?.data?.username}
      </p>

      {useChun1?.loading || useChun2?.loading ? (
        <p>'loading....'</p>
      ) : (
        <ul style={{ marginLeft: 28 }}>
          {useChun2?.data?.map((todo: any) => (
            <li key={todo.id}>{todo.todoname}</li>
          ))}
        </ul>
      )}

      <button
        type="button"
        onClick={() => {
          useChun1?.run();
        }}
      >
        查询
      </button>

      <Divider orientation="left" plain dashed>
        防抖：debounceInterval
      </Divider>
      <p>请输入内容</p>
      <input type="text" onChange={(e) => useDeb?.run(e.target.value)} />
      {useDeb?.loading ? (
        <p>loading...</p>
      ) : (
        <ul style={{ marginLeft: 28 }}>
          {useDeb?.data?.map((todo: any) => (
            <li key={todo.id}> {todo.todoname}</li>
          ))}
        </ul>
      )}

      <Divider orientation="left" plain dashed>
        缓存 SWR
      </Divider>
      <button
        onClick={() => {
          useSwr?.run({});
        }}
      >
        search
      </button>
      {useSwr?.loading ? (
        'loading....'
      ) : (
        <ul>
          {useSwr?.data?.map((todo: any) => (
            <li key={todo.id}>{todo.todoname}</li>
          ))}
        </ul>
      )}

      <Divider orientation="left" plain dashed>
        突变
      </Divider>
      <button
        onClick={() => {
          useMutate?.run({});
        }}
      >
        search
      </button>
      <p>{useMutate?.data}</p>

      <Divider orientation="left" plain dashed>
        依赖
      </Divider>
      <select onChange={(e) => setSchoolId(e.target.value)} value={schoolId}>
        <option value="1">school1</option>
        <option value="2">school2</option>
        <option value="3">school3</option>
      </select>
      <p>School:{useDep?.loading ? 'loading' : useDep?.data}</p>
    </Card>
  );
};
