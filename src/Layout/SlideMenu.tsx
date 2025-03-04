/**
 * 左侧导航栏
 */
import React from 'react';
import styles from './index.module.less';

export default ({ list }) => {
  console.log('list: ', list);
  return (
    <div className={styles.slide_menu}>
      {list.map((item) => (
        <div key={item}>
          <a href={item}>{item}</a>
        </div>
      ))}
    </div>
  );
};
