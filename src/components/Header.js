import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import Image from 'gatsby-image'
import styled from 'styled-components'
import { FaTwitter } from 'react-icons/fa'

import { rhythm } from '../utils/typography'

const H1 = styled.h1`
  margin: 0;
  @media (max-width: 768px) {
    font-size: 7vw;
  }
`

class Header extends React.Component {
  render() {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '1.75rem',
        }}
      >
        <H1>ebiebievidence.com</H1>
        <div>
          <a
            href="https://twitter.com/ebiebievidence"
            target="_blank"
            style={{
              boxShadow: 'none',
            }}
          >
            <FaTwitter />
          </a>
        </div>
      </div>
    )
  }
}

export default Header
