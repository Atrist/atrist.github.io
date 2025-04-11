import type { HeadFC, PageProps } from 'gatsby';
import * as React from 'react';
import { flatMap } from 'lodash';
import { graphql } from 'gatsby';
import Header from '../components/Head';
import * as styles from './index.less';
import Layout from '../Layout/index';

interface Props extends PageProps {
  data: {
    allMarkdownRemark: { edges: { node: { fields: { slug: string } } }[] };
    site: {
      siteMetadata: {
        title: string;
        description: string;
        siteUrl: string;
      };
    };
  };
}
const Index: React.FC<Props> = ({ data }) => {
  console.log('data: ', data);
  const list = React.useMemo(() => flatMap(data.allMarkdownRemark.edges, (res) => res.node.fields.slug), []);
  return (
    <>
      <Header site={data.site} />
      <main>
        首页 ··Index 相关介绍内容 <a href="/blog">博客</a>
      </main>
    </>
  );
};

export default Index;

export function Head() {
  return (
    <>
      <title>Atrist's blog</title>
      <meta name="google-site-verification" content="a_mtlHvwUie3om9UEQU-Hl7a4o4IKKPsXOpzRq6PQi8" />
    </>
  );
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
    site {
      siteMetadata {
        title
        description
        siteUrl
      }
    }
  }
`;
