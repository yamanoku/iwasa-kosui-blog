import React from 'react'
import styled from 'styled-components'

import { rhythm, scale } from '../utils/typography'
import Header from './Header'

const goldRatio = 1.618

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
const HeaderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  background: white;
  margin-bottom: ${rhythm(goldRatio)};

  @media (max-width: 768px) {
    margin-bottom: 24px;
  }
`

const HeaderInnerWrapper = styled.div`
  width: 100%;
  max-width: 768px;
  padding: ${rhythm(1 / goldRatio)} 0;

  @media (max-width: 768px) {
    padding: 32px;
  }
`

const Content = styled.div`
  background: white;
  padding: ${rhythm(goldRatio)} ${rhythm(goldRatio * goldRatio)};
  width: 100%;
  max-width: 768px;

  @media (max-width: 768px) {
    padding: 32px;
  }
`

class Layout extends React.Component {
  render() {
    const { children } = this.props
    return (
      <Container>
        <HeaderWrapper>
          <HeaderInnerWrapper>
            <Header />
          </HeaderInnerWrapper>
        </HeaderWrapper>
        <Content>{children}</Content>
        <footer style={{ textAlign: 'center' }}>
          © {new Date().getFullYear()} Kosui Iwasa a.k.a. uniuniunicode
          <br />
          <a href="/sitemap.xml">サイトマップ</a>
          <p>このページでは、Google Analyticsを利用しています。</p>
        </footer>
      </Container>
    )
  }
}

export default Layout
