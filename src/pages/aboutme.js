import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/Layout'
import SEO from '../components/seo'

class NotFoundPage extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO title="About me" />
        <h2>名前</h2>
        岩佐幸翠 / Kosui Iwasa
        <h2>やったこと</h2>
        <ul>
          <li>
            <a href="https://chrome.google.com/webstore/detail/twitter-icon-rotator/khkdnpcopeccjcnpmlfmnjmfnfhfnpgh">
              Twitter Icon Rotator Chrome Extension
            </a>
            <br />
            twitter.com 上に表示されたアイコンを回転させるGoogle Chrome 拡張機能
            <br />
            各種メディアにて掲載
            <br />
            <a href="https://nlab.itmedia.co.jp/nl/articles/1710/26/news084.html">
              Twitterのアイコンを回転させたい人に朗報　Twitterのアイコンを回転させるChrome拡張が登場
              - ねとらぼ
            </a>
            <br />
            <a href="https://forest.watch.impress.co.jp/docs/serial/yajiuma/1088039.html">
              “Twitter”のアイコンがぐるぐる回るだけのGoogle
              Chrome拡張機能が静かなブーム？ - 窓の社
            </a>
          </li>
        </ul>
        <h2>論文</h2>
        <ul>
          <li>
            <b>
              Prediction of Nash Bargaining Solution in Negotiation Dialogue
            </b>
            <br />
            Kosui Iwasa, Katsuhide Fujita
            <br />
            In Proceedings of PRICAI ’18
          </li>
          <li>
            <b>
              Can You Give Me a Reason?: Argument-inducing Online Forum by
              Argument Mining
            </b>
            <br />
            Makiko Ida, Gaku Morio, Kosui Iwasa, Tomoyuki Tatsumi, Takaki Yasui
            and Katsuhide Fujita
            <br />
            To appear in Companion Proceedings of the The Web Conference 2019,
            WWW ’19, demonstration track, San Francisco.
          </li>
        </ul>
        <h2>職歴</h2>
        <ul>
          <li>
            2019/04 -
            <br />
            株式会社ディー・エヌ・エー
            <br />
            DeNA Co., Ltd.
          </li>
        </ul>
        <h2>学歴</h2>
        <ul>
          <li>
            2013/04 - 2017/03
            <br />
            東京農工大学 工学部 情報工学科
            <br />
            Tokyo University of Agriculture and Technology Faculty of
            Engineering
          </li>
          <li>
            2017/04 - 2019/03
            <br />
            東京農工大学大学院 工学府 情報工学専攻
            <br />
            Tokyo University of Agriculture and Technology Graduate School
            Faculty of Engineering Information Engineering
          </li>
        </ul>
      </Layout>
    )
  }
}

export default NotFoundPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
