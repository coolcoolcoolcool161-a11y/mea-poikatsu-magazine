import { getCollection } from 'astro:content';
import { slugOf, CATEGORY_NAMES } from '../data/site';
import { factsOf } from '../data/services';

export async function GET() {
  const articles = await getCollection('articles');
  const index = articles.map((a) => ({
    slug: slugOf(a.id),
    service: a.data.service,
    category: a.data.category,
    categoryName: CATEGORY_NAMES[a.data.category] ?? a.data.category,
    // 特典・コードの表示は正本データ（services-data.json 同期コピー）を優先する
    benefit: factsOf(slugOf(a.id))?.benefit ?? a.data.benefit,
    code: factsOf(slugOf(a.id))?.code ?? a.data.code ?? '',
    title: a.data.title,
    description: a.data.description,
    url: `/mea-poikatsu-magazine/articles/${slugOf(a.id)}/`,
  }));
  return new Response(JSON.stringify(index), {
    headers: { 'content-type': 'application/json; charset=utf-8' },
  });
}
