import { getProjects, getProjectBySlug } from "@/lib/markdown";
import { remark } from "remark";
import remarkHtml from "remark-html";
import FadeIn from "@/components/FadeIn";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export async function generateStaticParams() {
  return getProjects().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};
  return { title: project.title };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const result = await remark().use(remarkHtml).process(project.content);
  const html = result.toString();

  return (
    <div className="max-w-3xl mx-auto px-6 pt-16 pb-16">
      <FadeIn>
        <header className="mb-10">
          <h1 className="text-3xl font-bold text-[#1e2d3d] mb-3">
            {project.title}
          </h1>
          <time className="text-sm text-[#a0b0c0] tracking-wider">
            {project.date}
          </time>
          {project.tags && project.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-3">
              {project.tags.map((tag) => (
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
    </div>
  );
}
