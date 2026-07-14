import FadeIn from "@/components/FadeIn";
import { SITE } from "@/lib/constants";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "关于",
};

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 pt-16 pb-16">
      <FadeIn>
        <h1 className="text-3xl font-bold text-[#1e2d3d] mb-6">关于</h1>
      </FadeIn>

      <FadeIn delay={0.1}>
        <article className="text-[#1e2d3d] leading-loose space-y-5">
          <p>
            这里是 {SITE.name}，一个记录思考、代码与日常碎片的个人空间。
          </p>
          <p>
            喜欢简洁的设计、清晰的代码和有意义的内容。这个博客用 Next.js
            构建，设计上追求极简杂志风格——舒适排版、克制动效、专注阅读。
          </p>
          <p>
            如果你对这里的内容感兴趣，欢迎通过以下方式找到我：
          </p>
        </article>
      </FadeIn>

      <FadeIn delay={0.2}>
        <div className="mt-8 flex flex-wrap gap-4">
          <a
            href={SITE.social.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-[#6b8aab] hover:text-[#1e2d3d] underline underline-offset-4"
          >
            GitHub
          </a>
          <a
            href={SITE.social.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-[#6b8aab] hover:text-[#1e2d3d] underline underline-offset-4"
          >
            Twitter
          </a>
          <a
            href={`mailto:${SITE.social.email}`}
            className="text-sm text-[#6b8aab] hover:text-[#1e2d3d] underline underline-offset-4"
          >
            Email
          </a>
        </div>
      </FadeIn>
    </div>
  );
}
