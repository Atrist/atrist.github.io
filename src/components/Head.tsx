/** 头部组件 */
import React from 'react';
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
      <div>{siteMetadata?.title}</div>
      <div>right</div>
    </div>
  );
};
