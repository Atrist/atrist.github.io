/** 头部组件 */
import React from 'react';
import { Link } from 'gatsby';
import { navConfig } from '../conifg';
import styles from './Head.module.less';
interface HeadProps {
  site: {
    siteMetadata: {
      title: string;
      description: string;
      siteUrl: string;
    };
  };
}
export default (props: HeadProps) => {
  const { siteMetadata } = props.site;
  return (
    <div className={styles.header}>
      <div className={styles.name}>{siteMetadata?.title}</div>
      <div className={styles.nav}>
        {navConfig.map((item) => {
          if (item.items) {
            // 再生成一个 鼠标悬浮的下拉菜单
            return <div className={styles.title}>{item.text}</div>;
          }
          return (
            <Link
              className={styles.title}
              onClick={() => {
                console.log('item: ', item);
              }}
              to={item.link}
            >
              {item.text}
            </Link>
          );
        })}
      </div>
    </div>
  );
};
