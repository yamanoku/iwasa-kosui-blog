import React from 'react'
import { Link, graphql } from 'gatsby'
import 'prismjs/themes/prism-tomorrow.css'
import 'prismjs/plugins/line-numbers/prism-line-numbers.css'
import './post.css'

import Bio from '../components/Bio'
import Layout from '../components/Layout'
import SEO from '../components/seo'
import { rhythm, scale } from '../utils/typography'
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
} from 'react-share'
import Helmet from 'react-helmet'

class BlogPostTemplate extends React.Component {
  render() {
    const post = this.props.data.markdownRemark
    const siteTitle = this.props.data.site.siteMetadata.title
    const siteUrl = this.props.data.site.siteMetadata.siteUrl
    const { previous, next } = this.props.pageContext

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO title={post.frontmatter.title} description={post.excerpt} />
        <Helmet>
          <meta property="og:title" content={post.frontmatter.title} />
          <meta
            property="og:description"
            content={post.frontmatter.description}
          />
          <meta property="og:url" content={`${siteUrl}${post.fields.path}`} />
          <meta
            property="og:image"
            content={`${siteUrl}${
              this.props.data.avatar.childImageSharp.fixed.src
            }`}
          />
          <meta property="og:site_name" content={siteTitle} />
          <meta name="twitter:card" content="summary" />
          <meta name="twitter:site" content="@EbiEbiEvidence" />
        </Helmet>
        <h1 style={{ marginBottom: 0 }}>{post.frontmatter.title}</h1>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <p
            style={{
              ...scale(-1 / 5),
              display: `block`,
              marginBottom: 0,
              marginTop: 0,
            }}
          >
            {post.frontmatter.date}
          </p>
          <div style={{ display: 'flex' }}>
            <FacebookShareButton url={`${siteUrl}${post.fields.path}`}>
              <FacebookIcon size={32} round />
            </FacebookShareButton>
            <TwitterShareButton
              title={post.frontmatter.title}
              via="@EbiEbiEvidence2"
              url={`${siteUrl}${post.fields.path}`}
            >
              <TwitterIcon size={32} round />
            </TwitterShareButton>
          </div>
        </div>
        <div className="post" dangerouslySetInnerHTML={{ __html: post.html }} />
        <div
          style={{
            display: 'flex',
            padding: '16px 0',
          }}
        >
          <FacebookShareButton url={`${siteUrl}${post.fields.path}`}>
            <FacebookIcon size={32} round />
          </FacebookShareButton>
          <TwitterShareButton
            title={post.frontmatter.title}
            via="@EbiEbiEvidence2"
            url={`${siteUrl}${post.fields.path}`}
          >
            <TwitterIcon size={32} round />
          </TwitterShareButton>
        </div>
        <hr
          style={{
            marginBottom: rhythm(1),
          }}
        />
        <ul
          style={{
            display: `flex`,
            flexWrap: `wrap`,
            justifyContent: `space-between`,
            listStyle: `none`,
            padding: 0,
          }}
        >
          <li>
            {previous && (
              <Link to={previous.fields.path} rel="prev">
                ← {previous.frontmatter.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={next.fields.path} rel="next">
                {next.frontmatter.title} →
              </Link>
            )}
          </li>
        </ul>
        <Bio />
      </Layout>
    )
  }
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
        siteUrl
      }
    }
    avatar: file(absolutePath: { regex: "/profile-pic.png/" }) {
      childImageSharp {
        fixed(width: 50, height: 50) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      fields {
        slug
        path
      }
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
      }
    }
  }
`
