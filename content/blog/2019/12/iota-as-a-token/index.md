---
title: '字句としてのiota'
date: '2019-12-09T00:00:00+09:00'
desc: ''
image: 'https://www.uniuniunicode.com/icon.png'
keywords: 'Golang, golang, go, iota'
---

## TL;DR

この記事では、 `iota` は字句として何に該当するのかについて調査した結果を示します。

結論としては、iotaは

- 事前宣言済み識別子
- 型を持たない数値定数

です。

### iotaは識別子である

[golang.org/ref/spec](https://golang.org/ref/spec)によれば、Goにおける字句は以下の通りです。  
この中で、`iota`は **識別子** に該当します。

- **コメント (Comments)**  
  ドキュメントを提供する
- **セミコロン (Semicolons)**  
  文の終端を表す
- **トークン (Tokens)**  
  - **識別子 (Identifiers)**  
    変数・型・定数・関数などのプログラムの実体に対する名前
    ```go
    fuga := "hoge" // fugaは識別子
    ```
  - **キーワード (Keywords)**  
    `break` や `func` など、予約済みのトークン
  - **演算子と区切り文字 (Operators and punctuation)**  
    `+` や `-` など
  - **リテラル (Literals)**  
    `100` や `"hoge"` など

### iotaは事前宣言済み識別子であり、定数である

また、`iota`は **事前宣言済み識別子** と呼ばれる特別な識別子であり、 **定数** です。

事前宣言済み識別子の一覧:

```plain
型 (Types):
  bool byte complex64 complex128 error float32 float64
  int int8 int16 int32 int64 rune string
  uint uint8 uint16 uint32 uint64 uintptr

定数 (Constants):
  true false iota

ゼロ値 (Zero value):
  nil

関数 (Functions):
  append cap close complex copy delete imag len
  make new panic print println real recover
```

事前宣言済み識別子とは、すべてのGoのソースコードを含んでいる最上位のブロック **ユニバースブロック (universe block)** において宣言されている識別子です。

事前宣言済み識別子は、事前に宣言されているだけであって、予約されているわけではありません。よって、`iota` を何か他の値を持つ定数として宣言することもできます。

```go
const (
    a = iota // 10
    b        // 10
    c        // 10
)

const (
    iota = 10   // 10
    d    = iota // 10
    e           // 10
    f           // 10
)

const (
    g float32 = iota // 10
    h                // 10
)
```

### `iota` は型なしの数値定数である

`iota` は整数の連番を生成しますが、型を持ちません。Goでは、型を持たない定数の値は、以下の時に型が確定します。

- 明示的に決定される
  - 他の型あり定数の宣言に用いられる
  - 型変換される
  - など...
- 暗黙的に決定される
  - 変数の宣言に用いられる
  - 演算に用いられる
  - など...

ただし、以下のように、正しくない型変換を行うことはできません。

```go
const (
    a string = iota // cannot convert 0 (type untyped number) to type string
)
```
