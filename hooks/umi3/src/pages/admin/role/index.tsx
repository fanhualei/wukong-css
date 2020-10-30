import React from 'react';
import styles from './index.less';
import { Link, useModel, history, History } from 'umi';

export default () => {
  const { initialState, setInitialState } = useModel('@@initialState');
  console.log(initialState);
  return <div>role</div>;
};
