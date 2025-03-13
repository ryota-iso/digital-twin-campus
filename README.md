# DigitalTwin Campus
慶應義塾大学湘南藤沢キャンパス(SFC)を3D空間上に再現したWebアプリケーション

## 機能
- キャンパスの3D表示
- LLMを用いた教室情報の検索
- 現在位置の表示

## システム構成
- フロントエンド
  - フレームワーク: Astro
  - UIライブラリ: React, Panda CSS
  - 3Dモデル(glTF)の描画: Three.js
- バックエンド
  - HTTPサーバー: Express.js
- 外部サービス
  - RDBMS: PlanetScale
  - LLM: Open AI (Chat gpt-3.5)

## ディレクトリ構造
```bash
.
├── front   # フロントエンド用プログラム (Astro + React)
├── backend # バックエンド用プログラム (Express.js + Socket.IO)
└── infra   # MySQL, Redis用のDockerCompose
```

## 環境構築
**事前準備**
Node.jsバージョン管理ツール[Volta](https://volta.sh/)のインストール
```bash
curl https://get.volta.sh | bash
```

**フロントエンド**
```bash
# 依存パッケージのインストール
yarn install

# panda cssの準備
yarn prepare

# 開発用サーバの起動
yarn dev
```

**バックエンド**
# 環境変数ファイルをコピー
```bash
# 環境変数ファイルをコピー
cp .env.sample .env.dev

# 依存パッケージのインストール
yarn install

# Prismaクライアントの生成, 型情報の生成, seederの実行
yarn run prisma:dev

# 開発用サーバの起動
yarn dev
```
