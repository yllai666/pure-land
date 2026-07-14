import Link from "next/link";
import type { ArticleMeta } from "@/lib/markdown";

export default function ArticleCard({ article }: { article: ArticleMeta }) {
  return (
    <Link
      href={`/articles/${article.slug}`}
      className="block p-6 rounded-lg border border-[#e0e2db] hover:-translate-y-1 hover:shadow-md transition-all duration-200 no-underline"
    >
      <time className="text-xs text-[#a0b0c0] tracking-wider">
        {article.date}
      </time>
      <h3 className="text-lg font-bold text-[#1e2d3d] mt-1 mb-2">
        {article.title}
      </h3>
      <p className="text-sm text-[#5a6d7e] leading-relaxed line-clamp-2">
        {article.summary}
      </p>
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
    </Link>
  );
}
