import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'

import icon from './icon.png'
import logo from './uniuniunicode.svg'

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

class Header extends React.Component {
  render() {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            width: 72,
            height: 72,
            marginRight: 16,
            borderRadius: '50%',
            background: `url(${icon})`,
            backgroundSize: 'contain',
          }}
        />
        <div>
          <Link to="/">
            <Logo src={logo} />
          </Link>
          <div
            style={{
              height: 20,
              marginBottom: 5,
              display: 'flex',
            }}
          >
            <Link
              to="/"
              style={{
                boxShadow: 'none',
              }}
            >
              <b>記事一覧</b>
            </Link>
            &nbsp; / &nbsp;
            <Link
              to="/aboutme"
              style={{
                boxShadow: 'none',
              }}
            >
              <b>プロフィール</b>
            </Link>
            &nbsp; / &nbsp;
            <a
              href="/rss.xml"
              style={{
                boxShadow: 'none',
              }}
            >
              <b>RSS</b>
            </a>
          </div>
        </div>
      </div>
    )
  }
}

export default Header
