import React from 'react'
import './HatenaShareButton.css'

const HatenaShareButton = ({ url, title }) => (
  <a
    className="HatenaShareButton"
    href={
      'http://b.hatena.ne.jp/add?mode=confirm&url=' + url + '&title=' + title
    }
    target="_blank"
    rel="nofollow"
  />
)

export default HatenaShareButton
