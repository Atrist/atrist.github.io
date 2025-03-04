// 整体页面路由
import * as React from 'react';
import SlideMenu from './SlideMenu';
import styles from './index.module.less';

const Index = ({ children }) => {
  console.log('children: ', children);
  // headerMenu 应该是
  return (
    <div className={styles.content}>
      <main className={styles.main}>{children}</main>
    </div>
  );
};

export default Index;
