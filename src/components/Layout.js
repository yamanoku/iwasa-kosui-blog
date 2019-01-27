import React from 'react'
import { Link } from 'gatsby'

import { rhythm, scale } from '../utils/typography'
import Header from './Header'

class Layout extends React.Component {
  render() {
    const { location, title, children } = this.props
    const rootPath = `${__PATH_PREFIX__}/`
    let header

    header = <Header />
    return (
      <div
        style={{
          marginLeft: `auto`,
          marginRight: `auto`,
          maxWidth: rhythm(24),
          padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
        }}
      >
        {header}
        {children}
        <footer>
          © {new Date().getFullYear()} Kosui Iwasa a.k.a. EbiEbiEvidence<br />
          <a href="/sitemap.xml">サイトマップ</a>
        </footer>
      </div>
    )
  }
}

export default Layout
