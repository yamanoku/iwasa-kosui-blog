import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'
import { FaRss, FaTwitter, FaGithub } from 'react-icons/fa'

import logo from './logo.png'

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`

const MenuContainer = styled.div`
    height: 20px;
    margin-bottom: 5;
    display: flex;
    position: relative;
    justify-content: center;
    width: 100%;
`

const IconContainer = styled.div`
  box-shadow: none;
  position: absolute;
  bottom: -14px;
  right: 0px;
  @media (max-width: 500px) {
    bottom: -50px;
  }
`

const MenuLink = styled(Link)`
  box-shadow: none;
  margin: 0 8px;
  color: #333;
  font-weight: bold;
`
const IconLink = styled.a`
  box-shadow: none;
  margin: 0 1rem;
  color: #333;
`

const Logo = styled.img`
  margin-bottom: 0;
  width: 300px;
`

const Header = () => (
  <Container>
    <Link to="/">
      <Logo src={logo} />
    </Link>
    <MenuContainer>
      <MenuLink to="/">ブログ</MenuLink>
      <MenuLink to="/aboutme">自己紹介</MenuLink>
      <IconContainer>
        <IconLink href="/rss.xml">
          <FaRss />
        </IconLink>
        <IconLink
          href="https://twitter.com/uniuniunicode"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaTwitter />
        </IconLink>
        <IconLink
          href="https://github.com/uniuniunicode"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaGithub />
        </IconLink>
      </IconContainer>
    </MenuContainer>
  </Container>
)

export default Header
