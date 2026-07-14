import { getArticles } from "@/lib/markdown";
import FadeIn from "@/components/FadeIn";
import ArticleCard from "@/components/ArticleCard";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "文章 - 静谧录",
};

export default function ArticlesPage() {
  const articles = getArticles();

  return (
    <div className="max-w-3xl mx-auto px-6 pt-16 pb-16">
      <FadeIn>
        <h1 className="text-3xl font-bold text-[#1e2d3d] mb-2">文章</h1>
        <p className="text-[#5a6d7e] mb-8">
          共 {articles.length} 篇文章
        </p>
      </FadeIn>

      {articles.length === 0 ? (
        <FadeIn>
          <p className="text-[#8899aa] text-center py-20">暂无文章</p>
        </FadeIn>
      ) : (
        <div className="grid gap-4">
          {articles.map((a, i) => (
            <FadeIn key={a.slug} delay={i * 0.05}>
              <ArticleCard article={a} />
            </FadeIn>
          ))}
        </div>
      )}
    </div>
  );
}
