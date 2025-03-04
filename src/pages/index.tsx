import type { HeadFC, PageProps } from 'gatsby';
import * as React from 'react';
import { flatMap } from 'lodash';
import { graphql } from 'gatsby';
import * as styles from './index.less';
import Layout from '../Layout/index';

const Index: React.FC<PageProps> = ({ data }) => {
  console.log('data: ', data);
  const list = React.useMemo(() => flatMap(data.allMarkdownRemark.edges, (res) => res.node.fields.slug), []);
  return (
    <Layout>
      <main>首页 Index 相关介绍内容</main>
      <a href="/blog">博客</a>
    </Layout>
  );
};

export default Index;

export function Head() {
  return <title>Home Page</title>;
}

export const query = graphql`
  query {
    allMarkdownRemark {
      edges {
        node {
          fields {
            slug
          }
        }
      }
    }
  }
`;
