export const SITE = {
  name: "静谧录",
  subtitle: "记录思考、代码与日常碎片",
  description: "一个极简杂志风格的个人博客，分享技术与生活。",
  author: "Blog Author",
  social: {
    github: "https://github.com",
    twitter: "https://twitter.com",
    email: "hello@example.com",
  },
} as const;

export const CUSDIS = {
  host: "https://cusdis.com",
  appId: "20da3647-4f42-4518-b742-52727900e4e8",
  theme: "auto",
} as const;

export const NAV_LINKS = [
  { href: "/articles", label: "文章" },
  { href: "/moments", label: "瞬间" },
  { href: "/projects", label: "项目" },
  { href: "/archive", label: "归档" },
  { href: "/about", label: "关于" },
] as const;
