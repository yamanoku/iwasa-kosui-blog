---
title: AtomでReactを書くとタブ一覧がindex.tsxだらけで見づらくないですか？
date: '2018-07-13T00:00:00.121Z'
desc: 'nice-indexで、Atomのタブ一覧をきれいに整理しよう'
keywords: 'Atom,index.js,index.tsx'
---

## 最近の悩み

最近、React を書き始めたが、どうも`index.css`や`index.js`、`index.tsx`なんかが増えてしまう。
`src/components/App/index.tsx`、`src/components/Card/index.tsx`、`src/components/Header/index.tsx`…
そんな状態で Atom で React を書こうとすれば、たちまち`index.js`のタブだらけになってしまう。

![](https://i.imgur.com/0FlhM96.png '無残なAtomのタブ一覧')

## nice-index

そんな時、Atom のパッケージの 1 つ、[nice-index](https://github.com/joshwcomeau/nice-index)が便利だ。
コマンドラインから`apm install nice-index`と叩き、Atom を再起動してタブ一覧を見ると、それぞれのディレクトリ名が表示されるようになり、非常に見やすくなった。
![](https://i.imgur.com/pVmyPsn.png '人権を得た様子')
