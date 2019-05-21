---
title: '[nodemon] Internal watch failed: EMFILE: too many open files, watch'
date: '2019-05-21T00:00:00.000Z'
desc: 'タイトルにあるエラーを解決する方法について'
keywords: 'nodemon,EMFILE,FSEventStreamStart,ERROR'
---

# 問題
nodemonによる既存のプロジェクトを`git clone`して`npm run start`しようとしたら、以下のエラーが表示された

```s
❯ npm run start

server started on port 3001
2019-05-21 11:42 node[10846] (FSEvents.framework) FSEventStreamStart: register_with_server: ERROR: f2d_register_rpc() => (null) (-22)
2019-05-21 11:42 node[10846] (FSEvents.framework) FSEventStreamStart: register_with_server: ERROR: f2d_register_rpc() => (null) (-22)
2019-05-21 11:42 node[10846] (FSEvents.framework) FSEventStreamStart: register_with_server: ERROR: f2d_register_rpc() => (null) (-22)
[nodemon] Internal watch failed: EMFILE: too many open files, watch
```

# 結果
nodeのバージョンをv12からv11に下げたら直った。

```s
❯ node -v
12.2.0

❯ nodenv global 11.15.0

❯ node -v
v11.15.0
```

# 原因
`npm install`した時に、fseventsが入らなかったらしい。fseventsが正常にインストールされていないことと、EMFILEが発生することにどのような関係があるのかはよく分からないので、今度調べてみたい。

```s
❯ npm i

(中略)

npm WARN optional SKIPPING OPTIONAL DEPENDENCY: fsevents@1.2.7 (node_modules/fsevents):
npm WARN optional SKIPPING OPTIONAL DEPENDENCY: fsevents@1.2.7 install: `node install`
npm WARN optional SKIPPING OPTIONAL DEPENDENCY: Exit status 1
```

# 他の解決法

1. プロセス全部殺す

https://github.com/remy/nodemon/issues/731#issuecomment-284385507
```
$ killall -9 node resolve this problem
```

ロックだ...

2. watchmanをインストールする

※ nodemonではなくcreate-react-appでの話

https://github.com/facebook/create-react-app/issues/4540#issuecomment-393268543
> The easiest thing would be to install Watchman:
```
$ brew update
$ brew install watchman
```

3. ulimitを上げる

https://stackoverflow.com/questions/32953838/react-native-error-error-watch-emfile
```
$ ulimit 4096 # for instance
```
ゴリ押しではあるが、どうしてもダメだったらこの手もありかもしれない。