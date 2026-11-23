# ポイ活マガジン（mea-poikatsu-magazine）

メアのポイ活メディア「ポイ活マガジン」の独立サイト版。Astro＋Markdownで構築し、Cloudflare Pages（Free）で公開する。旧サイト（muse.ai）は移行完了＋ユーザー最終承認があるまで削除しない。

## 公開URL（暫定）

- https://mea-poikatsu-magazine.pages.dev （Cloudflare Pagesのプロジェクト作成時にサブドメインが確定したら `astro.config.mjs`・`public/robots.txt`・`public/sitemap.xml` のURLを書き換えること）

## 内容

- 記事：全19サービス分の個別記事ページ（`src/content/articles/`）。カテゴリ14部門（ポイントサイト4／SNS・動画2／通信1／銀行・金融1／フリマ1／決済1／決済・送金1／ゲーム・くじ1／ゲーム・オリパ1／AIアシスタント1／歩数ポイ活2／CM視聴ポイ活1／予想ポイ活1／育成ゲーム1）
- トップページ：表紙特集（Freecash・ARTICLE 01）、特集記事一覧（ARTICLE 01〜19）、特典ランキング（13行）、FAQ 5件、姉妹ブログ、AdMax 3箇所
- カテゴリページ：14部門
- サイト内検索：`/search/`（ビルド時に `/search-index.json` を生成し、ブラウザ内で絞り込み）
- 法務ページ：広告・紹介報酬に関する表記／プライバシーポリシー／利用規約・免責事項（旧サイトの文言をそのまま移行）
- SEO：ページごとの固有title・meta description・canonical・XMLサイトマップ・robots.txt・OGP・JSON-LD（WebPage／ItemList／FAQPage／Article／BreadcrumbList）・パンくず・内部リンク・モバイル対応。JavaScriptなしでも記事本文はHTMLに含まれる。

## 紹介コード・URLの扱い

- コード・紹介URL・特典額・条件は `src/content/articles/*.md` のfrontmatterと本文に記載。変更するときは `~/workspace/*-referral-post.txt` と台帳 `~/workspace/site-migration-inventory.md` §4.1 で照合すること。
- ワラウのレートは1pt＝1円（公式確認済み）。紹介URLは `/bEs5`（コード `bEs7` と末尾が違うのが正しい）。公式バナーHTMLの `/boav` は使わないこと。
- Freecashは招待コード入力後、初回DLで1,430円分ゲット（旧表記「招待された側は初回DLで1,430円分」は誤りで使わないこと）。
- トクエルの記事ファイル名は `tokueru.md`（公式ドメイン tokueru.jp・既存4サイトのスラッグと一致）。

## 画像について

- `public/images/` の画像6ファイルはGitHubの `push_files` では送れない（UTF-8テキストのみ対応）。GitHub Web UIのドラッグ＆ドロップで `public/images/` にアップロードすること。アップロードが済むまでデプロイ先では画像が表示されない。
- hero.jpg＝ヒーローバナー、banner-freecash.jpg＝Freecash HQバナー、banner-muse.jpg＝Muse紹介画像、banner-official-{warau,moppy,hapitas}＝公式細型バナー3枚。

## ビルド

```bash
npm run build
```

## 注意

- 旧サイトの削除は、移行完了の報告とユーザー最終承認があるまで行わない。
- Cloudflare Pagesへのデプロイは、Cloudflareアカウント作成後に行う。
