---
title: あなたは、もうos.pathやglobやopenを使わなくていい
date: '2018-07-13T00:00:00.121Z'
---

# はじめに
Python3.3までは、 **「あるディレクトリ以下に存在するテキストファイルの一覧を取得して、それぞれを開く」** という処理に、以下の3つのライブラリを使う必要がありました。

* ファイルパス操作   
os.path
* ファイルの一覧取得   
glob.glob
* ファイルを開く   
open

しかし、Python3.4以降であれば、これらを **すべて 標準ライブラリ`pathlib`に一任** することができます。   
これによって、ファイル操作処理における **書きやすさ・読みやすさが向上** し、それぞれのライブラリの使い方をわざわざ調べる時間や、 ライブラリ間の微妙な仕様の違いに苛まれる心配から解放されます。

今回は、 **「`../datasets/foo/bar`以下に存在するテキストファイルをすべて取得して、内容を表示したい」** という目標に対して、pathlibを利用しない場合、pathlibを利用する場合のコードを比較しましょう。

# pathlibを利用しない場合
まずは、os.path、glob.glob、openを使った場合のコードを見てみましょう。

```python
import glob
from os.path import join, dirname, abspath

current_dir = dirname(abspath(__file__))
datasets_dir = join(dirname(current_dir), 'datasets', 'foo', 'bar')
file_names = glob.glob(join(datasets_dir, '**/*.txt'), recursive=True)

for file_name in file_names:
    with open(file_name, 'r') as f:
        print(f.read())
```

### 問題: パッと見て、どこを指しているのか分からない
**あなたは、以下のコードを見て、これがどこを指しているのかすぐに分かりますか？**
```python
current_dir = dirname(abspath(__file__))
datasets_dir = join(dirname(current_dir), 'datasets', 'foo', 'bar')
```

普段、私達はディレクトリパスを左から右に読みますし、英語や日本語も左から右に読みます。しかし、joinやdirnameやabspathを使うと、そのコードがどこのパスを示しているのか、左から右にスラスラ読むことはできません。

# pathlibを利用した場合

```python
from pathlib import Path

current_dir = Path.cwd()
datasets_dir = current_dir.parent / 'datasets' / 'foo' / 'bar'
file_names = datasets_dir.glob('**/*.txt')

for file_name in file_names:
    print(file_name.read_text())
```

## 良いところ1: 読みやすい
pathlibを用いた場合、普段我々がディレクトリパスを読む時にそうしているように、左から右にディレクトリパスを追うことができます。
```python
current_dir = Path.cwd()
datasets_dir = current_dir.parent / 'datasets' / 'foo' / 'bar'
```
は、「現在のディレクトリの、親の、'datasets'の中の...」と、まさにそのまま左から右にスラスラと読むことができます。また、pathlibでは`/`演算子でパスを結合することができます。慣れないと少し気持ちが悪いかもしれませんが、読みやすいことは間違いありません。

### 追記
```python
# 方法1
current_dir = Path.cwd()
# 方法2
current_dir = Path(__file__).resolve().parent
```
上記は、場合によってはそれぞれ異なる結果を返します。
「方法1」はスクリプトを実行した時に位置していたディレクトリ、「方法2」は実行されたスクリプトの存在するディレクトリを指します。

## 良いところ2: ちょっとしたことで色々なライブラリをインポートしなくていい
```python
file_names = datasets_dir.glob('**/*.txt')

for file_name in file_names:
    print(file_name.read_text())
```
pathlibを使用する場合、上記のような処理のためにはglobとos.pathの両方をインポートする必要があります。
pathlibを使用すれば、ファイルの一覧の取得も `datasets_dir.glob('**/*.txt')`で一発です。   
また、ファイルの書き込み・読み込みも、`open`で得たファイルオブジェクトの終了処理を気にせずに、気軽に`read_text()`、`write_text()`、`read_bytes()`、`write_bytes()`で行えます。


# おわりに
他にも、詳しいことはすべて https://docs.python.jp/3/library/pathlib.html に記されています。本当に便利です。こちらもぜひ一度ご覧になってください。

ご意見・ご指摘お待ちしております！
研究関連: https://twitter.com/EbiEbiEvidence
実装関連: https://twitter.com/EbiEbiEvidence2

# 追記
色々な反応を頂きましたので、せっかくですからいくつかピックアップして紹介します。

## /が連結演算子ってキモい
僕も最初はそう思ったクチなので気持ちは良くわかるんです。ただ、演算子のオーバーロードはPythonのみならず、Ruby、C++、Swift、Kotlin、Dなどでもサポートされていることから、よくよく考えるとそこまで変な話ではないと思います。個人的には、setの和演算子 `|` や 部分集合判定演算子 `<=` も初めはビビりました。

## 可読性、あんまり変わってなくない？
これはかなり意外な意見でした(笑)。私はディレクトリを指定する時は「このディレクトリの、親ディレクトリの、…」と考えるのですが、pathlibではその直感に沿って右から左に書けるから、書きやすさや読みやすさは向上していると感じましたが、ここは人それぞれといったことでしょうか。