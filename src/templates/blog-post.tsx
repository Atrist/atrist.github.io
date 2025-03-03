import React from 'react';
import { graphql } from 'gatsby';
import styles from './blog-post.module.less';
import 'github-markdown-css';

import Layout from '../Layout';

export default ({ data }) => {
  const post = data.markdownRemark;
  console.log('styles: ', styles);
  return (
    <Layout>
      <div className={styles.content}>
        <div className="markdown-body">
          <h1>{post.frontmatter.title}</h1>
          <div dangerouslySetInnerHTML={{ __html: post.html }} style={{ width: '100%' }} />
        </div>
      </div>
    </Layout>
  );
};

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
      }
    }
  }
`;
