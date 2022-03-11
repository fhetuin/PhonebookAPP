/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/gatsby-config/
 */

module.exports = {
  /* Your site config here */
  plugins: [
    'gatsby-transformer-remark',
    'gatsby-transformer-sharp',
    `gatsby-plugin-image`,
    'gatsby-plugin-sharp',
    'gatsby-plugin-tailwindcss',
    `gatsby-plugin-postcss`,
    `gatsby-plugin-styled-components`,
    {
      resolve: `gatsby-plugin-layout`,
      options: {
        component: require.resolve(`./src/utils/rootLayout.tsx`),
      },
    },
    
    {
      resolve: `gatsby-plugin-purgecss`,
      options: {
        tailwind: true,
        purgeOnly: [`src/styles/global.css`]
      }
    },
  {
    resolve: `gatsby-source-filesystem`,
    options: {
      name: `images`,
      path: `${__dirname}/src/images/`,
    },
  },
  ],
  siteMetadata: {
    title: 'Phonebook App',
    description: 'App to manage contacts',
    copyright: 'This Website is copyright 2022 Wemanity',
    contact: 'flo.hetuin@gmail.com'
  }
}
