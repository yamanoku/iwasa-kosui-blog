---
title: Web Speech APIなら、数行で、ブラウザ上で、無料で音声認識・音声合成ができる
date: '2019-05-15T00:00:00.121Z'
desc: 'Web Speech APIはブラウザが提供する音声認識・音声合成API。無料で使えるし簡単に利用できる。'
keywords: 'Web Speech API,音声認識,音声合成'
---

# はじめに

この記事では[Web Speech API](https://developer.mozilla.org/ja/docs/Web/API/Web_Speech_API)による音声認識・音声合成機能について、ブラウザ対応状況・利用方法を紹介します。

# Web Speech APIとは
各Webブラウザが提供する、音声認識機能・音声合成機能です。W3Cドラフト

## 音声認識機能
マイクからの音声をテキスト化します。Google Chrome(v25~)、Edge(v75~)、Opera(v27~)、Chrome for Android(v4~)などが対応しています。Firefox、Safari、Android Browserなどについては2019年05月15日現在対応していません。
<a href="https://caniuse.com/#feat=speech-recognition" target="_blank">
<img src="https://i.imgur.com/0yL2rI8.png">
</a>


## 音声合成機能
テキストを音声として読み上げ、スピーカーなどへ出力します。Edge、 Firefox、 Chrome、 Safari、 Opera、Firefox Androidなどが対応しています。 IE、Android 版 Operaなどについては2019年05月15日現在対応していません。
<a href="https://caniuse.com/#feat=speech-synthesis" target="_blank">
<img src="https://i.imgur.com/97Eleuj.png">
</a>

追記(2019-05-16): Firefox Androidでは対応していないと書きましたが、誤りです。
caniuse.comと[MDN web docs](https://developer.mozilla.org/ja/docs/Web/API/SpeechSynthesis#Browser_compatibility)で対応状況に関する記述に大きな差異が見られます。情報を提供して下さった@makoto_katoさん、ありがとうございました。

# とりあえず始める
## 音声認識機能
Web Speech APIの[SpeechRecognition](https://developer.mozilla.org/ja/docs/Web/API/SpeechRecognition)インターフェイスを利用します。Google Chromeなどのwebkit系のブラウザで利用する場合は、プレフィックスが付与された`window.webkitSpeechRecognition`を参照します。

1. まず、以下をGoogle Chromeのデベロッパーコンソールで実行しましょう。

音声認識を行うために必要なことは、`webkitSpeechRecognition`インスタンスを作成し、各種設定を行った上で、`.start()`メソッドを実行することだけです。 **10行に満たないコードで音声認識ができることに感動**します。

```js
var rec = new webkitSpeechRecognition();
rec.continuous = false; // 後述
rec.interimResults = false; // trueにすると認識途中の結果も返す
rec.lang = 'ja-JP'; // 言語を指定する
rec.maxAlternatives = 1; // 結果候補の最大数(デフォルトは1)
rec.onresult = e => {
  // 認識結果がSpeechRecognitionEventインスタンスとして渡されます
  // 認識した言葉を表示
  console.log(e.results[0][0].transcript)
  rec.stop() // 認識が完了したら終了する
}
rec.start() // 認識を開始します
```

⚠ なお、Chroniumユーザの方は、音声認識機能はサポートされていない点に注意してください。

2. 次に、ブラウザに対してマイクの使用を許可しましょう。   
おそらく、以下のようなポップアップが表示されますので、これを許可しましょう。
![](https://i.imgur.com/YsDXy2F.png)

3. 喋りましょう。

4. デベロッパーコンソールに喋った内容が表示されます。

⚠なお、一度認識を行った上で、もう一度認識を行うためには、`rec.stop()`メソッドを実行して音声認識を停止した上で、再度`rec.start()`メソッドを実行する必要があります。

もしくは、`continuous`オプションを`true`にすることで、連続的にノンストップで認識し続けることができます。
この場合、ページがロードされてから現在までに認識した結果の一覧が、`webkitSpeechRecognition.onresult`へ渡されるイベント`e`の`e.results`に格納されます。
```js
var rec = new webkitSpeechRecognition();
rec.continuous = true; // <--- これ!!!
rec.interimResults = false;
rec.lang = 'ja-JP'; // 言語を指定する
rec.onresult = e => {
  // 最後に認識した言葉を表示
  console.log(e.results[e.results.length - 1][0].transcript)
}
rec.start() // 認識を開始します
```
ただし、`continuous`オプションを利用するためには、`https://`以下で実行する必要があります。無料でhttpsのWebページを提供するには、[Netlify](https://www.netlify.com/)がおすすめです。

## 音声合成機能
Web Speech APIの[SpeechSynthesisUtterance](https://developer.mozilla.org/ja/docs/Web/API/SpeechRecognition)インターフェイスを利用します。

以下を任意のWebブラウザのデベロッパーコンソール上で実行するだけで、動作が確認できると思います。   
```js
var u = new SpeechSynthesisUtterance();
u.text = "こんにちは"; // 発話する内容を指定する
u.lang = 'ja-JP'; // 言語を指定する
u.rate = 1.0; // 発話速度を指定する
speechSynthesis.speak(u); // 喋らせる
```
⚠ただし、一部のWebブラウザでは、一度ユーザがそのページでクリックなどのアクションを行った後でなければ音声合成を実行しない仕様になっています。

# 実行例
## 音声認識
[https://codepen.io/KilledByNLP/pen/dEvbvR](https://codepen.io/KilledByNLP/pen/dEvbvR)に実装・デモを公開しました。
Webブラウザの仕様上、このデモは直接ページを開かないと実行できません。

<iframe height="400" style="width: 100%;" scrolling="no" title="dEvbvR" src="//codepen.io/KilledByNLP/embed/dEvbvR/?height=400&theme-id=0&default-tab=html,js" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/KilledByNLP/pen/dEvbvR/'>dEvbvR</a> by KilledByNLP
  (<a href='https://codepen.io/KilledByNLP'>@KilledByNLP</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

## 音声合成
[https://codepen.io/KilledByNLP/pen/rgyNMw](https://codepen.io/KilledByNLP/pen/rgyNMw)に実装・デモを公開しました。
「オタク」のイントネーションがすごく気になります。

<iframe height="265" style="width: 100%;" scrolling="no" title="rgyNMw" src="//codepen.io/KilledByNLP/embed/rgyNMw/?height=265&theme-id=0&default-tab=js,result" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/KilledByNLP/pen/rgyNMw/'>rgyNMw</a> by KilledByNLP
  (<a href='https://codepen.io/KilledByNLP'>@KilledByNLP</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

# 参考資料

- [https://w3c.github.io/speech-api/](https://w3c.github.io/speech-api/)
- [https://developer.mozilla.org/ja/docs/Web/API/Web_Speech_API](https://developer.mozilla.org/ja/docs/Web/API/Web_Speech_API)
- [https://www.caniuse.com](https://www.caniuse.com)