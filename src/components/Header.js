import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'
import { FaRss, FaTwitter, FaGithub } from 'react-icons/fa'

import logo from './logo.png'

const H1 = styled.h1`
  margin: 0;
  margin-bottom: 8px;
  font-size: 2rem;
  color: #333;
  @media (max-width: 768px) {
    font-size: 7vw;
  }
  text-align: center;
`

const Logo = styled.img`
  margin-bottom: 0;
  width: 300px;
`

const IconContainer = styled.div`
  box-shadow: none;
  position: absolute;
  bottom: -14px;
  right: 0px;
  @media (max-width: 375px) {
    bottom: -50px;
  }
`

class Header extends React.Component {
  render() {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
        }}
      >
        <Link to="/">
          <Logo src={logo} />
        </Link>
        <div
          style={{
            height: 20,
            marginBottom: 5,
            display: 'flex',
            position: 'relative',
            justifyContent: 'center',
            width: '100%',
          }}
        >
          <Link
            to="/"
            style={{
              boxShadow: 'none',
              margin: '0 1rem',
              color: '#333',
            }}
          >
            <b>ブログ</b>
          </Link>
          <Link
            to="/aboutme"
            style={{
              boxShadow: 'none',
              margin: '0 1rem',
              color: '#333',
            }}
          >
            <b>自己紹介</b>
          </Link>
          <IconContainer>
            <a
              href="/rss.xml"
              style={{
                color: '#333',
                margin: '0 8px',
              }}
            >
              <FaRss />
            </a>
            <a
              href="https://twitter.com/uniuniunicode"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: '#333',
                margin: '0 8px',
              }}
            >
              <FaTwitter />
            </a>
            <a
              href="https://github.com/uniuniunicode"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: '#333',
                margin: '0 8px',
              }}
            >
              <FaGithub />
            </a>
          </IconContainer>
        </div>
      </div>
    )
  }
}

export default Header
