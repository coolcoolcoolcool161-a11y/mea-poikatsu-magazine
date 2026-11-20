// サイト共通の設定。GA4測定IDはユーザーから提供され次第ここに入れる。
// 空のままならGA4スクリプトは出力されない。
export const SITE = {
  name: 'ポイ活マガジン',
  operator: 'メア',
  siteUrl: 'https://mea-poikatsu-magazine.pages.dev',
  description:
    'メアのポイ活マガジン｜ワラウ・ハピタス・モッピー・Freecash・TikTokなど全19サービスの紹介コード・招待コードを特集記事で読む。2026年11月号。',
  dateModified: '2026-11-19',
  gaMeasurementId: '',
  xAccount: 'https://x.com/pppppuririn',
  hubUrl:
    'https://muse.ai/s/musezong-he-medeia-pr6xcxtfrplwxt/NPnupwzcqqtYUBN_-w0KoHvF5cDIBSAOBo4Nt8ve-5o',
} as const;

// Astro 5ではcontent collectionのentry.idに拡張子（.md）が付くため、URL用スラッグに変換する
export const slugOf = (id: string) => id.replace(/\.md$/, '');

// 旧サイト（ポイ活マガジン v16）のARTICLEカテゴリ分け
export const CATEGORIES = [
  { slug: 'point-sites', name: 'ポイントサイト' },
  { slug: 'sns-video', name: 'SNS・動画' },
  { slug: 'telecom', name: '通信' },
  { slug: 'bank-finance', name: '銀行・金融' },
  { slug: 'flea-market', name: 'フリマ' },
  { slug: 'payment', name: '決済' },
  { slug: 'payment-transfer', name: '決済・送金' },
  { slug: 'game-lottery', name: 'ゲーム・くじ' },
  { slug: 'game-oripa', name: 'ゲーム・オリパ' },
  { slug: 'ai-assistant', name: 'AIアシスタント' },
  { slug: 'walk-poikatsu', name: '歩数ポイ活' },
  { slug: 'cm-poikatsu', name: 'CM視聴ポイ活' },
  { slug: 'prediction-poikatsu', name: '予想ポイ活' },
  { slug: 'farm-game', name: '育成ゲーム' },
] as const;

export type CategorySlug = (typeof CATEGORIES)[number]['slug'];

export const CATEGORY_NAMES: Record<string, string> = Object.fromEntries(
  CATEGORIES.map((c) => [c.slug, c.name]),
);

// 旧サイトの特集記事の並び（ARTICLE 01〜19）。トップページの初期表示に使う。
export const MAGAZINE_ORDER = [
  'freecash',
  'moppy',
  'warau',
  'hapitas',
  'tiktok',
  'tiktok-lite',
  'rakuten-mobile',
  'olive',
  'mercari',
  'paypay',
  'airwallet',
  'orikuji',
  'pokekatsu',
  'muse',
  'sampo',
  'butamaru',
  'mirapoi',
  'tokueru',
  'dips',
] as const;

// 旧サイトのARTICLE番号（ARTICLE 01〜19）
export const ARTICLE_NUMBERS: Record<string, string> = Object.fromEntries(
  MAGAZINE_ORDER.map((s, i) => [s, String(i + 1).padStart(2, '0')]),
);

// 旧サイトの特典ランキング（特典額の大きい順。11位はPayPay・エアウォレットの同率）
export const BENEFIT_RANKING = [
  { rank: '1', service: '楽天モバイル', benefit: '13,000pt', condition: '初めての申込・MNP乗り換え（その他は12,000pt）', slug: 'rakuten-mobile' },
  { rank: '2', service: 'モッピー', benefit: '最大7,000P', condition: '登録＋広告利用5,000P以上', slug: 'moppy' },
  { rank: '3', service: 'TikTok', benefit: '6,000円分', condition: '新規登録（モバイル通信で招待URLを開く）', slug: 'tiktok' },
  { rank: '4', service: 'ワラウ', benefit: '最大2,500pt', condition: '紹介経由で新規登録', slug: 'warau' },
  { rank: '5', service: 'ハピタス', benefit: '最大2,300P', condition: '登録＋ログイン・広告利用などの条件達成', slug: 'hapitas' },
  { rank: '6', service: '三井住友銀行 Olive', benefit: 'Vポイント1,000円相当', condition: 'エントリー＋契約＋翌月末残高10,000円以上', slug: 'olive' },
  { rank: '7', service: 'Freecash', benefit: '約1,430円相当', condition: '紹介リンク登録＋対象ゲームをプレイ', slug: 'freecash' },
  { rank: '8', service: 'TikTok Lite', benefit: '1,400円分', condition: '新規登録（モバイル通信で招待URLを開く）', slug: 'tiktok-lite' },
  { rank: '9', service: 'ポケカツ', benefit: '500円無料〜', condition: '新規登録で招待コード入力', slug: 'pokekatsu' },
  { rank: '10', service: 'メルカリ', benefit: '500円分', condition: '新規登録で招待コード入力', slug: 'mercari' },
  { rank: '11', service: 'PayPay', benefit: '300pt', condition: 'コード入力＋1,000円以上の支払い', slug: 'paypay' },
  { rank: '11', service: 'エアウォレット', benefit: 'Ponta 300pt', condition: '紹介リンクから新規登録', slug: 'airwallet' },
  { rank: '13', service: 'オリくじ', benefit: '両方プレゼント', condition: '登録時に招待コード入力', slug: 'orikuji' },
] as const;

// 姉妹ブログ（旧サイトの「姉妹ブログ」5件。旧muse.ai URL。姉妹サイトの移行が完了したら新pages.dev URLに更新する）
export const SISTER_BLOGS = [
  {
    name: 'ポイ活ブログ',
    note: '総合版だよ。特選バナーとカテゴリ別カードで全サービスを網羅するメインブログなの♪',
    url: 'https://muse.ai/s/poihuo-burogu-xlxi6xcxsxg4ghx07/74yi0ejxEmcRwO9Gsp15bpRovm76_UruhoA3biG-N2o',
  },
  {
    name: '紹介コードランキング',
    note: '特典額のランキング形式で比較しながら選べる、順位重視のブログだよ🏆',
    url: 'https://muse.ai/s/shao-jie-kodorankingu-jxj6xcxsxfxqxj6xqx0/OqiA00u9xkaSI9_7bBwCrskhhMRQu3SkOvHqtDonW84',
  },
  {
    name: 'ポイ活コード検索',
    note: 'サービス名で検索して、紹介コードだけを素早く見つけられる検索特化ブログだよ🔍',
    url: 'https://muse.ai/s/poihuo-kodojian-suo-hb6xcxsxg20qsxl/6jl8s6igC6cBHibzVwCEADiLunryhUT0jRZr_pVQrQE',
  },
  {
    name: 'かんたん紹介コード案内',
    note: '初めての人向けに、手順をかんたんに案内するやさしいブログだよ🌸',
    url: 'https://muse.ai/s/kantanshao-jie-kodoan-nei-sb6xcxsxgtxkxkbk/iHPHnEFAX37Hrni_FagP81wlqfSoecaEv0cODGcaaS8',
  },
  {
    name: 'ゲームポイ活ブログ',
    note: 'Freecashなどゲームで貯めるポイ活を中心に紹介するゲーム特化ブログだよ🎮',
    url: 'https://muse.ai/s/gemupoihuo-burogu-gxi6xcxsxgpf18xc/dc3zg6z-_dnAhCoD7Nkbu9w9wGj0ytBYpNWuVBeOS-I',
  },
] as const;

export const FAQS = [
  {
    q: '紹介コードはどこで入力しますか？',
    a: 'サービスごとに違うよ。各記事に載せている紹介リンクから登録するとコード入力が不要なものが多いの。コード入力が必要なサービス（PayPay、オリくじ、ポケカツなど）は、登録時または登録直後の専用画面で入力してね♪',
  },
  {
    q: '特典はいつもらえますか？',
    a: '各サービスの条件達成後、サービス所定のタイミングで付与されるよ。条件や付与時期は記事内の「条件」と原文に書いてある内容を確認してね。キャンペーン内容は変更・終了する場合があるよ。',
  },
  {
    q: '登録にお金はかかりますか？',
    a: 'この特集で紹介しているポイントサイト・アプリの登録はすべて無料だよ♡ 楽天モバイルやOliveなど、契約・利用に料金が発生するサービスは各公式ページで条件を確認してね。',
  },
  {
    q: '姉妹ブログとの違いは何ですか？',
    a: '載せている紹介コードと特典は同じだよ。ポイ活マガジンは雑誌の特集記事のように読み物として楽しめるレイアウトになっているの📖 ランキングで比較したい方は「紹介コードランキング」、コードだけ素早く探したい方は「ポイ活コード検索」も見てみてね。',
  },
  {
    q: '紹介リンクや紹介コードを使うと、メアに報酬が入るのですか？',
    a: 'うん、そうだよ。このページの紹介リンク・紹介コード経由で登録して、各サービスの条件を達成すると、各サービス公式の紹介プログラムにより、メアに紹介報酬（ポイント・特典など）が入る場合があるの。読んでくれているみんなに追加の費用負担はなくて、みんなの特典も通常通り付与されるよ。詳しくは下記の「広告・紹介報酬に関する表記」を見てね。紹介コードの利用は任意だよ。',
  },
] as const;
