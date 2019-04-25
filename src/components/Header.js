import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'

const H1 = styled.h1`
  margin: 0;
  margin-bottom: 8px;
  font-size: 2rem;
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
          <Link
            to="/aboutme"
            style={{
              boxShadow: 'none',
            }}
          >
            <b>私について</b>
          </Link>
          &nbsp; / &nbsp;
          <Link
            to="/rss.xml"
            style={{
              boxShadow: 'none',
            }}
          >
            <b>RSS</b>
          </Link>
        </div>
      </div>
    )
  }
}

export default Header
