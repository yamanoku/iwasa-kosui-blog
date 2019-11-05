const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  const blogPost = path.resolve(`./src/templates/post.js`)
  return graphql(
    `
      {
        allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
          edges {
            node {
              fields {
                path
                slug
              }
              frontmatter {
                title
                date
                desc
                image
                keywords
              }
            }
          }
        }
      }
    `
  ).then(result => {
    if (result.errors) {
      throw result.errors
    }

    // Create blog posts pages.
    const posts = result.data.allMarkdownRemark.edges

    const publicPosts = posts.filter(
      p => p.node.fields.slug.indexOf('/private/') === -1
    )

    publicPosts.map((post, index) => {
      const previous =
        index === publicPosts.length - 1 ? null : publicPosts[index + 1].node
      const next = index === 0 ? null : publicPosts[index - 1].node

      createPage({
        path: post.node.fields.path,
        component: blogPost,
        context: {
          slug: post.node.fields.slug,
          previous,
          next,
        },
      })
    })

    const privatePosts = posts.filter(
      p => p.node.fields.slug.indexOf('/private/') !== -1
    )

    privatePosts.map((post, index) => {
      const previous = null
      const next = null

      createPage({
        path: post.node.fields.path,
        component: blogPost,
        context: {
          slug: post.node.fields.slug,
          previous,
          next,
        },
      })
    })
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
    createNodeField({
      name: `path`,
      node,
      value: `/posts${value}`,
    })
  }
}
