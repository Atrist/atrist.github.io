// const a = 1;
const path = require('path');
const { createFilePath } = require('gatsby-source-filesystem');

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;
  // console.log('node.internal.type: ', node.internal.type);
  if (node.internal.type === 'MarkdownRemark') {
    const slug = createFilePath({ node, getNode, basePath: 'blogs' });
    console.log('slug: ', slug, `/blog/${slug}`);
    createNodeField({
      node,
      name: 'slug',
      value: `/blog${slug}`,
    });
  }
};

exports.createPages = async ({ graphql, actions }) => {
  // **Note:** The graphql function call returns a Promise
  const { createPage } = actions;
  // see: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise for more info
  const result = await graphql(`
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
  `);
  result.data.allMarkdownRemark.edges.forEach(({ node }) => {
    createPage({
      path: node.fields.slug,
      component: path.resolve('./src/templates/blog-post.tsx'),
      context: {
        slug: node.fields.slug,
      },
    });
  });
};
