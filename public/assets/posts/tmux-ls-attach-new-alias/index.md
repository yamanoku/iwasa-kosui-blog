---
title: tmuxのls, new, attach を1文字で完結させるズボラなエイリアス
date: '2019-01-23T00:00:00.121Z'
desc: 'tmux new -s $SESSION_NAME、tmux attach -t $SESSION_NAME...あの長くて面倒なコマンドたちを、すべて1文字のコマンドに集約する方法'
keywords: 'tmux,エイリアス,alias'
---

## TL;DR

```sh
tmux ls
tmux new -s $SESSION_NAME
tmux attach -t $SESSION_NAME
```

を

```sh
t
t $SESSION_NAME # new
t $SESSION_NAME # attach
```

とするエイリアスを紹介する。
きっと色々なツッコミがあるかとは思うが、ぜひ温かい目で見守ってほしい。

## 悩み

前述の 3 つの頻出イディオムは、打つのが中々に面倒だ。
賢明な読者各位は、例えば以下のようなエイリアスを張っていると思う。

```

alias ta='tmux a -t '
alias tn='tmux new -s '
alias tls='tmux ls '

```

しかし、私は非常にズボラで、tmux new と tmux attach をわざわざ使い分けることすら面倒になった。

## 解決策

### ズボラエイリアス

様々な方面から怒られるかもしれないが、私は以下のようなエイリアスを貼っている。

```
t () {
	tmux attach -t $1 2> /dev/null || tmux new -s $1 2> /dev/null || tmux ls
}
```

このようにすることで、tmux ls も、tmux attach も、tmux new も t で完結させることが出来る。

試したい方は、~/.bashrc なり~/.zshrc なりに上記を書き足して頂いた上でターミナルを再起動するなりして設定を反映して、試してみて欲しい。

### ズボラ補完

また、zsh の補完機能のために、以下も書き加えている。

```zsh
_t() { _values 'sessions' "${(@f)$(tmux ls -F '#S' 2>/dev/null )}" }
compdef _t t
```

このようにすることで、以下のように簡単に各セッションに接続できる。

![](https://i.imgur.com/FKdeJJw.png)

## おわりに

何だかこのめちゃくちゃなエイリアスは、きっと何か問題を抱えている気がする。何かマズいことに気が付かれた方は、ツイッターかはてなブックマークで問題点を共有して頂けると嬉しい。
