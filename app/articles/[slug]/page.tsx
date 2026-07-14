import { getArticles, getArticleBySlug } from "@/lib/markdown";
import { remark } from "remark";
import remarkHtml from "remark-html";
import FadeIn from "@/components/FadeIn";
import Link from "next/link";
import { notFound } from "next/navigation";
import Comment from "@/components/Comment";
import type { Metadata } from "next";

export async function generateStaticParams() {
  return getArticles().map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return {};
  return { title: `${article.title} - 静谧录` };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const articles = getArticles();
  const index = articles.findIndex((a) => a.slug === slug);
  if (index === -1) notFound();

  const article = articles[index];
  const prev = index < articles.length - 1 ? articles[index + 1] : null;
  const next = index > 0 ? articles[index - 1] : null;

  const result = await remark().use(remarkHtml).process(article.content);
  const html = result.toString();

  return (
    <div className="max-w-3xl mx-auto px-6 pt-16 pb-16">
      <FadeIn>
        <header className="mb-10">
          <h1 className="text-3xl font-bold text-[#1e2d3d] mb-3">
            {article.title}
          </h1>
          <time className="text-sm text-[#a0b0c0] tracking-wider">
            {article.date}
          </time>
          {article.tags && article.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-3">
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs text-[#8899aa] bg-[#e0e2db]/40 px-2 py-0.5 rounded"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </header>
      </FadeIn>

      <FadeIn delay={0.1}>
        <article
          className="prose-custom"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </FadeIn>

      <FadeIn delay={0.2}>
        <nav className="mt-16 pt-8 border-t border-[#e0e2db] flex justify-between text-sm">
          {prev ? (
            <Link
              href={`/articles/${prev.slug}`}
              className="text-[#6b8aab] hover:text-[#1e2d3d] no-underline"
            >
              &larr; {prev.title}
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link
              href={`/articles/${next.slug}`}
              className="text-[#6b8aab] hover:text-[#1e2d3d] no-underline text-right"
            >
              {next.title} &rarr;
            </Link>
          ) : (
            <span />
          )}
        </nav>
      </FadeIn>
      <Comment />
    </div>
  );
}
