import Link from "next/link";
import FadeIn from "@/components/FadeIn";
import StaggerText from "@/components/StaggerText";
import { SITE } from "@/lib/constants";
import { getArticles } from "@/lib/markdown";
import ArticleCard from "@/components/ArticleCard";

export default function Home() {
  const recentArticles = getArticles().slice(0, 3);

  return (
    <div className="max-w-3xl mx-auto px-6">
      <section className="py-20 md:py-28">
        <FadeIn>
          <h1 className="text-4xl md:text-5xl font-bold text-[#1e2d3d] mb-4 tracking-tight">
            <StaggerText text={SITE.name} />
          </h1>
          <p className="text-lg text-[#5a6d7e] leading-relaxed max-w-lg">
            {SITE.subtitle}
          </p>
        </FadeIn>
      </section>

      <section className="pb-16">
        <FadeIn delay={0.15}>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-[#1e2d3d]">最新文章</h2>
            <Link
              href="/articles"
              className="text-sm text-[#6b8aab] hover:text-[#1e2d3d] no-underline"
            >
              查看全部 &rarr;
            </Link>
          </div>
        </FadeIn>

        {recentArticles.length === 0 ? (
          <FadeIn delay={0.2}>
            <p className="text-[#8899aa] py-8">还没有文章</p>
          </FadeIn>
        ) : (
          <div className="grid gap-3">
            {recentArticles.map((a, i) => (
              <FadeIn key={a.slug} delay={0.2 + i * 0.05}>
                <ArticleCard article={a} />
              </FadeIn>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
