---
title: 魚拓をかんたんに閲覧・保存できるブックマークレット
date: '2019-01-26T00:00:00.121Z'
desc: 'ワンクリックで魚拓を閲覧・保存するブックマークレットの紹介'
keywords: '魚拓,ブックマークレット'
---

## はじめに

Yahoo! ジオシティーズは、2019 年 3 月末を以てサービスを終了する。
これにより、2000 年代に作成された多くの貴重なコンテンツたちの閲覧が難しくなってしまう。

そんな時に、ウェブアーカイブサービス（通称：魚拓サービス）が便利だ。
魚拓サービスは、Web ページをキャッシュとして半永久的に保存・閲覧できるサービスだ。

今回は、そんな魚拓サービスを利用して、ワンクリックで魚拓を閲覧・保存するブックマークレットを導入する方法を紹介する。

## おことわり

本記事では、主に PC の利用者を対象に解説している。
モバイルでもこのブックマークレットは動作するが、導入方法・利用方法については以下の外部サイトを参考にされたい。  
[iPhone の Safari にブックマークレットを登録する設定手順](https://rezv.net/iphone/9352/)

## 導入方法

### #1 ブックマークバーを表示する

アドレスが表示されている欄の下に、ブックマークの一覧が表示される部分が「ブックマークバー」だ。
![](https://i.imgur.com/tuVmGex.png)
ブックマークバーが表示されていない場合は、以下を参照し、ブックマークバーを表示させる。  
[Firefox の場合](https://support.mozilla.org/ja/kb/bookmarks-toolbar-display-favorite-websites#w_ciccagczckagceckcecackacaecjaaaaagyzaecjaeaoao)  
[Vivaldi/Chrome/その他 Chronium 系の場合](https://support.google.com/chrome/answer/188842?co=GENIE.Platform%3DDesktop&hl=ja)
[Safari の場合](https://support.apple.com/ja-jp/guide/safari/ibrw1012/mac)

### #2 ブックマークレットをブックマークに保存する

#### Firefox・Vivaldi の場合

<p style="margin-bottom: 8px">
FirefoxかVivaldiを利用している場合は、以下のリンクをブックマークバーにドラッグドロップするだけで良い。
</p>
<p style="background: #eee; display: flex; padding: 8px;margin-bottom: 16px;">
<a href='javascript:window.open("https://web.archive.org/save/"+location.href)'>保存</a>
&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;
<a href='javascript: window.location.href="https://web.archive.org/web/*/"  + window.location.href'>閲覧</a>
</p>

![ドラッグドロップで上記URLを保存して下さい](https://i.imgur.com/ZA9AFwH.png)

#### Chrome の場合

残念ながら、Chrome の場合は少し面倒だ。

1. まず、下記の保存用スクリプトをコピーする。

```js
javascript: window.open('https://web.archive.org/save/' + location.href)
```

2. Windows の場合は Ctrl+D を、macOS の場合は Command+D を押す。
3. 「その他...」を押す。
   ![](https://i.imgur.com/RhCfdBX.png)
4. 下記の通りに入力し、保存する。
   ![](https://i.imgur.com/o50Gjlp.png)
5. 最期に、下記の閲覧用スクリプトをコピーし、同様の手順を繰り返す。

```js
javascript: window.location.href =
  'https://web.archive.org/web/*/' + window.location.href
```

## 利用方法

ブックマークバー上からクリックするだけで良い。
試しに、この記事を保存・閲覧してみて欲しい。

## おわりに

不具合のご報告・修正依頼は、[twitter.com/ebiebievidence](https://twitter.com/ebiebievidence) か[GitHub Issue](https://github.com/ebiebievidence/blog)までお気軽にどうぞ。
