
const path = require("path")

exports.createPages = ({ actions, graphql }) => {

    const { createPage } = actions

    const blogPostTemplate = path.resolve(`src/templates/blog_template.js`)

    return graphql(`
    {
      allMarkdownRemark(
        limit: 100,
        sort: { order: DESC, fields: [frontmatter___date] }
      ) {
        edges {
          node {
            frontmatter {
              slug
            }
          }
        }
      }
    }
  `).then(result => {
        if (result.errors) {
            return Promise.reject(result.errors)
        }

        result.data.allMarkdownRemark.edges.forEach(({node}) => {
            createPage({
                path: node.frontmatter.slug,
                component: blogPostTemplate,
            })
        })
    })
}