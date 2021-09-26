---
title: 独自ドメインでのメール送受信をGoogle Domains + Gmailで簡単に実現
date: '2019-02-10T00:00:00.121Z'
desc: 'Google Domainsで独自ドメインを管理すれば、簡単に独自ドメインでGmailでの送受信が行える'
keywords: 'Gmail,独自ドメイン,Google Domains'
---

## 目的

誰でも一度は独自ドメインでのメール送受信を夢見る。
しかし、わざわざメールサーバを用意するのは面倒だし、
せっかくの休日にSendmailやPostfixなどのMTA(Mail Transfer Agent)の設定と格闘するのは御免だ。

そこで、Google Domains のメールエイリアス機能を利用する。
今回は、以下の手順で簡単に Gmail 上から独自ドメインでのメール送受信を行う。

1. Google Domainsでドメインを購入/Google Domainsへドメインを移管
2. メールの受信設定
3. メールの送信設定

## Google Domainsの特徴

Google DomainsはGoogleが提供するドメイン管理サービスで、以下の特徴を備える。

### モダンでシンプルで明快なUI

ご覧の通り、物凄くシンプルだ。   
しかも、モバイルでもPCでも、同じ操作で、同じ結果が得られる。
![](/assets/posts/g-mail-by-your-own-domain-with-google-domains/2019-02-10-12-40-11.png)

### 明快な価格設定

Google Domainsに私たちが支払うのは、ドメインの購入・移管・更新時だけ。  
謎のオプション手数料をぶん取られることはない。  
ちなみに、.comドメインはお名前.comの方が少しだけ安い一方で、.pwドメインなどはお名前.comに対して1/3の価格で購入できる。   

### メール転送機能・プライバシー保護機能・DNS 機能が無料

当たり前のことだと思うかもしれない。  
しかし、お名前.comでは当たり前のことではなかった。
ちなみに、メールエイリアスは100個まで発行できる。
仕事用、プライベート用、捨てアド用の独自ドメインのメアドを全部Gmail上で管理できるから、本当に便利だ。

### 大量のお知らせメールが届かない

お名前.comからのお知らせメールには不思議な魅力がある。

午前中に3件も届いた素敵なメールは、脳にアドレナリンを分泌させ、冷蔵庫を何度も何度も蹴飛ばしたくなるような活力を与えてくれる。
まさに読むエナジードリンクだ。ちゃんと読んだことないけど。

Google Domainsに移管した結果、残念ながらその素敵なメールは二度と届かなくなった。

## Google Domainsでドメインを購入する

もしドメインを持っていないなら、[Google Domains](https://domains.google.com/m/registrar/search?hl=ja&authuser=0)から購入しよう。

まず、欲しいドメインで検索し、カートに追加したら、カートに移動する。
![](/assets/posts/g-mail-by-your-own-domain-with-google-domains/2019-02-10-13-00-15.png)
次に、「精算」をクリックすれば、購入完了だ。
![](/assets/posts/g-mail-by-your-own-domain-with-google-domains/2019-02-10-13-02-09.png)

## Google Domainsへドメインを移管する

もし既にドメインを持っているなら、Google Domainsへ移管しよう。

### お名前.comをご利用の場合

[お名前comからgoogle domainsにドメイン移管する - Qiita](https://qiita.com/fnifni/items/0daca17e0750659f2866)

### ムームードメインをご利用の場合

[co.uk ドメインをムームードメインから Google Domains へ移管する - with a Christian Wife](https://blog.withachristianwife.com/2018/07/29/transfering-co-uk-domain/)

## メールの受信設定
まず、独自ドメインでメールを受信する設定を示す。
ドメイン管理画面(https://domains.google.com/m/registrar/?hl=ja&authuser=0)を開き、「管理」をクリックする。
![](/assets/posts/g-mail-by-your-own-domain-with-google-domains/2019-02-10-13-15-33.png)

次に、メールの転送元と転送先を設定する。
![](/assets/posts/g-mail-by-your-own-domain-with-google-domains/2019-02-10-13-19-16.png)


## メールの送信設定
### 二段階認証の設定
この機能を利用するにはGmailを利用しているGoogleアカウントに二段階認証を設定する必要がある。
二段階認証の設定画面(https://myaccount.google.com/signinoptions/two-step-verification?utm_source=google-account&utm_medium=web)に移動し、設定する。

### アプリパスワードの設定
次に、アプリパスワードを設定する。
アプリパスワードの管理画面(https://myaccount.google.com/apppasswords)に移動し、以下のように設定し、アプリパスワードを取得する。

![](/assets/posts/g-mail-by-your-own-domain-with-google-domains/2019-02-10-13-31-19.png)
![](/assets/posts/g-mail-by-your-own-domain-with-google-domains/2019-02-10-13-35-04.png)
![](/assets/posts/g-mail-by-your-own-domain-with-google-domains/2019-02-10-13-36-25.png)

### メールアドレスの追加

最後に、Gmailのアカウント設定画面(https://mail.google.com/mail/u/0/#settings/accounts)からメールアドレスを追加する。

まず、「他のメールアドレスを追加」をクリックする。
![](/assets/posts/g-mail-by-your-own-domain-with-google-domains/2019-02-10-13-44-00.png)
次に、送信元にしたいメールアドレスと名前を入力する。
![](/assets/posts/g-mail-by-your-own-domain-with-google-domains/2019-02-10-13-47-14.png)

最後に、SMTP サーバー、ポート、ユーザー名、パスワードを入力する。
* SMTP サーバー   
smtp.**gmail**.com
* ポート   
465
* ユーザー名   
**Gmail**のメールアドレス(example@gmail.com)
* パスワード   
先程取得したアプリパスワード

![](/assets/posts/g-mail-by-your-own-domain-with-google-domains/2019-02-10-13-57-01.png)

これで、設定は完了となる。

## おわりに
最後に、設定した独自ドメインでメールを送受信できるか確認する。