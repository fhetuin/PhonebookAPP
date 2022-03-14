const { default: axios } = require('axios');
const path = require('path');

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      modules: [path.resolve(__dirname, 'src'), 'node_modules']
    }
  });
}

exports.createPages = async ({ graphql, actions }) => {

    actions.createPage({ 
      path: '/contact/',
      matchPath: '/contact/:id',
      component: path.resolve('./src/templates/contact-details.js'),
  })
};
