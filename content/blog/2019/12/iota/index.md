---
title: 'dive into iota: iotaはいつ誰が管理しているのか？'
date: '2019-12-09T00:00:00+09:00'
desc: ''
image: 'https://www.uniuniunicode.com/icon.png'
keywords: 'Golang, golang, go, iota'
---

## はじめに

この記事は、[Go3 Advent Calendar 2019](https://qiita.com/advent-calendar/2019/go3)の9日目の記事です。

普段、私たちは何気なく`iota`を利用しています。
しかし、私は`iota`を使っていくうちに、「誰が1ずつインクリメントしてくれているんだろう...そもそもiotaってなんなんだろう...」と不思議に思うようになりました。

```go
const (
  A = iota + 1 // 1
  B            // 2..
  C            // 3... どうやってインクリメントとされていくんだ?
)
```

そのことが気になった私は、[github.com/golang/go](https://github.com/golang/go)を読みながら、調べてみることにしました。

本記事は、以下を知ることを目的とします。

- iotaは字句として何に該当するのか
- iotaが渡されたそれぞれの定数の値はいつどのように計算されるのか

## 字句としての`iota`

まず、 `iota` は字句として何に該当するのかについて考えます。

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

## `iota` の値はいつどのように決定されるのか

本章では、`iota`の値がいつどのように決定されるかを説明します。

また、そのために以下を前提知識として共有します。

* Goコンパイラ `gc` によるコンパイルの流れ
* 「定数の宣言」の文法と各名称

### Goコンパイラ `gc` によるコンパイルの流れ

どのタイミングで `iota` の値が計算されるかを知るためには、コンパイルの流れを知る必要があります。

著名なGoのコンパイラの1つである`gc`は、大まかにいえば以下の手順に従ってコンパイルを行います。

1. Scan: ソースを字句リストへ分割  
[src/cmd/compile/internal/syntax/scanner.go](https://github.com/golang/go/blob/cdd2c265cc132a15e20298fbb083a70d7f3b495d/src/cmd/compile/internal/syntax/scanner.go)  
1. Parse: 字句リストを構文ツリーへ変換  
[src/cmd/compile/internal/syntax/parser.go](https://github.com/golang/go/blob/)  
gcは、1つの.goファイルごとに1つの`noder`構造体を作成し、`syntax`パッケージの構文解析関数`Parse`の結果を食わせる。この時、`syntax.Parse`関数の内部で呼び出された
`fileOrNil`関数がファイル単位の構文解析を行い、必要に応じて`constDecl`、`importDecl`、`typeDecl`、`varDecl`、`funcDeclOrNil`を呼び出す。
1. 構文ツリーからASTを構築  
[src/cmd/compile/internal/gc/syntax.go](https://github.com/golang/go/blob/117400ec095335f24e5363f61d60f8baad6be3ce/src/cmd/compile/internal/gc/syntax.go)
1. 型チェック  
[src/cmd/compile/internal/gc/typecheck.go](https://github.com/golang/go/blob/b7d097a4cf6b8a9125e4770b54d33826fa803023/src/cmd/compile/internal/gc/typecheck.go)
1. ASTを解析し再構築  
[src/cmd/compile/internal/gc/main.go](https://github.com/golang/go/blob/bf3ee57d27f7542808f8a153c7b547efaba355b0/src/cmd/compile/internal/gc/main.go)
1. SSA形式へ変換する 
[src/cmd/compile/internal/gc/ssa.go](https://github.com/golang/go/blob/a037582efff56082631508b15b287494df6e9b69/src/cmd/compile/internal/gc/ssa.go)
1. SSAを最適化する
[src/cmd/compile/internal/ssa](https://github.com/golang/go/tree/a037582efff56082631508b15b287494df6e9b69/src/cmd/compile/internal/ssa)
1. 機械語を生成

ソースコードを構文ツリーへと変換する部分は`syntax`パッケージが、構文ツリーからASTを構築し、SSAへ変換する部分は`gc`パッケージが、SSAを最適化する部分は`ssa`パッケージが担当しています。

### 「定数の宣言」の文法と各名称

本章では、以後の説明のために、「定数の宣言」の文法と各名称を示します。

「定数の宣言」の文法をEBNF形式で表現すると、以下の通りとなります。

```go
ConstDecl      = "const" ( ConstSpec | "(" { ConstSpec ";" } ")" ) .
ConstSpec      = IdentifierList [ [ Type ] "=" ExpressionList ] .
IdentifierList = identifier { "," identifier } . // 識別子のリスト
ExpressionList = Expression { "," Expression } . // 式のリスト
```

つまり、定数の宣言において、それぞれの部分の名前は以下の通りです。
それぞれの名称は、このあとの説明で用いますので、覚えておいてください。

<div class="gatsby-highlight" data-language="go" style="
    font-size: 24px;
"><pre class="language-go"><code class="language-go"><span class="token keyword">const</span> <span class="token punctuation">(</span>
  <ruby style="
    background: #FCE4EC;
    padding: 18px 6px 2px;
"><ruby style="
    background: #80deea;
">A<span class="token punctuation">,</span> B<span class="token punctuation">,</span> C <rt style="font-size: 16px;color: #006c7a;font-weight: bold;">IdentifierList</rt></ruby> <span class="token operator">=</span> <ruby style="
    /* border: 1px solid; */
    background: #FFC107;
"><span class="token string">1</span><span class="token punctuation">,</span> <span class="token string">2</span><span class="token punctuation">,</span> <span class="token string">3</span><rt style="
    text-align: center;
    font-size: 16px;
    color: #994c00;
    font-weight: bold;
    ">ExpressionList</rt></ruby><rt style="
    font-size: 17px;
    color: #E91E63;
    font-weight: bold;
">ConstSpec</rt></ruby>
  <ruby style="
    background: #FCE4EC;
    padding: 18px 6px 2px;
"><ruby style="
    background: #80deea;
">D<span class="token punctuation">,</span> E<span class="token punctuation">,</span> F <rt style="font-size: 16px;color: #006c7a;font-weight: bold;">IdentifierList</rt></ruby> <span class="token operator">=</span> <ruby style="
    /* border: 1px solid; */
    background: #FFC107;
"><span class="token string">"foo"</span><span class="token punctuation">,</span> <span class="token string">"bar"</span><span class="token punctuation">,</span> <span class="token string">"baz"</span><rt style="
    text-align: center;
    font-size: 16px;
    color: #994c00;
    font-weight: bold;
    ">ExpressionList</rt></ruby><rt style="
    font-size: 17px;
    color: #E91E63;
    font-weight: bold;
">ConstSpec</rt></ruby>
<span class="token punctuation">)</span></code></pre></div>

### `ConstDecl`のASTを構築する時の`iota`

この章では、gcが`ConstDecl`のASTを構築する時の挙動を見ていきます。  
gcパッケージでは、ASTのノードを表現するための構造体`Node`が宣言されています。

```go
type Node struct {
      // Tree structure.
    // Generic recursive walks should follow these fields.
    Left  *Node
    Right *Node
    Ninit Nodes
    Nbody Nodes
    List  Nodes
    Rlist Nodes

    // ...

    // Various. Usually an offset into a struct. For example:
    // ...
    // - Named OLITERALs use it to store their ambient iota value.
    // ...
    // - OCLOSURE uses it to store ambient iota value, if any.
    // Possibly still more uses. If you find any, document them.
    Xoffset int64
```

また、`Node`をレシーバとする関数として、`SetIota` があります。これは、`Node`が持つ`Xoffset`という色々な値を突っ込んで良いプロパティに、`iota`の値を代入するというものです。つまり、ASTの各ノードの`iota`の値は`Node.Xoffset`が保持していることが分かります。

```go
func (n *Node) SetIota(x int64) {
    n.Xoffset = x
}
```

そして、この`SetIota`は、`syntax`パッケージのASTを`Node`の木に変換する`noder`をレシーバとする関数`constDecl` から呼ばれています。

<p style="margin-bottom: 1rem;"><code class="language-text">gc</code>パッケージの<code class="language-text">constDecl</code>関数(一部省略):</p>

```go
type constState struct {
    group  *syntax.Group
    typ    *Node
    values []*Node
    iota   int64
}

func (p *noder) constDecl(decl *syntax.ConstDecl, cs *constState) []*Node {
    // Constのグループが変わったらConstの状態を作り直す
    if decl.Group == nil || decl.Group != cs.group {
        *cs = constState{
            group: decl.Group,
        }
    }

    // ConstSpecのIdentifierListが変換されたNodeリスト
    names := p.declNames(decl.NameList)
    typ := p.typeExprOrNil(decl.Type)

    // ConstSpecのExpressionListが変換されたNodeリスト
    var values []*Node
    if decl.Values != nil {
        values = p.exprList(decl.Values)
        cs.typ, cs.values = typ, values
    } else {
        if typ != nil {
            yyerror("const declaration cannot have type without expression")
        }
        typ, values = cs.typ, cs.values
    }

    nn := make([]*Node, 0, len(names))
    for i, n := range names {
        v := values[i]

        // ConstSpecの各Identifierのノードの
        // initializing assignmentとして、対応するExpressionのノードを渡す
        n.Name.Defn = v
        // ConstSpecの各Identifierのノードにiotaの値をセットする
        n.SetIota(cs.iota)

        nn = append(nn, p.nod(decl, ODCLCONST, n, nil))
    }
    cs.iota++ // iotaのカウンタをインクリメントする

    return nn
}
```

これを見ると、どうやらこの関数はConstSpecをASTに変換する関数らしいことがわかります。そして、引数の`constState`はiotaのカウントを状態として持っているようです。

実は、`constDecl`という名前がついた関数は`syntax`パッケージにもあります。
この関数は、上の関数で `Node` のリストへ変換されていた `syntax.ConstDecl` を、字句リストから生成します。
なぜConstSpecこのように、`syntax`パッケージと`gc`パッケージを見比べることで、構文解析からAST生成までの道のりが少し追いやすくなりました。

<p style="margin-bottom: 1rem;"><code class="language-text">syntax</code>パッケージの<code class="language-text">constDecl</code>関数(一部省略):</p>

```go
// ConstSpec = IdentifierList [ [ Type ] "=" ExpressionList ] .
func (p *parser) constDecl(group *Group) Decl {
    if trace {
        defer p.trace("constDecl")()
    }

    d := new(ConstDecl)
    d.pos = p.pos()

    d.NameList = p.nameList(p.name())
    if p.tok != _EOF && p.tok != _Semi && p.tok != _Rparen {
        d.Type = p.typeOrNil()
        if p.gotAssign() {
            d.Values = p.exprList()
        }
    }
    d.Group = group

    return d
}
```

### まとめ

以上より、`iota` の値は 構文解析の結果からASTが生成される時に、`noder.constDecl`関数によって決定されるものかと思われます。  
本記事に間違いがございましたら、[Twitter](https://twitter.com/uniuniunicode)のリプライにてお知らせ下さると幸いです。
拙い記事ですが、ここまでお付き合い頂きありがとうございました。

## 参考記事

- [Go compiler internals: adding a new statement to Go - Part 1](https://eli.thegreenplace.net/2019/go-compiler-internals-adding-a-new-statement-to-go-part-1/)
- [Goを読むその2：compileコマンド（構文解析まで）](https://qiita.com/junjis0203/items/616c00086eb336153f4f)
- [Golangのconst識別子iotaの紹介](https://qiita.com/curepine/items/2ae2f6504f0d28016411)