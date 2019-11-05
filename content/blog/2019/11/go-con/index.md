---
title: '私が Go Conference 2019 Autumn から得た学び'
date: '2019-10-03T11:21:20+09:00'
image: 'https://raw.githubusercontent.com/UniUniUnicode/blog/master/content/blog/2019/11/go-con/index.png'
desc: '個人的に特に学びが深かったセッションを紹介します'
keywords: 'Go,Golang,Go Conference,GoCon'
---

## はじめに

10/28(月)、東京都墨田区のみどりコミュニティセンターで開催された Go Conference 2019 Autumn に参加しました。この記事では、主に今回の Go Conference から私が得た学びを紹介します。

## Go Conference の魅力

Go Conference とは、半年ごとに東京で行われる、Go についてのカンファレンスです。
今回は平日開催・有料化にも関わらず、約 150 人もの Gopher 達が集いました。

各発表の対象レベル・分野は多岐に渡り、初心者から上級者まで幅広い Gopher 達が参加する、Go に関心を持つ方なら誰でも楽しめる、開かれたカンファレンスとなっています。

また、このイベントは多くのスポンサーやスタッフの皆様によって支えられていることから、Go に対する想いが感じられるイベントでもあります。

## セッション全体を通して

[発表資料一覧はこちら](https://gocon.connpass.com/event/148602/presentation/)

まず、Docker/K8s やポータビリティに関する発表が 4 件あり、コンテナ化されたアプリケーションにおける Go の利用方法への関心の高まりを感じました。

加えて、機械学習や数値解析について 4 件の発表があったことや、データサイエンティストの方による発表があったことなどから、Go による機械学習/数値解析の盛り上がりが伺えます。

また、テストに関する 3 件の発表から、テストに関する高い関心が依然として寄せられていることが感じられます。

上記以外にも、[ビルドツール Bazel を活用した開発のススメ](https://speakerdeck.com/micnncim/accelerate-go-development-with-bazel)、[Go でつくるゲームボーイシミュレータの開発](https://speakerdeck.com/bokuweb/gocon2019)、[Go による超高速な経路探索エンジンの開発](https://speakerdeck.com/avvmoto/go-conference-2019-autumn-go-ch)など、多岐にわたる分野に関する発表が行われていました。

## セッション紹介

すべてのセッションを紹介することはできませんが、個人的にピックアップしたものを紹介させて頂きます。

### [Goptuna: Distributed Bayesian Optimization Framework.](https://www.slideshare.net/c-bata/goptuna-distributed-bayesian-optimization-framework-at-go-conference-2019-autumn-187538495)

<iframe src="//www.slideshare.net/slideshow/embed_code/key/h3YmuakZjUbZ7c" width="595" height="485" frameborder="0" marginwidth="0" marginheight="0" scrolling="no" style="border:1px solid #CCC; border-width:1px; margin-bottom:5px; max-width: 100%;" allowfullscreen> </iframe> <div style="margin-bottom:5px"> <strong> <a href="//www.slideshare.net/c-bata/goptuna-distributed-bayesian-optimization-framework-at-go-conference-2019-autumn-187538495" title="Goptuna Distributed Bayesian Optimization Framework at Go Conference 2019 Autumn" target="_blank">Goptuna Distributed Bayesian Optimization Framework at Go Conference 2019 Autumn</a> </strong> from <strong><a href="https://www.slideshare.net/c-bata" target="_blank">Masashi Shibata</a></strong> </div>

発表者: Masashi SHIBATA さん(CyberAgent, Inc.)

#### 内容

ベイズ最適化ツール「Optuna」の Go 移植「Goptuna」を紹介し、その応用事例を示す発表でした。
特に、Goptuna による ISUCON9 予選問題や Optuna による動画エンコーダ x.264 のパラメータチューニングなど、機械学習のハイパーパラメータの探索以外へのベイズ最適化の応用事例が示されていたことが印象的でした。

#### 学び

##### ベイズ最適化のイメージが変わった

私は、これまで「ベイズ最適化といえば機械学習のハイパーパラメータが最大の用途」と思っていました。しかし、ISUCON9 予選問題や、動画エンコーダ、果ては JIT コンパイラのパラメータ最適化に用いられ、実際に成果が出ていることに非常に驚きました。このような自分の専門外の技術も、自分からどんどん果敢に取り入れて、攻めたサービス運用ができるとカッコいいですね。

##### Go で実用可能な数値解析ツールが実装されていることへの驚き

正直、私は数値解析ツールといえば、Python か Julia、または R で実装するものだと考えていました。しかし、gonum による数値計算ライブラリの登場によって、Go による数値解析ツールの開発も現実的な選択肢の一つとなりつつあることを認識しました。Go の応用事例が広がりつつある今、「○○ ってあんまり Go でやられていない領域だけど、一丁やってみるか」のような気持ちを常に持っていきたいです。

### [Go コンパイラをゼロから作ってセルフホスト達成するまで](https://speakerdeck.com/dqneo/how-i-wrote-a-self-hosted-go-compiler-from-scratch)

<script async class="speakerdeck-embed" data-id="ffa87e2ea82043198af61c82322efec1" data-ratio="1.33333333333333" src="//speakerdeck.com/assets/embed.js"></script>

発表者: DQNEO さん(Mercari, Inc.)

#### 内容

当時コンパイラの知識がゼロだった発表者が、Lexer・Parser・CodeGenerator などを使わずに、フルスクラッチで Go のコンパイラ「minigo🐥」を開発するまでの経緯を詳解する発表でした。

#### 学び

##### 再実装することで得られる深い理解

発表者は、Go コンパイラを実装する前に、C コンパイラ「8cc」を Go へ移植したそうです。これによって、発表者は Go の Syntax が C の Syntax に由来していることを理解し、C 言語が動く仕組みも分かり、アセンブリの読み書きもできるようになったとのことです。また、Go コンパイラを実装する中で、苦手だった iota も自分で実装することで体に身につくようになったそうです。ある技術を理解するために、その技術を再実装するという方法の有用性を学びました。

##### ゴールすることの重要性

セッション中の「天才じゃなくても時間をかければコンパイラは作れる」という言葉が印象的でした。発表者は、以前「A Tour of Go」に 2 回挑戦して挫折したとのことです。しかし、発表者は Go コンパイラの実装をフルスクラッチで完遂しました。その上で重要なのは、「ゴールすることの重要性」だと私は感じました。たとえば minigo🐥 で実装されている malloc は「静的領域を最初にガバっと確保し、malloc が呼ばれるたびにそれを切り取って使う」という、かなりシンプルな実装でした。完璧を目指し、そして挫折するよりも、まずは完成させるということの重要性を改めて実感させられるセッションでした。

## おわりに

Go Conference には、他にも素晴らしいセッションがたくさんありました。これらは発表者・スポンサー・スタッフの皆様に支えられたものであり、深く感謝致します。
今回得られた学びを活かし、次回の Go Conference では私も発表ができるように努力します。