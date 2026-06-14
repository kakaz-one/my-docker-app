# 開発環境セットアップ

## 起動手順

### 1. 全サービスの起動

```bash
docker compose up --build
```

初回はイメージのビルド（`npm ci` を含む）が走るため数分かかります。

2回目以降はキャッシュが使われるため高速に起動します。

```bash
docker compose up
```

### 2. 停止

```bash
# Ctrl+C で止めてから
docker compose down
```

DBのデータも含めて全て削除したい場合:

```bash
docker compose down -v
```

---

## パッケージの追加（フロントエンド）

`npm install` はローカルでは実行できません。必ずコンテナ内で実行してください。

```bash
docker compose exec frontend npm install <パッケージ名>
```

コンテナが起動していない場合は先に起動してください。

```bash
docker compose up -d
docker compose exec frontend npm install <パッケージ名>
```

---

## IDE（VS Code）で TypeScript のエラーが出るとき

`node_modules` は Docker コンテナ内にしか存在しないため、VS Code がモジュールを見つけられずエラーを表示することがあります。これはアプリの動作には影響しません。`docker compose up` でコンテナを起動してブラウザで確認することができます。

---

## package.json を変更したとき

`npm ci` はビルド時に実行されるため、パッケージを追加・変更した場合は古い `node_modules` を削除してから再ビルドが必要です。

```bash
docker compose down -v
docker compose up --build
```

---

## ブラウザで確認

| サービス | URL | 説明 |
|---|---|---|
| フロントエンド | http://localhost:5173/ | React アプリ |
| バックエンド API | http://localhost:8080/api/hello | サンプルAPIレスポンス |
| ヘルスチェック | http://localhost:8080/health | バックエンドの死活確認 |
| DB | localhost:5432 | PostgreSQL（ブラウザ不可） |

---

## 各サービスの構成

| サービス | 技術 | ポート |
|---|---|---|
| frontend | React + TypeScript (Vite) | 5173 |
| backend | Go + air (ホットリロード) | 8080 |
| db | PostgreSQL 16 | 5432 |

---

## DB操作

### psql に接続する

```bash
docker compose exec db psql -U postgres -d myapp
```

接続後に使えるコマンド：

| コマンド | 説明 |
|---|---|
| `\dt` | テーブル一覧を表示 |
| `\d messages` | messages テーブルの定義を表示 |
| `\q` | psql を終了 |

### よく使うSQL（1行で実行）

```bash
# データを全件取得
docker compose exec db psql -U postgres -d myapp -c "SELECT * FROM messages;"

# データをリセット（全件削除してシードデータを再投入）
docker compose exec db psql -U postgres -d myapp -c "DELETE FROM messages;"
docker compose restart backend

# 件数を確認
docker compose exec db psql -U postgres -d myapp -c "SELECT COUNT(*) FROM messages;"
```

### DBのデータをまとめてリセットする

```bash
docker compose down -v
docker compose up --build
```

`-v` を付けると `postgres_data` volume が削除され、次回起動時にシードデータが再投入されます。

---

## DB接続情報

| 項目 | 値 |
|---|---|
| Host | localhost |
| Port | 5432 |
| User | postgres |
| Password | postgres |
| Database | myapp |
