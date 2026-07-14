import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import matter from "gray-matter";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..", "content");
const OUT = path.resolve(__dirname, "..", "public", "search-data.json");

function readMarkdownFiles(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter((f) => f.endsWith(".md"));
}

function stripMd(md) {
  return md
    .replace(/^#{1,6}\s+/gm, "")
    .replace(/\*{1,3}(.+?)\*{1,3}/g, "$1")
    .replace(/`{1,3}[^`]*`{1,3}/g, "")
    .replace(/!\[.*?\]\(.*?\)/g, "")
    .replace(/\[(.+?)\]\(.*?\)/g, "$1")
    .replace(/>\s/g, "")
    .replace(/^[-*+]\s/gm, "")
    .replace(/\n{2,}/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

const entries = [];

for (const file of readMarkdownFiles(path.join(ROOT, "articles"))) {
  const raw = fs.readFileSync(path.join(ROOT, "articles", file), "utf-8");
  const { data, content } = matter(raw);
  entries.push({
    type: "article",
    slug: file.replace(/\.md$/, ""),
    title: data.title || "",
    summary: data.summary || "",
    text: stripMd(content),
    date: data.date || "",
    tags: data.tags || [],
    url: `/articles/${file.replace(/\.md$/, "")}`,
  });
}

for (const file of readMarkdownFiles(path.join(ROOT, "projects"))) {
  const raw = fs.readFileSync(path.join(ROOT, "projects", file), "utf-8");
  const { data, content } = matter(raw);
  entries.push({
    type: "project",
    slug: file.replace(/\.md$/, ""),
    title: data.title || "",
    summary: data.summary || "",
    text: stripMd(content),
    date: data.date || "",
    tags: data.tags || [],
    url: `/projects/${file.replace(/\.md$/, "")}`,
  });
}

for (const file of readMarkdownFiles(path.join(ROOT, "moments"))) {
  const raw = fs.readFileSync(path.join(ROOT, "moments", file), "utf-8");
  const { data } = matter(raw);
  entries.push({
    type: "moment",
    slug: file.replace(/\.md$/, ""),
    title: "",
    summary: data.text || "",
    text: data.text || "",
    date: data.date || "",
    tags: [],
    mediaType: data.mediaType || "none",
    url: "/moments",
  });
}

fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, JSON.stringify(entries, null, 2));
console.log(`Generated search index: ${entries.length} entries`);
