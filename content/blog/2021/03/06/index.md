---
title: 'それでも .env を source したい'
date: '2021-03-06T00:00:00.000Z'
desc: '人はなぜ source .env をするのか'
keywords: 'dotenv,.env,envfile,shell,シェル'
---

## はじめに

様々なやんごとなき事情によって、手元でささっと `source .env` もしくは `env $(cat .env) foobar` したくなる時はありませんか。  
私はあります。

しかし、以下の記事にて指摘されている通り、 `.env` ファイルのシンタックスは、Bash や Zsh などの Bourne Shell 互換のシェルにおける変数の宣言のシンタックスとは異なります。

[安直に .env ファイルを export しないで欲しい](https://zenn.dev/red_fat_daruma/articles/7f0ebe9c4d5659)

実際、上記の記事で挙げられているものを `source .env` にて読み込もうとすると以下のような結果となります。

```
$ source .env
.env:1: command not found: world
.env:2: parse error near `&'
```

しかし、それでもなお様々なやんごとなき事情によって手元でささっと .env の中身を環境変数として読み込みたい時がきっとあるかもしれません。

## 解決策

私は https://github.com/joho/godotenv を利用することにしました。
試してみましょう。

```zsh
$ go get -u github.com/joho/godotenv/cmd/godotenv

$ godotenv -f .env zsh

$ env | grep hello
comment_tailing=hello
including_space=hello world
push_to_background=hello &
pipe_to=hello | world
redirect_to=hello > world
end_statement=hello; world
```

無事に読み込むことができました。良かったね！

## おまけ

実は oh-my-zsh の dotenv plugin でも `source` で `.env` file を読み込んでいるため、上記のファイルを正しく読み込むことができません。

https://github.com/ohmyzsh/ohmyzsh/blob/master/plugins/dotenv/dotenv.plugin.zsh#L47

また、 `.env` ファイルをダイレクトに bash へ読み込ませることについては、以下の gist に先人たちの苦労が記されています。
以下の議論をお読みいただければ、いかにこれが厳しい道程であるかが伝わるかと思われます。

https://gist.github.com/judy2k/7656bfe3b322d669ef75364a46327836

