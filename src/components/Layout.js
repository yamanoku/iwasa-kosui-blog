import React from 'react'

import { rhythm, scale } from '../utils/typography'
import Header from './Header'

class Layout extends React.Component {
  render() {
    const { children } = this.props
    return (
      <div
        style={{
          marginLeft: `auto`,
          marginRight: `auto`,
          maxWidth: rhythm(24),
          padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
        }}
      >
        <Header />
        {children}
        <footer style={{ textAlign: "center" }}>
          © {new Date().getFullYear()} Kosui Iwasa a.k.a. EbiEbiEvidence<br />
          <a href="/sitemap.xml">サイトマップ</a>
          <span>このページでは、Google Analyticsを利用しています。</span>
        </footer>
      </div>
    )
  }
}

export default Layout
