---
title: LINE Messaging API の「Webhook との通信でエラーが発生しました。」を解決する
date: '2018-10-30T00:00:00.121Z'
desc: 'nginxにおける証明書の設定のミスについて'
keywords: 'LINE Messaging API,nginx,Webhook,エラー'
---

## LINE Messaging API

[LINE Messaging API](https://developers.line.me/ja/services/messaging-api/)とは、LINE で Bot を提供するための API。1 対 1 トーク・グループトークの両方に対応している。こちらからユーザにメッセージをプッシュ送信することもできるし、ユーザからのメッセージにリプライを送信することもできる。選択肢のあるボタンや、写真付きのカード形式でリンクなど、リッチな UI を提供することもできる。

## やったこと

1. [AWS EC2](https://aws.amazon.com/jp/ec2/)で t3.micro を借りる
2. [Google Domains](https://domains.google)で独自ドメインを取得する
3. [Let's Encrypt](https://letsencrypt.org/getting-started/)で SSL 証明書を取得する  
   ※ LINE Messaging API の Webhook は、当然ながら SSL にのみ対応している。
4. [nginx](https://www.nginx.com/resources/wiki/start/)で HTTPS サーバを建てる
5. [LINE 公式ドキュメント](https://developers.line.me/ja/docs/messaging-api/getting-started/)を参考にアクセストークン・シークレットキーを取得する
6. [LINE 公式の Flask によるサンプルコード](https://github.com/line/line-bot-sdk-python/tree/master/examples/flask-echo)に、アクセストークンとシークレットキーを入力した上で動かす

## 発生した問題

- 以下のように、 **「Webhook との通信でエラーが発生しました。」** というエラーが表示される。
  ![https://i.imgur.com/2rJUg8W.png](https://i.imgur.com/2rJUg8W.png)
- 上記の接続確認を行っても、EC2 サーバ内にアクセスされたログは残らない。
- ただし、Web ブラウザ上からは問題なく該当ドメインへアクセス出来る。
  また、同サーバ内にアクセスログはきちんと残っている。

## 結論

nginx の`ssl_certificate`が、中間証明書を含んでいなかった。
cert.pem ではなく、fullchain.pem を指定する。

## 学び

1. サーバの証明書に関する設定によっては、Web ブラウザからは問題なく表示出来ても、wget や curl からは SSL 証明書の検証に失敗する場合がある。  
   _追記: 2018/10/30:_ 最近のモダンな Web ブラウザは、中間証明書をキャッシュしたり、Authority Information Access 拡張から欠けている証明書を持ってきたりしてくれる。一方で、curl では Authority Information Access 拡張のサポートは[TODO](https://github.com/curl/curl/blob/master/docs/TODO#L779)に追加されているものの、未だ実装されていない。
2. `ssl_certificate`には、サーバ証明書だけではなく、きちんと中間証明書も含めて指定する。

## 試したこと

### アクセストークン・Channel Secret を再発行する

参考: [LINE Developers から webhook URL の登録に関して｜ teratail](https://teratail.com/questions/112801)

アクセストークンが無効になっている可能性を考えたが、問題は解消しなかった。

ちなみに、同サンプルコードはアクセストークンや Channel Secret が誤っていても、何かしら LINE API とやり取りするまではエラーを吐かない。`LineBotApi`のインスタンスを生成したらすぐに`line_bot_api.get_profile(自分自身のUser ID)`を叩くことで、認証情報が正しいかどうかをチェックすることが出来る。

後々考えてみれば、そもそも LINE Developer コンソールの「接続確認」ボタンを押しても、私のサーバへアクセス出来ていないのだから、ここをどうこうしてもしょうがないのは当然だった。

### wget する

証明書関連において嫌な予感がしたので、wget した。
(以下では、とりあえず当該サーバのドメイン名を example.com とする。)

```
$ wget -O - example.com
example.com (example.com) をDNSに問いあわせています... 23.34.96.213
example.com (example.com)|23.34.96.213|:443 に接続しています... 接続しました。
エラー: example.com の証明書(発行者: `‘CN=Let’s Encrypt Authority X3,O=Let’s Encrypt,C=US')の検証に失敗しました:
  発行者の権限を検証できませんでした。
example.com に安全の確認をしないで接続するには、`--no-check-certificate' を使ってください。
```

```
$ LANG=C wget -O - example.com
Resolving example.com (example.com)… x.x.x.x
Connecting to example.com (example.com)|x.x.x.x|:443… connected.
ERROR: cannot verify example.com’s certificate, issued by ‘CN=Let’s Encrypt Authority X3,O=Let’s Encrypt,C=US’:
Unable to locally verify the issuer’s authority.
To connect to example.com insecurely, use `–no-check-certificate’.

```

中間証明書が見当たらないようだ。
ここで nginx の設定を見直す。
(問題の説明に不必要な設定は全て省いた。)

```conf
server {
    listen 443 default ssl;
    ssl on;

    ssl_certificate /etc/letsencrypt/live/example.com/cert.pem;
    ssl_certificate_key /etc/letsencrypt/live/example.com/privkey.pem;

    location / {
        proxy_pass http://line_sample_bot;
    }
}
```

`ssl_certificate`が、サーバ証明書と中間証明書の両方を結合させた`fullchain.pem`ではなく、サーバ証明書のみである`cert.pem`を指している。

正しく修正する。

```conf
server {
    listen 443 default ssl;
    ssl on;

    # ssl_certificate /etc/letsencrypt/live/example.com/cert.pem;
    ssl_certificate /etc/letsencrypt/live/example.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/example.com/privkey.pem;

    location / {
        proxy_pass http://line_sample_bot;
    }
}
```

動いた。

![https://i.imgur.com/W8CeZ21.png](https://i.imgur.com/W8CeZ21.png)

「Webhook が無効な HTTP ステータスコードを返しました（期待されるステータスコードは 200 です）」という表示がされるが、これはあくまで疎通していることを確認するためだけのものであって、認証に必要な`X-Line-Signature`ヘッダーが付与されたリクエストではないため、正常に動作する状態でもこの表示がされる場合がある。
![https://i.imgur.com/EqFDP3Z.png](https://i.imgur.com/EqFDP3Z.png)
