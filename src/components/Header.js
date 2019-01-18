import React from 'react'
import { StaticQuery, graphql, Link } from 'gatsby'
import Image from 'gatsby-image'
import styled from 'styled-components'
import { FaTwitter, FaRss, FaGithub } from 'react-icons/fa'

import { rhythm } from '../utils/typography'

const H1 = styled.h1`
  margin: 0;
  margin-bottom: 8px;
  font-size: 1.5rem;
  color: hsla(0, 0%, 0%, 0.9);
  @media (max-width: 768px) {
    font-size: 7vw;
  }
  text-align: center;
`

class Header extends React.Component {
  render() {
    return (
      <div
        style={{
          marginBottom: '1.75rem',
        }}
      >
        <Link to="/">
          <H1>ebiebievidence.com</H1>
        </Link>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
          }}
        />
        <div
          style={{
            height: 20,
            marginBottom: 5,
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <a
            href="https://twitter.com/ebiebievidence2"
            target="_blank"
            style={{
              boxShadow: 'none',
            }}
          >
            <FaTwitter style={{ marginRight: '16px', fontSize: '1.5rem' }} />
          </a>
          <a
            href="/rss.xml"
            target="_blank"
            style={{
              boxShadow: 'none',
            }}
          >
            <FaRss style={{ marginRight: '16px', fontSize: '1.5rem' }} />
          </a>
          <a
            href="https://github.com/EbiEbiEvidence"
            target="_blank"
            style={{
              boxShadow: 'none',
            }}
          >
            <FaGithub style={{ marginRight: '16px', fontSize: '1.5rem' }} />
          </a>
        </div>
      </div>
    )
  }
}

export default Header
