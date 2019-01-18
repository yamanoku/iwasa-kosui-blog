---
title: ブログをGatsbyJS v2にお引っ越しして、OGP対応とRSS対応とシンタックスハイライトで楽になる
date: '2019-01-18T00:00:00.000Z'
---

## 目的

ブログをすべて自前で実装するのは、とても楽しい。
ありとあらゆる部分を、自分でカスタマイズできる。
一方で、その茨の道は本当にやりたくないことで溢れている。

- OGP 対応（と、そのための SSR）
- RSS 対応
- コードのシンタックスハイライト

GatsbyJS v2 なら、これらをプラグインと多少のコードで済ませることができる。
本記事では、これらを一つずつ解消していく。

## 想定する読者

- React でのコーディング経験がある
- Markdown でブログ記事を書きたい

## GatsbyJS とは？

GatsbyJS とは、React を利用する静的サイトジェネレータである。
GatsbyJS に関する日本語の詳しい記事としては、以下を参照されたい。

- [静的サイトジェネレーター Gatsby を使ってみた事と、縦書きテンプレートを作った話](https://qiita.com/kikuchi_kentaro/items/985b182a78c3553981ee)

また、ちゃんとしたチュートリアルを望むのであれば、以下を参照されたい。

- [Gatsby.js Tutorial](https://www.gatsbyjs.org/tutorial/)

### GatsbyJS のインストールとプロジェクト作成

まず、GatsbyJS のための CLI をインストールする。

```bash
npm i -g gatsby-cli
```

次に、Gatsyby CLI によって、プロジェクトを作成する。
GatsbyJS でのプロジェクト作成時は、[「Starter」](https://www.gatsbyjs.org/starters/?v=2)と呼ばれるテンプレートを利用出来る。

```bash
gatsby new プロジェクト名 利用するStarterのURL
```

今回は、Markdown による記事執筆が可能な[gatsby-starter-blog](https://www.gatsbyjs.org/starters/gatsbyjs/gatsby-starter-blog/)を利用する。
![gatsby-starter-blog](https://www.gatsbyjs.org/static/c7d4320ae14b8978f78ec9656ec660a7/7ed75/57dfcb72de81a95ed076ed3f9a2a5594.png)

```bash
gatsby new blog https://github.com/gatsbyjs/gatsby-starter-blog
cd blog
yarn
```

開発環境は、`yarn start`で起動し、`http://localhost:8000`から表示できる。
また、`yarn build`でビルドが行われ、`public`ディレクトリに出力される。

### GatsbyJS の構成

```
├─ gatsby-browser.js
├─ gatsby-config.js
├─ gatsby-node.js
├─ package.json
├─ static
├─ public
├─ src
│   ├─ components
│   ├─ pages
│   └─ templates
```

#### src/pages/

ページを定義する。
`src/pages/hello.js`から React コンポーネントを export することで、`http://localhost:8000/hello`からそのページを表示することが出来る。

```jsx
import React from 'react'
import { graphql } from 'gatsby'

// Page コンポーネント
export default () => (
  <div>
    <h1>こんにちは〜</h1>
  </div>
)
```

ただし、ページは`gatsby-node.js`から [Gatsby Node APIs](https://www.gatsbyjs.org/docs/node-apis/) を経由して作成することも出来る。

#### gatsby-config.js

サイトのメタデータや、利用するプラグインなどを定義する。

#### gatsby-browser.js

ブラウザでの表示時に実行される部分を書く。
今はあまり気にしなくていい。

#### gatsby-node.js

[Gatsby Node APIs](https://www.gatsbyjs.org/docs/node-apis/)とやり取りをする。
Node については後述する。
今はあまり気にしなくていい。

#### src/templates/

`gatsby-node.js`からページを作成する際に使用するテンプレートを記述する（場合が多い）。

#### src/components/

`src/pages`や`src/templates`で利用する React コンポーネントを定義する（場合が多い）。

### GatsbyJS におけるリソース

GatsbyJS では、画像・テキストファイル・設定ファイル・外部 API など、すべてのリソースは「データ」と呼ばれる。
ページからデータへのアクセスは、gatsby が提供する GraphQL API を経由して行うことができる。
また、GatsbyJS では、データは[Node](https://www.gatsbyjs.org/docs/node-interface/) という単位で扱われる。

以下に、about ページからデータへアクセスする例を示す。

```jsx
// src/pages/about.js
import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout'

// ページ
export default ({ data }) => (
  <Layout>
    <h1>{data.site.siteMetadata.title}について</h1>
    <p>
      このページでは、私の飼っている可愛いチンパンジーを紹介しています。
      <br />
    </p>
  </Layout>
)

// graphqlを通じてdataへアクセスする
export const query = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
```

Source プラグインは、外部 API からの出力やファイルの内容を読み込んで、Node を追加することができる。
例えば、ファイルを読み込んで Node として扱うためには、[gatsby-source-filesystem](https://www.gatsbyjs.org/packages/gatsby-source-filesystem/)プラグインを利用する。

```js
// gatsby-config.js
module.exports = {
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/blog`,
        name: `blog`,
      },
    },
  ],
}
```

Transformer プラグインは、Source プラグインによって提供されたデータを新しいノードやノードフィールドに変換することができる。
例えば、Markdown ファイルを Node[gatsby-transformer-remark](https://www.gatsbyjs.org/packages/gatsby-transformer-remark)プラグイン

## 記事の作成

`content/blog/${記事パス}/index.md` に記事を書くことで、`http://localhost:8000/${記事パス}`に記事が表示される。記事タイトルと作成日時は、YAML 形式で記事の冒頭に書く。
この YAML によってメタデータが書かれた部分は、frontmatter ブロックと呼ばれる。

```
---
title: test
date: '2019-01-18T00:00:00.000Z'
---

yo
```

## OGP を設定する

`src/templates/blog-post.js`に`react-helmet`の Helmet コンポーネントを追加する。
なお、`react-helmet`は既にこのスターターに含まれている。

```jsx
import Helmet from 'react-helmet'

class BlogPostTemplate extends React.Component {
  render() {
    const post = this.props.data.markdownRemark
    const siteTitle = this.props.data.site.siteMetadata.title
    // highlight-range{1}
    const siteUrl = this.props.data.site.siteMetadata.siteUrl
    const { previous, next } = this.props.pageContext

    // highlight-range{3-13}
    return (
      <Layout location={this.props.location} title={siteTitle}>
        <Helmet>
          <meta property="og:title" content={post.frontmatter.title} />
          <meta
            property="og:description"
            content={post.frontmatter.description}
          />
          <meta property="og:url" content={`${siteUrl}${post.fields.slug}`} />
          <meta property="og:site_name" content={siteTitle} />
          <meta name="twitter:card" content="summary" />
          <meta name="twitter:site" content="@EbiEbiEvidence" />
        </Helmet>
        {/*
            中略
        */}
      </Layout>
    )
  }
}

/*
  中略
*/
// highlight-range{7,18-20}
export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
        siteUrl
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
      }
      fields {
        slug
      }
    }
  }
`
```

## RSS 対応

やっぱり RSS には対応したい。[gatsby-plugin-feed](https://www.gatsbyjs.org/packages/gatsby-plugin-feed/)は、Gatsby Nodes API を経由して、`allMarkdownRemark`の Node を取得した上で、RSS フィードを生成してくれる。
なお、`gatsby-plugin-feed`プラグインは既にこのスターターに含まれている。
また、本来であれば`gatsby-config.js`にこのプラグインを読み込む設定を書く必要があるが、
それもこのスターターが既にやってくれている。えらい。

ただし、以下の項目に注意したい。

> NOTE: This plugin only generates the /rss.xml file when run in production mode! To test your feed, run: gatsby build && gatsby serve.

つまり、`yarn start`や`gatsby develop`で起動している場合、RSS フィードは生成されない。
`gastby build`でビルドして、`gastby serve`で確認してみよう。

## シンタックスハイライトを適用する

Markdown ファイルにコードスニペットを書いたら、やっぱりハイライトされて欲しい。
[gatsby-remark-prismjs](https://www.gatsbyjs.org/packages/gatsby-remark-prismjs/)
は、[prismjs](https://prismjs.com/)を利用してシンタックスハイライトする。
なお、`gatsby-remark-prismjs`プラグインは既にこのスターターに含まれている。
また、本来であれば`gatsby-config.js`にこのプラグインを読み込む設定を書く必要があるが、
それもこのスターターが既にやってくれている。えらい。

`src/templates/blog-post.js`にシンタックスハイライトのテーマ CSS を読み込ませる。

```jsx
import 'prismjs/themes/prism-tomorrow.css'
import 'prismjs/plugins/line-numbers/prism-line-numbers.css'
```

また、gatsby-remark-prismjs では特定の行をハイライトすることもできる。詳細は[gatsby-remark-prismjs の公式ドキュメント](https://www.gatsbyjs.org/packages/gatsby-remark-prismjs/#optional-add-line-highlighting-styles)を参照されたい。
