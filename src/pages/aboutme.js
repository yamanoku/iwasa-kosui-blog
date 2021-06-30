import React from 'react'
import { graphql } from 'gatsby'
import styled from 'styled-components'
import { FaTwitter, FaGithub, FaEnvelope, FaLink } from 'react-icons/fa'

import Layout from '../components/Layout'
import SEO from '../components/seo'


const OGPCard = styled.a`
  display: flex;
  margin-bottom: 32px;
  @media (max-width: 768px) {
    display: block;
  }
  :hover {
    text-decoration: none;
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
        <SEO title="私について" />
        <h2>私について</h2>
        <p>
          岩佐 幸翠 と申します。 <br />
          1994 年に生まれ、高円寺で育ちました。<br />
          最近は、自分が日頃利用している技術の内部構造への自身の理解の甘さを気にしており、コンピュータサイエンスの基礎を少しずつ学び直しています。<br />
        </p>
        <h4>興味・関心がある事柄</h4>
        <ul>
          <li>ウェブ</li>
          <li>マネージドサービス</li>
          <li>任意の何かを支える技術</li>
          <li>運用改善</li>
          <li>社会的余剰を増大させる事業</li>
          <li>精神障害者の就労支援</li>
          <li>コーヒー</li>
          <li>衣服</li>
          <li>電子音楽</li>
        </ul>
        <h4>興味・関心がない事柄</h4>
        <ul>
          <li>社会的余剰を増大させない事業</li>
        </ul>
        <h2>連絡先</h2>
        <div style={{display: "flex", flexDirection: "column"}}>
          <a>
            <FaEnvelope style={{ marginRight: 8 }} />
            contact [at] iwasakosui.com
          </a>
          <a href="https://twitter.com/ebiebievidence">
            <FaTwitter style={{ marginRight: 8 }} />
            Twitter
          </a>
          <a href="https://github.com/iwasa-kosui">
            <FaGithub style={{ marginRight: 8 }} />
            GitHub
          </a>
          <a href="https://youtrust.jp/users/ebiebievidence">
            <FaLink style={{ marginRight: 8 }} />
            YOUTRUST
          </a>
        </div>
        <h2>職歴</h2>
        <ul>
          <li>
            2019/04 - 現在
            <br />
            株式会社ディー・エヌ・エー (DeNA Co., Ltd.)
            <br />
            利用技術: Go, Vue.js, TypeScript, GAE, Cloud SQL, Stackdriver,
            CircleCI など
          </li>
        </ul>
        <h4>業務委託</h4>
        最近稼働が難しくなりつつあるため新規案件はお断りしています (ごめんなさい)
        <ul>
          <li>
            2020/12 - 現在
            <br />
            DX の推進や新規事業立ち上げ等のコンサルティングを提供している企業での開発業務
          </li>
          <li>
            2021/01 - 現在
            <br />
            採用代行サービスを提供している企業での運用自動化に向けたご提案および開発業務
          </li>
        </ul>
        <h2>学歴</h2>
        <ul>
          <li>
            2017/04 - 2019/03
            <br />
            東京農工大学大学院 工学府 情報工学専攻 (Tokyo University of
            Agriculture and Technology Graduate School Faculty of Engineering
            Information Engineering)
          </li>
          <li>
            2013/04 - 2017/03
            <br />
            東京農工大学 工学部 情報工学科 (Tokyo University of Agriculture and
            Technology Faculty of Engineering)
          </li>
        </ul>
        <h2>ジョークプロダクト</h2>
        <h3>
          <a href="https://chrome.google.com/webstore/detail/twitter-icon-rotator/khkdnpcopeccjcnpmlfmnjmfnfhfnpgh">
            Twitter Icon Rotator Chrome Extension
          </a>
        </h3>
        <p>
          Twitter上に表示されたアイコンを回転させるだけの、無意味なGoogle Chrome
          拡張機能です。
        </p>
        <OGPCard href="https://nlab.itmedia.co.jp/nl/articles/1710/26/news084.html">
          <OGPCardImage
            style={{
              backgroundImage:
                'url(https://image.itmedia.co.jp/nl/articles/1710/26/l_kutsu_171026rotate01.jpg)',
            }}
          />
          <div style={{ padding: '8px 16px', background: '#f2f3f5' }}>
            <div style={{ color: '#666', fontWeight: 'bold' }}>ねとらぼ</div>
            <div style={{ color: '#333', fontWeight: 'bold' }}>
              Twitterのアイコンを回転させたい人に朗報　Twitterのアイコンを回転させるChrome拡張が登場
              - ねとらぼ
            </div>
          </div>
        </OGPCard>
        <OGPCard href="https://forest.watch.impress.co.jp/docs/serial/yajiuma/1088039.html">
          <OGPCardImage
            style={{
              backgroundImage:
                'url(https://forest.watch.impress.co.jp/img/wf/list/1088/039/image1.jpg)',
            }}
          />
          <div style={{ padding: '8px 16px', background: '#f2f3f5' }}>
            <div style={{ color: '#666' }}>窓の社</div>
            <div style={{ color: '#333', fontWeight: 'bold' }}>
              “Twitter”のアイコンがぐるぐる回るだけのGoogle
              Chrome拡張機能が静かなブーム？ - 窓の社
            </div>
          </div>
        </OGPCard>
        <hr />
        <h3>
          <a href="https://ebiebievidence-shukatsu.netlify.com">
            就活生神経衰弱
          </a>
        </h3>
        <p>就活で病んだ時に作りました。</p>
        <img
          src="https://pbs.twimg.com/media/D3KXT_RUEAAD-dZ?format=jpg&name=small"
          style={{ maxWidth: 200, width: 200 }}
        />
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
                Can You Give Me a Reason?: Argument-inducing Online Forum by
                Argument Mining
              </a>
            </b>
            <br />
            Makiko Ida, Gaku Morio, Kosui Iwasa, Tomoyuki Tatsumi, Takaki Yasui
            and Katsuhide Fujita
            <br />
            To appear in Companion Proceedings of the The Web Conference 2019,
            WWW ’19, demonstration track, San Francisco.
            <br />
            Web上の議論フォーラムにおける前提・意見の依存関係を推定した上で、これを活用し、前提が不十分に示されていない投稿などに対して自動で問いかけを行う研究
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
