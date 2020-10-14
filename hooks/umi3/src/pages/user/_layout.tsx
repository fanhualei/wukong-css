import { IRouteComponentProps } from 'umi';
import React from 'react';
import styles from './_layout.less';

export default function Layout({
  children,
  location,
  route,
  history,
  match,
}: IRouteComponentProps) {
  return (
    <div className={styles.contener}>
      <div className={styles.lang}>lang</div>
      <div className={styles.content}>
        <div className={styles.title}>
          <img alt="logo" src="/static/logo.f0355d39.svg" />
          <h3>Wukong Pro</h3>
          <p> Ant Design 是西湖区最具影响力的 Web 设计规范</p>
        </div>
        <div className={styles.main}>{children}</div>
      </div>
      <div className={styles.footer}>
        <div className={styles.links}>
          <a href="">Ant Design Pro</a>
          <a href="">aaaa</a>
          <a href="">Ant Design</a>
        </div>
        <div className={styles.copyright}>
          Copyright 2019 蚂蚁金服体验技术部出品
        </div>
      </div>
    </div>
  );
}
