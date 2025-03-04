import React from 'react';
import { graphql } from 'gatsby';
import { flatMap } from 'lodash';
import styles from './blog-post.module.less';
import 'github-markdown-css';

import Layout from '../Layout';

export default ({ data }) => {
  console.log('data: ', data);
  const post = data.markdownRemark;
  console.log('styles: ', post);
  const list = React.useMemo(() => flatMap(data.allMarkdownRemark.edges, (res) => res.node.fields.slug), []);
  return (
    <main className={styles.main}>
      <div className={styles.slide_menu}>
        {list.map((item) => (
          <div key={item}>
            <a href={item}>{item}</a>
          </div>
        ))}
      </div>
      <div className={styles.content}>
        <div className="markdown-body">
          <h1>{post?.frontmatter?.title}</h1>
          <div dangerouslySetInnerHTML={{ __html: post.html }} style={{ width: '100%' }} />
        </div>
      </div>
    </main>
  );
};

export const query = graphql`
  query ($slug: String!) {
    allMarkdownRemark {
      edges {
        node {
          fields {
            slug
          }
        }
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
      }
    }
  }
`;
