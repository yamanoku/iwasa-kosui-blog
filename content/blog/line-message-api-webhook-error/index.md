---
title: LINE Messaging API の「Webhook との通信でエラーが発生しました。」エラーについて
date: '2018-10-30T00:00:00.121Z'
---

# LINE Messaging API
[LINE Messaging API](https://developers.line.me/ja/services/messaging-api/)とは、LINEでBotを提供するためのAPI。1対1トーク・グループトークの両方に対応している。こちらからユーザにメッセージをプッシュ送信することもできるし、ユーザからのメッセージにリプライを送信することもできる。選択肢のあるボタンや、写真付きのカード形式でリンクなど、リッチなUIを提供することもできる。

# やったこと
1. [AWS EC2](https://aws.amazon.com/jp/ec2/)でt3.microを借りる
2. [Google Domains](https://domains.google)で独自ドメインを取得する
3. [Let's Encrypt](https://letsencrypt.org/getting-started/)でSSL証明書を取得する   
※ LINE Messaging APIのWebhookは、当然ながらSSLにのみ対応している。
4. [nginx](https://www.nginx.com/resources/wiki/start/)でHTTPSサーバを建てる
5. [LINE公式ドキュメント](https://developers.line.me/ja/docs/messaging-api/getting-started/)を参考にアクセストークン・シークレットキーを取得する
6. [LINE公式のFlaskによるサンプルコード](https://github.com/line/line-bot-sdk-python/tree/master/examples/flask-echo)に、アクセストークンとシークレットキーを入力した上で動かす


# 発生した問題
* 以下のように、 **「Webhook との通信でエラーが発生しました。」** というエラーが表示される。
![https://i.imgur.com/2rJUg8W.png](https://i.imgur.com/2rJUg8W.png)
* 上記の接続確認を行っても、EC2サーバ内にアクセスされたログは残らない。
* ただし、Webブラウザ上からは問題なく該当ドメインへアクセス出来る。
また、同サーバ内にアクセスログはきちんと残っている。

# 結論
nginxの`ssl_certificate`が、中間証明書を含んでいなかった。
cert.pemではなく、fullchain.pemを指定する。

# 学び
1. サーバの証明書に関する設定によっては、Webブラウザからは問題なく表示出来ても、wgetやcurlからはSSL証明書の検証に失敗する場合がある。   
*追記: 2018/10/30:* 最近のモダンなWebブラウザは、中間証明書をキャッシュしたり、Authority Information Access拡張から欠けている証明書を持ってきたりしてくれる。一方で、curlではAuthority Information Access拡張のサポートは[TODO](https://github.com/curl/curl/blob/master/docs/TODO#L779)に追加されているものの、未だ実装されていない。
2. `ssl_certificate`には、サーバ証明書だけではなく、きちんと中間証明書も含めて指定する。

# 試したこと
## アクセストークン・Channel Secretを再発行する
参考: [LINE Developersからwebhook URLの登録に関して｜teratail](https://teratail.com/questions/112801)

アクセストークンが無効になっている可能性を考えたが、問題は解消しなかった。

ちなみに、同サンプルコードはアクセストークンやChannel Secretが誤っていても、何かしらLINE APIとやり取りするまではエラーを吐かない。`LineBotApi`のインスタンスを生成したらすぐに`line_bot_api.get_profile(自分自身のUser ID)`を叩くことで、認証情報が正しいかどうかをチェックすることが出来る。

後々考えてみれば、そもそもLINE Developerコンソールの「接続確認」ボタンを押しても、私のサーバへアクセス出来ていないのだから、ここをどうこうしてもしょうがないのは当然だった。

## wgetする
証明書関連において嫌な予感がしたので、wgetした。
(以下では、とりあえず当該サーバのドメイン名をexample.comとする。)

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
ここでnginxの設定を見直す。
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

「Webhookが無効なHTTPステータスコードを返しました（期待されるステータスコードは200です）」という表示がされるが、これはあくまで疎通していることを確認するためだけのものであって、認証に必要な`X-Line-Signature`ヘッダーが付与されたリクエストではないため、正常に動作する状態でもこの表示がされる場合がある。
![https://i.imgur.com/EqFDP3Z.png](https://i.imgur.com/EqFDP3Z.png)