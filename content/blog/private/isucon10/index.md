---
title: 'ISUCON10 予選敗退の記録と反省'
date: '2020-09-20T00:00:00.121Z'
desc: '1300 点でした'
keywords: 'ISUCON,ISUCON 10,ISUCON10'
image: 'https://raw.githubusercontent.com/ebiebievidence/blog/master/content/blog/2020/09/isucon10/ogp.png'
---

## はじめに

2020/09/28 に開催された ISUCON10 で予選敗退。  
とても楽しい問題でしたが、無残にも敗れ去りました。  
来年に向け、事前準備および当日にやったことを振り返ります。

## メンバー

- [@ebiebievidence](https://twitter.com/ebiebievidence) (私)
  - 初参戦  
  - デプロイ環境を整える
  - アプリケーション
- [@genya0407](https://twitter.com/genya0407)  
  - ISUCON7, ISUCON8 に続き参戦  
  - インフラ
  - スロークエリを見てインデックスを張ったり
  - アプリケーションのコード修正もしていた
  - (全部)

## 事前準備

### 初動

ISUCON7 および ISUCON8 の予選をベースに、主に初動の練習をしました。  
私は ISUCON について完全な素人であり、@genya0407 から色々と教わりながら以下のように初動を分担しました。

1. マニュアル読み合わせ (二人で)
1. アプリを一通り触る(二人で)
1. ここからは作業分担
    - @genya0407
        1. `/etc/hosts` をチームメンバーに配る
          ホスト名を揃えておくと何かとコマンドを共有しやすくて便利
        1. nginx.conf に LTSV のログを出力する設定を加える
        1. my.cnf にスローログを出力する設定を加える
        1. alp をインストールする
    - @ebiebievidence
        1. アプリコードおよびデータベースのマイグレーションファイルを GitHub リポジトリに上げる
        1. デプロイコマンドを作る
          デプロイ時に必ずログファイルをローテートする
        1. docker-compose で利用可能なローカル開発環境を構築する
        1. アプリコードにプロファイラを仕込む
1. 各種プロファイルの結果を見ながら方針を決定する (二人で)

### ツール

以下のツールを利用することとしました。
今回は New Reric の無料ライセンスが利用できるなど、最新のツールを利用することもできましたが、使い慣れたツールを利用することにしました。

- alp
- pt-query-digest
- [fgprof](https://github.com/felixge/fgprof)
  - Off-CPU な実行時間ベースで計測できる Golang プロファイラ
  - 標準ライブラリに含まれている pprof は On-CPU な実行時間ベースでのみ計測するため、DB や外部 API など外部とのやりとりで時間を溶かしている部分を見つけられない

#### **自作のシナリオ可視化ツール**

「それぞれのユーザがどのような動線を辿っているかを可視化できれば、どのエンドポイントがクリティカルであるか分かるのでは」という @genya0407 の天才的な提案がありました。

nginx の `userid` 機能を利用してトラッキング Cookie を付与することで、それぞれのユーザがエンドポイントを叩く順番を可視化することができます。

それを受けて、私は LTSV 形式の access.log をパースしてユーザごとの辿る経路をサンキー図で出力する CLI を作りました。

以下は、 ISUCON9 予選のログをこの CLI に読ませた結果です。 ほとんどのユーザはログイン後すぐに `POST /sell` または `POST /buy` のいずれかを叩き、その後 `GET /items/id.json` や `GET /new_items/id.json` を回遊していることなどが分かります。

![ユーザごとの辿る経路を示すサンキー図(ISUCON9予選)](./sankey-isucon9.png)

## 当日

### 流れ

初回ベンチで CPU リソースが足りていないことがわかったため、 CPU への負荷を減らすことができるに考えました。

初動が完了したら、以下の流れで改善を行いました。

まず fgprof, pt-query-digest でボトルネックを探します。より低いコストで改善できそうなボトルネックから改修を行い、ローカル環境で動作確認をし、問題がなさそうであれば PR を作ります。これをもう一人がレビューをし、問題がなければデプロイしてベンチを回します。そして、点数が下がっていなければマージし、再度ボトルネックを探します。

### 実施したこと

ほぼ @genya0407 がやってくれました。私、精進します...

#### bot からのリクエストが来ているか判断した

@genya0407 が access.log を シェル芸でいい感じに解析して、bot からのリクエストが来ているか確認した。
しかし、ほぼ全く来ていなかったため、対策を見送った。

**反省**

実は、ボットはある程度サービスの負荷が減ると登場するという仕組みだったらしい。しかし、そこに気づかずに最後までここの対策をしなかった。

#### ユーザの行動の追跡 (うまくいかなかった)

WIP

#### MySQL 8 へのアップグレード (中止)

私の「MySQL 8 なら色々機能増えてるしパフォーマンスも良くなってるっぽいし、MySQL 8 に上げるっしょ！」という雑な思いつきに @genya0407 が付き合ってくれて MySQL 8 へアップグレードしてくれましたが、スコアが爆下がりするという事件が発生したため中止されました。binlog を無効する必要があったようです。

**反省**

MySQL 8 の機能をよく知らないのに MySQL 8 へのアップグレードをなんとなくの気持ちで提案してしまった私は、MySQL 8 の機能をきちんとキャッチアップするか、自分が知っている範囲の知識で地に足つけて戦うかするべきです。

#### DB サーバと Web サーバを 1 台ずつの構成に

CPU への負荷を下げるために、@genya0407 が DB サーバと Web サーバを分けてくれました。
確かここで 1000 点台に乗った気がします。

#### popularity を逆にする

@genya0407 がスローログを見ていく中で、 `GET /api/estate/search` エンドポイントで発行されている以下のクエリについて、 ソート時にインデックスが使われていないことに気が付きました。

```sql
SELECT * FROM estate WHERE ... ORDER BY popularity DESC, id ASC LIMIT ? OFFSET ?
```

MySQL 5.x では降順インデックスが利用できないため、 popularity を初期化時に逆にしてあげることで上記クエリを `ORDER BY popularity ASC, id ASC` に書き換え、インデックスでソートできるようにしました [(#8)](https://github.com/isucon-genya-uni/isucon10y/pull/8)。

#### いい感じにインデックスを貼る

@genya0407 がスローログを見ながらいい感じにインデックスを貼っていきました。

```sql
create index e1 on isuumo.estate (popularity);
create index estate_rent on isuumo.estate (rent);
create index estate_point on isuumo.estate (latitude, longitude);
create index i1 on isuumo.chair (price);
```

例: [#6](https://github.com/isucon-genya-uni/isucon10y/pull/6)

```sql
-- 変更前:
MySQL [isuumo]> explain SELECT * FROM chair WHERE stock > 0 ORDER BY price ASC, id ASC LIMIT 20;
+----+-------------+-------+------------+------+---------------+------+---------+------+-------+----------+-----------------------------+
| id | select_type | table | partitions | type | possible_keys | key  | key_len | ref  | rows  | filtered | Extra                       |
+----+-------------+-------+------------+------+---------------+------+---------+------+-------+----------+-----------------------------+
|  1 | SIMPLE      | chair | NULL       | ALL  | NULL          | NULL | NULL    | NULL | 28907 |    33.33 | Using where; Using filesort |
+----+-------------+-------+------------+------+---------------+------+---------+------+-------+----------+-----------------------------+

-- 適用したインデックス:
create index i1 on isuumo.chair (price);

-- 変更後:
MySQL [isuumo]> explain SELECT * FROM chair WHERE stock > 0 ORDER BY price ASC, id ASC LIMIT 20;
+----+-------------+-------+------------+-------+---------------+------+---------+------+------+----------+-------------+
| id | select_type | table | partitions | type  | possible_keys | key  | key_len | ref  | rows | filtered | Extra       |
+----+-------------+-------+------------+-------+---------------+------+---------+------+------+----------+-------------+
|  1 | SIMPLE      | chair | NULL       | index | NULL          | i1   | 4       | NULL |   20 |    33.33 | Using where |
+----+-------------+-------+------------+-------+---------------+------+---------+------+------+----------+-------------+
```

#### 範囲検索を ID 検索に置き換え

たとえば、家賃 (rent) については検索画面では 4 種類の範囲しか選べませんが、DB へのクエリでは `rent >= ? AND rent < ?` のように範囲検索がされていました。これらについて、 DB に `rent_id` を設け、 `rent_id` で検索できるようにしました。

```go
for _, r := range estateSearchCondition.Rent.Ranges {
    if r.Max > 0 {
        query := `UPDATE estate SET rent_id = ? WHERE rent >= ? AND rent < ?`
        _, err := db.Exec(query, r.ID, r.Min, r.Max)
        if err != nil {
            panic(err)
        }
    } else {
        query := `UPDATE estate SET rent_id = ? WHERE rent >= ?`
        _, err := db.Exec(query, r.ID, r.Min)
        if err != nil {
            panic(err)
        }
    }
}
```

この修正を door_width や price などにも横展開し適用しましたが、後述の理由により十分スコアが伸びませんでした。

**反省**

インデックスを `rent_id` のみに貼ってしまい、 `popularity` と複合インデックスで貼らなかったことからスコアは大きく伸びませんでした。後々`alp -q` で振り返ると、検索エンドポイントへのアクセスのほとんどは単純な条件による検索だったため、 `rent_id, popularity` とか `price_id, popularity` とか貼っておけばいい感じにスコアが伸びたのかもしれません。ユーザ、もといベンチマーカーの動きは例年必ずクセがあるので、これを見落とさないように alp の結果を見る時はクエリパラメータも含めて見るべきですね。

加えて、境界値を誤る痛恨の不具合を入れてしまい、この原因究明に時間を費やしてしまいました。境界値周りはあまりにも有名な凡ミスである一方で、焦っている時ほど踏みがちですから、気をつけたいですね。

また、コストが高い対応については本当に必要かよく検討し、必要であれば方針を言語化してレビューなどをしてもらうべきだったかもしれません。

#### COUNT(*) の結果をキャッシュ

pt-query-digest および fgprof から、物件検索でも椅子検索でも `COUNT(*)` が CPU 時間を食いつぶしていることが分かりました。
初めはキャッシュテーブルを作ってそこにキャッシュさせましたが、あまりスコアが伸びなかったためアプリのメモリに載せました。\([#12](https://github.com/isucon-genya-uni/isucon10y/pull/12) および [#16](https://github.com/isucon-genya-uni/isucon10y/pull/16)\)

ちなみに、 [catatsuy/mercari_go_isucon.md](https://gist.github.com/catatsuy/e627aaf118fbe001f2e7c665fda48146) を参考にさせて頂きました。Golang の `sync.RWMutex` は気軽に使えて便利です。

```go
type countMap struct {
    sync.RWMutex
    count map[string]int64
}

func (c *countMap) Set(key string, value int64) {
    c.Lock()
    c.count[key] = value
    c.Unlock()
}

func (c *countMap) Get(key string) (int64, bool) {
    c.RLock()
    v, found := c.count[key]
    c.RUnlock()
    return v, found
}

func (c *countMap) Clear() {
    c.RLock()
    c.count = make(map[string]int64)
    c.RUnlock()
    return
}

func NewCountMap() *countMap {
    m := make(map[string]int64)
    c := &countMap{
        count: m,
    }
    return c
}

func searchEstates(c echo.Context) error {
    // (中略)
    count, ok := estateCountMap.Get(hash)
    if ok {
        res.Count = count
    } else {
        err = db.Get(&res.Count, countQuery+searchCondition, params...)
        if err != nil {
            c.Logger().Errorf("searchEstates DB execution error : %v", err)
            return c.NoContent(http.StatusInternalServerError)
        }
        chairCountMap.Set(hash, res.Count)
    }
```

#### なぞって検索の DB クエリのソートをアプリでやる

なぞって検索は検索結果が 50 件前後ですが、ソートが重かったっぽいのでアプリでやるように @genya0407 が改修してくれました[(#15)](https://github.com/isucon-genya-uni/isucon10y/pull/15)。

## 反省

WIP

## まとめ

WIP