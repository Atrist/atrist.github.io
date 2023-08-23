import type { HeadFC, PageProps } from 'gatsby';
import * as React from 'react';
import * as styles from './index.less';
import Layout from '../Layout/index';

const Index: React.FC<PageProps> = () => (
  <Layout>
    <main>
      首页 Index
      相关介绍内容
      {/*  现有页面的导览 */}
    </main>
  </Layout>
);

export default Index;

export function Head() {
  return <title>Home Page</title>;
}
