import React from 'react'
import { Link, graphql } from 'gatsby'
import styled from 'styled-components'

import Layout from '../components/Layout'
import SEO from '../components/seo'
import { rhythm } from '../utils/typography'

const PostRow = styled.div`
  margin: 24px 0;
`

const PostTitle = styled.h3`
  margin-bottom: ${rhythm(1 / 4)};
`

const PostDesc = styled.p`
  margin: 0;
`

class BlogIndex extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title
    const posts = data.allMarkdownRemark.edges

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO title="投稿一覧" />
        {posts
          .filter(({ node }) => node.fields.slug.indexOf('/private/') === -1)
          .map(({ node }) => {
            const title = node.frontmatter.title || node.fields.slug
            return (
              <PostRow key={node.fields.slug}>
                <PostTitle>
                  <Link style={{ boxShadow: `none` }} to={node.fields.path}>
                    {title}
                  </Link>
                </PostTitle>
                <PostDesc>{node.frontmatter.desc}</PostDesc>
                <small>{node.frontmatter.date}</small>
              </PostRow>
            )
          })}
      </Layout>
    )
  }
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            path
            slug
          }
          frontmatter {
            date(formatString: "YY/MM/DD")
            title
            desc
          }
        }
      }
    }
  }
`
