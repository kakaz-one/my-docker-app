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

## DB接続情報

| 項目 | 値 |
|---|---|
| Host | localhost |
| Port | 5432 |
| User | postgres |
| Password | postgres |
| Database | myapp |
