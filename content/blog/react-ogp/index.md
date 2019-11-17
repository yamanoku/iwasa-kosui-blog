---
title: React & nginx で簡単にOGP
date: '2018-07-13T00:00:00.121Z'
desc: 'React & nginxの環境における、私の場合のOGP対応について'
keywords: 'React,nginx,OGP'
---

## 追記: 2019-01-18

2019 年現在、Gatsby や Nuxt.js などの静的サイトジェネレータを利用するなど、よりよい方法が存在します。

## OGP とは

Facebook・Slack・Twitter などで Web ページが共有された時に、  
タイトルと説明文と画像がカード形式で表示されることがありますね。
アレが OGP です。

Web ページの META 要素にタイトルや画像 URL、説明文を埋め込むことで、  
Facebook や Twitter のクローラが読み込みに来てくれるというものです。

```html
<head>
  <meta property="og:title" content="React SPAでOGP" />
  <meta property="og:image" content="/posts/react-ogp/ogp.png" />
  <meta
    property="og:description"
    content="React SPAにOGPを設定する方法について"
  />
</head>
```

## SPA で OGP を扱う上での問題点

SPA(Single Page Application)で OGP を扱うには、一工夫が必要です。Facebook や Twitter のクローラが、Javascript を実行しないためです。  
[react-helmet](https://github.com/nfl/react-helmet)を利用して React 上から`<head />` を書き換えて META タグを変更しても、そもそも JS が実行されないので意味を持ちません。

## Prerender.io による OGP 対策

Prerender.io は、JS でレンダリングされる Web ページを、Javascript を実行した上で取得しキャッシュするサービスです。
また、価格も 200 ページまでは無料、20000 ページまでは\$15/月と非常に良心的です。
しかし、極力は外部に依存しないように運用したいという気持ちから、今回は導入をしませんでした。

## Nginx による OGP 対策

そこで、Nginx 上で User-Agent から来訪者がクローラであるか判断し、クローラであればそれぞれのコンテンツに対して生成されたクローラ専用のページに飛ばすことにしました。
[https://gist.github.com/thoop/8165802](https://gist.github.com/thoop/8165802)を参考に、設定ファイルを書きました。

```nginx
server {
    listen       80;
    server_name  www.uniuniunicode.com;

    location / {
        root   /path/to/your/root;
        index  index.html index.htm;
        try_files $uri @prerender;
    }

    location @prerender {
      set $prerender 0;

      if ($http_user_agent ~* "baiduspider|twitterbot|facebookexternalhit|rogerbot|linkedinbot|embedly|quora link preview|showyoubot|outbrain|pinterest|slackbot|vkShare|W3C_Validator") {
          set $prerender 1;
      }
      if ($uri ~* "\.(js|css|xml|less|png|jpg|jpeg|gif|pdf|doc|txt|ico|rss|zip|mp3|rar|exe|wmv|doc|avi|ppt|mpg|mpeg|tif|wav|mov|psd|ai|xls|mp4|m4a|swf|dat|dmg|iso|flv|m4v|torrent|ttf|woff|svg|eot)") {
          set $prerender 0;
      }

      #resolve using Google's DNS server to force DNS resolution and prevent caching of IPs
      resolver 8.8.8.8;

      if ($prerender = 1) {
          rewrite .* https://$host$request_uri/ogp.html break;
      }
      try_files $uri /index.html;
    }
}
```

OGP を設定したい Web ページは、ブログ記事などに限られているため、それらについて Web ページごとに `ogp.html` を生成しました。
以下は、[Atom で React を書くとタブ一覧が index.tsx だらけで見づらくないですか？ - uniuniunicode.com](https://www.uniuniunicode.com/posts/atom-nice-index/)の `ogp.html`です。
なお、`<body />`の中身はどうせ OGP クローラ以外は見ないので、適当で構いません。何なら空でいいです。

```html
<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8" />
    <title>
      AtomでReactを書くとタブ一覧がindex.tsxだらけで見づらくないですか？ -
      uniuniunicode.com
    </title>
    <meta property="og:type" content="article" />
    <meta
      property="og:url"
      content="https://www.uniuniunicode.com/posts/atom-nice-index/"
    />
    <meta property="og:site_name" content="uniuniunicode.com" />
    <meta name="twitter:card" content="summary" />
    <meta
      property="og:title"
      content="AtomでReactを書くとタブ一覧がindex.tsxだらけで見づらくないですか？"
    />
    <meta
      property="og:image"
      content="/posts/atom-nice-index/before-after.png"
    />
    <meta
      property="og:description"
      content="
      最近、Reactを書き始めたが、どうもindex.cssやindex.js、index.tsxなんかが増えてしまう。そんな状態でAtomでReactを書こうとすれば、たちまち`index.js`のタブだらけになってしまう。

      そんな時、Atomのパッケージの1つ、nice-indexが便利だ。
      コマンドラインから`apm install nice-index`と叩き、Atomを再起動してタブ一覧を見ると、それぞれのディレクトリ名が表示されるようになり、非常に見やすくなった。"
    />
  </head>
  <body>
    最近の悩み
    最近、Reactを書き始めたが、どうもindex.cssやindex.js、index.tsxなんかが増えてしまう。そんな状態でAtomでReactを書こうとすれば、たちまち`index.js`のタブだらけになってしまう。
    そんな時、Atomのパッケージの1つ、nice-indexが便利だ。 コマンドラインから`apm
    install
    nice-index`と叩き、Atomを再起動してタブ一覧を見ると、それぞれのディレクトリ名が表示されるようになり、非常に見やすくなった。
  </body>
</html>
```

これらを `react-helmet` と `react-snapshot` を利用して自動で生成し、`/${そのページのパス}/ogp.html`として保存します。  
手間でなければ、手でサッと書いてしまっても良いかも知れません。  
上記の例であれば、`/posts/atom-nice-index/ogp.html`として保存します。

これによって、 `/posts/atom-nice-index` にアクセスした場合、来訪者が人間であれば`/index.html`が、来訪者がクローラであれば`${uri}/ogp.html`が表示されるようになりました。

## 終わりに

正直、あまりベストプラクティスという感じではありません。  
[よりよい方法を募集](https://twitter.com/uniuniunicode)しています！
