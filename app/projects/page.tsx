import { getProjects } from "@/lib/markdown";
import FadeIn from "@/components/FadeIn";
import ProjectCard from "@/components/ProjectCard";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "项目",
};

export default function ProjectsPage() {
  const projects = getProjects();

  return (
    <div className="max-w-3xl mx-auto px-6 pt-16 pb-16">
      <FadeIn>
        <h1 className="text-3xl font-bold text-[#1e2d3d] mb-2">项目</h1>
        <p className="text-[#5a6d7e] mb-8">
          共 {projects.length} 个项目
        </p>
      </FadeIn>

      {projects.length === 0 ? (
        <FadeIn>
          <p className="text-[#8899aa] text-center py-20">暂无项目</p>
        </FadeIn>
      ) : (
        <div className="grid md:grid-cols-2 gap-5">
          {projects.map((p, i) => (
            <FadeIn key={p.slug} delay={i * 0.05}>
              <ProjectCard project={p} />
            </FadeIn>
          ))}
        </div>
      )}
    </div>
  );
}
