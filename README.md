# AI Learning Log - Setup Guide

Perplexity の調査結果を AI で要約・タグ付けし、Google スプレッドシートに自動保存するシステムのセットアップガイドです。

## システム構成
- **Chrome Extension**: Perplexity の画面からデータを抽出し、GAS に送信します。
- **Google Apps Script (GAS)**: Gemini API を呼び出してデータを分析し、スプレッドシートに書き込みます。

## セットアップ手順

### 1. Google Apps Script (GAS) の設定
1. Google スプレッドシートを新規作成します。
2. 「拡張機能」 > 「Apps Script」を開きます。
3. `gas/Code.js` の内容をコピー＆ペーストして保存します。
4. **デプロイ**:
   - 「新しいデプロイ」 > 「種類：ウェブアプリ」を選択。
   - アクセスできるユーザーを「全員」にしてデプロイします。
   - 発行された **ウェブアプリ URL** をコピーします。

### 2. Chrome Extension の設定
1. `ext/src/background/index.ts` の `GAS_URL` 変数を、上記でコピーした URL に書き換えます。
2. ターミナルで `ext` フォルダに移動し、ビルドします：
   ```bash
   cd ext
   npm run build
   ```
3. Chrome ブラウザで `chrome://extensions/` を開きます。
4. 「デベロッパーモード」を ON にします。
5. 「パッケージ化されていない拡張機能を読み込む」を選択し、`ext/dist` フォルダを選択します。

## 使用方法
1. [Perplexity](https://www.perplexity.ai/) で検索を行います。
2. 画面右下に表示される「Save to Log」ボタンをクリックします。
3. スプレッドシートに、AI によって要約・タグ付けされた結果が追加されます。
4. 拡張機能のアイコン（Popup UI）をクリックすると、ダッシュボードや履歴を確認できます。

## 設計意図
- **Gemini 1.5 Flash**: 高速かつ低コストな分析のために採用。
- **Svelte + Vite**: 軽量で高速な UI 開発と、モダンな拡張機能ビルド環境を実現。
- **CORS 回避**: Background Script を介することで、ブラウザの CORS 制限を回避して GAS と通信します。
