# my-docker-app

React + Go + PostgreSQL の構成で動く Docker 開発環境のサンプルです。

## 動作確認用クイックスタート

### 前提

- [Docker Desktop](https://www.docker.com/products/docker-desktop/) がインストールされていること

### 手順

```bash
# 1. リポジトリをクローン
git clone https://github.com/kakaz-one/my-docker-app.git
cd my-docker-app

# 2. 起動（初回はイメージのビルドが走るため数分かかります）
docker compose up --build
```

### 確認用 URL

| サービス | URL |
|---|---|
| フロントエンド | http://localhost:5173/ |
| バックエンド API | http://localhost:8080/api/hello |
| ヘルスチェック | http://localhost:8080/health |

### 停止

```bash
# Ctrl+C で止めてから
docker compose down
```

---

## 構成

| サービス | 技術 | ポート |
|---|---|---|
| frontend | React + TypeScript (Vite) | 5173 |
| backend | Go | 8080 |
| db | PostgreSQL 16 | 5432 |

詳しいセットアップ手順は [docs/setup.md](docs/setup.md) を参照してください。

---

## パッケージの追加（フロントエンド）

`npm install` はローカルでは実行できません。必ずコンテナ内で実行してください。

```bash
docker compose exec frontend npm install <パッケージ名>
```
