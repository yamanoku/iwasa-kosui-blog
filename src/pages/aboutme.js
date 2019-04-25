import React from 'react'
import { graphql } from 'gatsby'
import styled from 'styled-components'

import Layout from '../components/Layout'
import SEO from '../components/seo'


const OGPCard = styled.a`
  display: flex;
  margin-bottom: 32px;
  @media (max-width: 768px) {
    display: block;
  }
`

const OGPCardImage = styled.div`
  width: 128px;
  background-size: cover;
  background-position: center;
  @media (max-width: 768px) {
    width: 100%;
    height: 128px;
  }
`

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
        <h3>
          <a href="https://chrome.google.com/webstore/detail/twitter-icon-rotator/khkdnpcopeccjcnpmlfmnjmfnfhfnpgh">
            Twitter Icon Rotator Chrome Extension
          </a>
        </h3>
        <p>
          Twitter上に表示されたアイコンを回転させるだけの、無意味なGoogle Chrome 拡張機能です。
        </p>
        <iframe src="https://www.youtube.com/embed/6AUQeDeXWQg" style={{ width: "100%", minHeight: "400px" }} frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen />
        <h4>各メディアにて掲載されました</h4>
        <OGPCard>
          <OGPCardImage style={{ backgroundImage: "url(https://image.itmedia.co.jp/nl/articles/1710/26/l_kutsu_171026rotate01.jpg)" }} />
          <div style={{ padding: "8px 16px", background: "#f2f3f5" }}>
            <div style={{ color: "#666" }}>ねとらぼ</div>
            <div style={{ color: "#333", fontWeight: "bold" }}>
              Twitterのアイコンを回転させたい人に朗報　Twitterのアイコンを回転させるChrome拡張が登場 - ねとらぼ
            </div>
          </div>
        </OGPCard>
        <hr />
        <OGPCard>
          <OGPCardImage style={{ backgroundImage: "url(https://forest.watch.impress.co.jp/img/wf/list/1088/039/image1.jpg)" }} />
          <div style={{ padding: "8px 16px", background: "#f2f3f5" }}>
            <div style={{ color: "#666" }}>窓の社</div>
            <div style={{ color: "#333", fontWeight: "bold" }}>
              “Twitter”のアイコンがぐるぐる回るだけのGoogle Chrome拡張機能が静かなブーム？ - 窓の社
            </div>
          </div>
        </OGPCard>
        <h3>
          <a href="https://ebiebievidence-shukatsu.netlify.com">
            就活生神経衰弱
          </a>
        </h3>
        <p>
          就活で病んだ時に作りました。
          </p>
        <img src="https://pbs.twimg.com/media/D3KXT_RUEAAD-dZ?format=jpg&name=small" />
        <br />
        <h2>論文</h2>
        <ul>
          <li>
            <b>
              <a href="https://link.springer.com/chapter/10.1007/978-3-319-97304-3_60">
                Prediction of Nash Bargaining Solution in Negotiation Dialogue
              </a>
            </b>
            <a href="https://www.slideshare.net/KosuiIwasa/prediction-of-nash-bargaining-solution-in-negotiation-dialogue-pricai-18-112354780">
              &nbsp;[スライド]
            </a>
            <br />
            Kosui Iwasa, Katsuhide Fujita
            <br />
            In Proceedings of PRICAI ’18
            <br />
            自然言語による二者間交渉において、各交渉当事者の効用空間(選好情報)をモデル化した上で推定し、社会的余剰を最大化する合意案を提示する研究
          </li>
          <li>
            <b>
              <a href="https://edofrank.github.io/papers/WWW2019.pdf">
                Can You Give Me a Reason?: Argument-inducing Online Forum by Argument Mining
              </a>
            </b>
            <br />
            Makiko Ida, Gaku Morio, Kosui Iwasa, Tomoyuki Tatsumi, Takaki Yasui
            and Katsuhide Fujita
            <br />
            To appear in Companion Proceedings of the The Web Conference 2019, WWW ’19, demonstration track, San Francisco.
            <br />
            Web上の議論フォーラムにおける前提・意見の依存関係を推定した上で、これを活用し、前提が不十分に示されていない投稿などに対して自動で問いかけを行う研究
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
