// S05 ポイレーダー：サービス事実の参照モジュール。
// 事実の正は ~/workspace/site-migration/work/services-data.json。CI（GitHub Actions）はリポジトリ外を
// 読めないため、その同期コピーを src/data/services-data.json に置いて読み込む。
// 事実（コード・紹介URL・特典・条件・期限・確認日）を更新したら、必ず正と同期コピーを両方更新すること。
// このコピーは 2026-11-25 時点の正（ミラポイ招待特典400pt確定を反映済み）から作成した。
import data from './services-data.json';

export interface ServiceFacts {
  slug: string;
  name: string;
  code: string | null;
  /** 併記する友達招待コード（dipsのみ） */
  friendCode: string | null;
  url: string | null;
  officialSite: string | null;
  benefit: string;
  conditions: string[];
  deadline: string | null;
  verified: string;
}

interface RawService {
  slug: string;
  name: string;
  code?: string | null;
  friendCode?: string | null;
  url?: string | null;
  officialSite?: string | null;
  benefit: string;
  conditions?: string[];
  deadline?: string | null;
  verified: string;
}

const rawServices = (data as unknown as { services: RawService[] }).services;

export const SERVICE_FACTS: Record<string, ServiceFacts> = Object.fromEntries(
  rawServices.map((s) => [
    s.slug,
    {
      slug: s.slug,
      name: s.name,
      code: s.code ?? null,
      friendCode: s.friendCode ?? null,
      url: s.url ?? null,
      officialSite: s.officialSite ?? null,
      benefit: s.benefit,
      conditions: s.conditions ?? [],
      deadline: s.deadline ?? null,
      verified: s.verified,
    },
  ]),
);

export const factsOf = (slug: string): ServiceFacts | undefined => SERVICE_FACTS[slug];

export const ALL_FACTS: ServiceFacts[] = rawServices.map((s) => SERVICE_FACTS[s.slug]);

// ---- バッジ付与ルール（すべて正本データからの機械判定。根拠のないバッジは付けない） ----
// NEW: 最終確認日（verified）が全19サービス中で最も新しいものと同日＝「最も新しく確認された案件」。
// 終了間近: 期限（deadline）文字列に含まれる日付まで、ビルド日時点で残り0〜7日。
// 増額: 正本データに増額の根拠（旧額・増額フラグ等）が存在しないため、現時点では付与対象なし。
//       根拠データが正本に追加されたら、その条件をここに機械判定として足すこと（推測で付けない）。

/** 全サービスで最も新しい最終確認日（YYYY-MM-DD） */
export const LATEST_VERIFIED: string = ALL_FACTS.reduce(
  (max, s) => (s.verified > max ? s.verified : max),
  '',
);

/** deadline 文字列から日付（YYYY-MM-DD）を取り出す。日付が無ければ null */
export const deadlineDateOf = (f: ServiceFacts): string | null => {
  if (!f.deadline) return null;
  const m = f.deadline.match(/(\d{4})-(\d{2})-(\d{2})/);
  return m ? `${m[1]}-${m[2]}-${m[3]}` : null;
};

const DAY_MS = 24 * 60 * 60 * 1000;

/** 日本時間（Asia/Tokyo）の今日の日付を UTC ミリ秒で返す。ビルド機のTZに依存させないための措置 */
const tokyoTodayUtc = (now: Date): number => {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Tokyo',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(now);
  const get = (t: string) => Number(parts.find((p) => p.type === t)?.value ?? '0');
  return Date.UTC(get('year'), get('month') - 1, get('day'));
};

/** ビルド時点の日本時間の日付から期限日までの残り日数。期限が無ければ null */
export const daysLeftOf = (f: ServiceFacts, now: Date = new Date()): number | null => {
  const d = deadlineDateOf(f);
  if (!d) return null;
  const [y, mo, da] = d.split('-').map(Number);
  return Math.round((Date.UTC(y, mo - 1, da) - tokyoTodayUtc(now)) / DAY_MS);
};

export type BadgeKind = 'new' | 'ending';

export interface ServiceBadge {
  kind: BadgeKind;
  label: string;
}

/** バッジ一覧を機械判定で返す（表示順：終了間近→NEW） */
export const badgesOf = (f: ServiceFacts, now: Date = new Date()): ServiceBadge[] => {
  const badges: ServiceBadge[] = [];
  const days = daysLeftOf(f, now);
  if (days !== null && days >= 0 && days <= 7) {
    badges.push({ kind: 'ending', label: days === 0 ? '本日終了' : `終了間近・あと${days}日` });
  }
  if (f.verified === LATEST_VERIFIED) {
    badges.push({ kind: 'new', label: 'NEW' });
  }
  return badges;
};

/** 速報ストリップ用：期限がある案件を残り日数の昇順で返す */
export const deadlineNews = (now: Date = new Date()) =>
  ALL_FACTS.map((f) => ({ facts: f, date: deadlineDateOf(f), daysLeft: daysLeftOf(f, now) }))
    .filter((x) => x.date !== null)
    .sort((a, b) => (a.daysLeft ?? 0) - (b.daysLeft ?? 0));

/** 速報ストリップ用：最も新しく確認された案件（verified が全体の最新日と同日） */
export const freshNews = () => ALL_FACTS.filter((f) => f.verified === LATEST_VERIFIED);
