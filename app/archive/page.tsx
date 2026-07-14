import { getArchive } from "@/lib/markdown";
import FadeIn from "@/components/FadeIn";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "归档",
};

export default function ArchivePage() {
  const archive = getArchive();

  return (
    <div className="max-w-3xl mx-auto px-6 pt-16 pb-16">
      <FadeIn>
        <h1 className="text-3xl font-bold text-[#1e2d3d] mb-2">归档</h1>
        <p className="text-[#5a6d7e] mb-8">按年份浏览所有文章。</p>
      </FadeIn>

      {archive.length === 0 ? (
        <FadeIn>
          <p className="text-[#8899aa] text-center py-20">暂无文章</p>
        </FadeIn>
      ) : (
        archive.map(([year, articles], gi) => (
          <FadeIn key={year} delay={gi * 0.08}>
            <section className="mb-10">
              <h2 className="text-xl font-bold text-[#1e2d3d] mb-4">{year}</h2>
              <ul className="space-y-2">
                {articles.map((a) => (
                  <li key={a.slug} className="flex items-baseline gap-3">
                    <time className="text-xs text-[#a0b0c0] w-16 shrink-0 tabular-nums">
                      {a.date.slice(5)}
                    </time>
                    <Link
                      href={`/articles/${a.slug}`}
                      className="text-sm text-[#1e2d3d] hover:text-[#6b8aab] no-underline transition-colors"
                    >
                      {a.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          </FadeIn>
        ))
      )}
    </div>
  );
}
