---
title: react-share風はてなブックマークボタンをCSSだけでゴリ押し実装する
date: '2019-01-20T00:00:00.121Z'
desc: 'reach-shareには、はてなブックマークボタンが含まれていないので、ゴリ押しで実装する'
keywords: 'React,react-share,はてなブックマーク,hatena'
---

## 目的

![react-shareのボタン一覧](https://raw.githubusercontent.com/nygardk/react-share/HEAD/example.png)
[react-share](https://www.npmjs.com/package/react-share)は、円形のキュートなシェアボタンを提供する、React コンポーネント群ライブラリである。

しかし、残念ながらはてなブックマークボタンが提供されていない。
また、このライブラリのリポジトリの更新状況も芳しく無く、プルリクエストを送っても反映される見込みは薄いと感じる。

今回は、ゴリ押しで react-share 風のはてなブックマークボタンコンポーネントを作っていく。

## 要件定義

はてなブックマークボタンは、以下のように呼び出したい。
props で URL とタイトルを渡すだけで、よしなにやってほしい。

```jsx
import React from 'react'
import HatenaShareButton from '../components/HatenaShareButton'

const AboutPage = () => (
  <div>
    <h1>こんにちは</h1>
    <HatenaShareButton
      url="https://www.ebiebievidence.com"
      title="エビエビエビデンスのホームページ"
    />
  </div>
)

export default AboutPage
```

## 実装

### #1 JSX

基本となる HatenaShareButton.jsx の実装は、以下の通り。
これをベースにして、 HatenaShareButton.css でいい感じに拡張してどうにかする。

```jsx
import React from 'react'
import './HatenaShareButton.css'

const HatenaShareButton = ({ url, title }) => (
  <a
    className="HatenaShareButton"
    href={`http://b.hatena.ne.jp/add?mode=confirm&url=${url}&title=${title}`}
    target="_blank"
    rel="nofollow"
  >
    B!
  </a>
)

export default HatenaShareButton
```

### #1 CSS

SVG で真面目にはてなブックマークのロゴを書くのはだるいので、[この記事](https://hayashikejinan.com/webwork/css/913/)を参考に、CSS に色々足していくことで無理矢理実現させる。

まずは、普通に 32px × 32px で「B!」を表示する。
注意すべきは、line-height もきちんと 32px に揃える点。
また、text-decoration も必ず none にする。

<iframe height="265" style="width: 100%;" scrolling="no" title="HatenaShareButton #1" src="//codepen.io/KAWASEMI_SEVEN/embed/LMwjpV/?height=265&theme-id=0&default-tab=css,result" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/KAWASEMI_SEVEN/pen/LMwjpV/'>HatenaShareButton #1</a> by ebiebievidence
  (<a href='https://codepen.io/KAWASEMI_SEVEN'>@KAWASEMI_SEVEN</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

次に、あのロゴの青と水色のツートーンの背景を再現する。
ツートーンの背景は、linear-gradient を使えば表現できる。

<iframe height="265" style="width: 100%;" scrolling="no" title="HatenaShareButton #2" src="//codepen.io/KAWASEMI_SEVEN/embed/NeQvgz/?height=265&theme-id=0&default-tab=css,result" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/KAWASEMI_SEVEN/pen/NeQvgz/'>HatenaShareButton #2</a> by ebiebievidence
  (<a href='https://codepen.io/KAWASEMI_SEVEN'>@KAWASEMI_SEVEN</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

これで完成だ。
font-family に Verdana を指定すると更にあのロゴに近づくが、[Android では Roboto で表示されてしまう](https://www.mirucon.com/2017/03/04/android-font-family/)のが個人的に気になっている。

## おわりに

最後に、実際に React コンポーネントとして動作しているものを示して終わりとする。

<iframe height="265" style="width: 100%;" scrolling="no" title="HatenaShareButton" src="//codepen.io/KAWASEMI_SEVEN/embed/wRVqyj/?height=265&theme-id=0&default-tab=js,result" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/KAWASEMI_SEVEN/pen/wRVqyj/'>HatenaShareButton</a> by ebiebievidence
  (<a href='https://codepen.io/KAWASEMI_SEVEN'>@KAWASEMI_SEVEN</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>
