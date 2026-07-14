import fs from "fs";
import path from "path";
import matter from "gray-matter";

const CONTENT_ROOT = path.join(process.cwd(), "content");

export interface ArticleMeta {
  slug: string;
  title: string;
  date: string;
  summary: string;
  tags: string[];
}

export interface MomentMeta {
  slug: string;
  date: string;
  text: string;
  mediaType: "image" | "video" | "none";
  mediaUrl: string;
}

export interface ProjectMeta {
  slug: string;
  title: string;
  date: string;
  summary: string;
  cover: string;
  tags: string[];
}

function readDir(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter((f) => f.endsWith(".md"));
}

function parseFile<T>(filePath: string): T & { content: string } {
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  return { ...(data as T), content };
}

export function getArticles(): (ArticleMeta & { content: string })[] {
  const dir = path.join(CONTENT_ROOT, "articles");
  return readDir(dir)
    .map((file) => {
      const slug = file.replace(/\.md$/, "");
      const parsed = parseFile<ArticleMeta>(path.join(dir, file));
      return { ...parsed, slug };
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getArticleBySlug(slug: string) {
  const articles = getArticles();
  return articles.find((a) => a.slug === slug) ?? null;
}

export function getMoments(): (MomentMeta & { content: string })[] {
  const dir = path.join(CONTENT_ROOT, "moments");
  return readDir(dir)
    .map((file) => {
      const slug = file.replace(/\.md$/, "");
      const parsed = parseFile<MomentMeta>(path.join(dir, file));
      return { ...parsed, slug };
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getProjects(): (ProjectMeta & { content: string })[] {
  const dir = path.join(CONTENT_ROOT, "projects");
  return readDir(dir)
    .map((file) => {
      const slug = file.replace(/\.md$/, "");
      const parsed = parseFile<ProjectMeta>(path.join(dir, file));
      return { ...parsed, slug };
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getProjectBySlug(slug: string) {
  const projects = getProjects();
  return projects.find((p) => p.slug === slug) ?? null;
}

export function getArchive() {
  const articles = getArticles();
  const grouped: Record<string, typeof articles> = {};
  for (const a of articles) {
    const year = new Date(a.date).getFullYear().toString();
    (grouped[year] ??= []).push(a);
  }
  return Object.entries(grouped).sort(([a], [b]) => +b - +a);
}

export function getAllTags(): string[] {
  const articles = getArticles();
  const set = new Set<string>();
  articles.forEach((a) => a.tags?.forEach((t) => set.add(t)));
  return Array.from(set).sort();
}
