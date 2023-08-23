import * as React from 'react';
import { graphql } from 'gatsby';

const BlogPost = ({ data, children }) => (

  <div>
    <p>{data.mdx.frontmatter.date}</p>
    {children}
  </div>

);

// export const Head = () => <Seo title="Super Cool Blog Posts" />;
export const query = graphql`
  query ($id: String) {
    mdx(id: {eq: $id}) {
      frontmatter {
        title
        date(formatString: "MMMM D, YYYY")
      }
    }
  }
`;
export default BlogPost;
