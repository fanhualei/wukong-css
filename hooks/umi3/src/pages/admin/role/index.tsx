import React from 'react';
import styles from './index.less';
import { Link, useModel } from 'umi';
import { useRequest } from 'ahooks';
import { queryTags } from '@/services/user';

export default () => {
  const { initialState, setInitialState } = useModel('@@initialState');
  //const { data, error, loading } = useRequest('/api/tags');
  const { data, error, loading } = useRequest(
    'https://helloacm.com/api/random/',
  );

  if (loading) {
    return <div>loading...</div>;
  }
  if (error) {
    return <div>{error.message}</div>;
  }

  //const name = data?.currentUser?.name;
  console.log(data);
  return <div>111:{data}</div>;
};
