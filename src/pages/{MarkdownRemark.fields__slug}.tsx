import * as React from 'react';
import { graphql } from 'gatsby';

const BlogPost = ({ data, children }) => {
  console.log('data: ', data);
  return (
    <div>
      <p>{data.markdownRemark.frontmatter?.date}</p>
      {children}
    </div>
  );
};

// export const Head = () => <Seo title="Super Cool Blog Posts" />;
export const query = graphql`
  query ($id: String) {
    markdownRemark(id: {eq: $id}) {
      internal{
          type
          content
        }
    }
  }
`;
export default BlogPost;
