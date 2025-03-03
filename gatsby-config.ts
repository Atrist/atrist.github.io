import type { GatsbyConfig } from 'gatsby';

const config: GatsbyConfig = {
  siteMetadata: {
    title: 'Atrist',
    siteUrl: 'https://atrist.github.io',
  },
  // More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
  // If you use VSCode you can also use the GraphQL plugin
  // Learn more at: https://gatsby.dev/graphql-typegen
  graphqlTypegen: true,
  plugins: [
    {
      resolve: 'gatsby-plugin-less',
      options: {
        cssLoaderOptions: {
          modules: {
            mode: 'local', // Enable CSS Modules for .module.less files
            namedExport: false,
            localIdentName: '[local]__[hash:base64:5]', // Customize class name hashing
          },
        },
      },
    },
    'gatsby-plugin-sitemap', {
      resolve: 'gatsby-plugin-manifest',
      options: {
        icon: 'src/images/icon.png',
      },
    }, 'gatsby-transformer-remark', {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'pages',
        path: './src/pages/',
      },

      __key: 'pages',
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'blog',
        path: './blog/',
      },
      __key: 'blogs',
    }],
};

export default config;
