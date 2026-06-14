# 開発環境セットアップ

## 起動手順

### 1. 初回のみ: フロントエンドの初期化

```bash
docker compose build frontend
docker compose run --rm frontend sh -c "npm create vite@latest . -- --template react-ts"
```

### 2. 全サービスの起動

```bash
docker compose up --build
```

初回以降は `--build` なしでも起動できます。

```bash
docker compose up
```

### 3. 停止

```bash
# Ctrl+C で止めてから
docker compose down
```

DBのデータも含めて全て削除したい場合:

```bash
docker compose down -v
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
