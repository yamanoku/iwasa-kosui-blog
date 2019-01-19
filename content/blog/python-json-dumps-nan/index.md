---
title: Python 3.6.3 の json.dumps が、np.nan をそのまま nan として出力する問題の解消
date: '2018-07-13T00:00:00.121Z'
desc: 'jsonライブラリよりも、simplejsonライブラリの方が便利という話'
keywords: 'Python,json,nan,numpy,エラー'
---

## 本記事のねらい

`Python 3.6.3` における `json.dumps` が、 `np.isnan() == True` となるような値を `nan` として出力する問題を、外部ライブラリ`simplejson`によって解決する。

## 問題

- Pandas では欠落値を`np.nan`として保存する
- これを`json`ライブラリを用いて出力すると、以下の通り出力の中に「nan」が紛れ込んでしまう。
  RFC8259 にもあるように、NaN は許可されない。欠落値であるならば、せめて`null`として出力されるべきだ。

```json
[
  {
    "id": 1,
    "body": "yo",
    "parent_id": nan
  }
]
```

## 解決法

Python の標準ライブラリ`json`は、`simplejson`を取り込んだものである。しかし、`simplejson`は標準ライブラリ`json`よりも頻繁にアップデートされていて、機能・速度共に標準ライブラリに勝る。

`simplejson`の`dumps`は、`ignore_nan`という引数を持つ。

`pip install simplejson` でインストールした後、次のように書けばいい。

```python
import numpy as np
import simplejson as json

numbers = [np.nan, 1, 2, 3]

json.dumps(numbers, ignore_nan=True)
```

すると、次のような結果を得る。

```json
[null, 1, 2, 3]
```
