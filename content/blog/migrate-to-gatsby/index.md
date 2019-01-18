---
title: ブログをGatsbyJS v2にお引っ越しする
date: '2019-01-18T00:00:00.000Z'
image: 'あ'
---

## 目的

ブログをすべて自前で実装するのは、とても楽しい。
ありとあらゆる部分を、自分でカスタマイズできる。
一方で、その茨の道は本当にやりたくないことで溢れている。

- OGP 対応（と、そのための SSR）
- RSS 対応
- コードのシンタックスハイライト

GatsbyJS v2 なら、これらをプラグインで済ませることができる。

## 想定する読者

- React でのコーディング経験がある
- Markdown でブログ記事を書きたい

## GatsbyJS とは？

GatsbyJS とは、React を利用する静的サイトジェネレータである。

## GatsbyJS のインストールとプロジェクト作成

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
```

##
