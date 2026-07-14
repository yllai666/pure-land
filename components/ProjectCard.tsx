import Link from "next/link";
import type { ProjectMeta } from "@/lib/markdown";

export default function ProjectCard({ project }: { project: ProjectMeta }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="block rounded-lg border border-[#e0e2db] overflow-hidden hover:-translate-y-1 hover:shadow-md transition-all duration-200 no-underline"
    >
      {project.cover && (
        <div className="w-full aspect-[16/10] overflow-hidden bg-[#e0e2db]/30">
          <img
            src={project.cover}
            alt={project.title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
      )}
      <div className="p-5">
        <time className="text-xs text-[#a0b0c0] tracking-wider">
          {project.date}
        </time>
        <h3 className="text-base font-bold text-[#1e2d3d] mt-1 mb-1.5">
          {project.title}
        </h3>
        <p className="text-sm text-[#5a6d7e] leading-relaxed line-clamp-2">
          {project.summary}
        </p>
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
      </div>
    </Link>
  );
}
