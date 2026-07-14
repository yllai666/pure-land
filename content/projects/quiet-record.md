---
title: "静谧录"
date: "2026-07-14"
summary: "一个 Markdown 驱动的极简个人博客，Next.js SSG + Tailwind CSS。"
cover: ""
tags: ["Next.js", "博客", "Side Project"]
---

## 动机

需要一个不受平台约束、完全自己掌控的内容空间。现有博客平台要么太重，要么定制性太差。

## 技术方案

- **框架**：Next.js 15 + SSG（`output: "export"`）
- **样式**：Tailwind CSS 4，自定义主题色（浅灰 + 藏蓝）
- **内容**：Markdown + gray-matter + remark
- **动效**：Framer Motion（淡入 + 逐字渐显）
- **字体**：Noto Serif SC（思源宋体）

## 设计理念

极简杂志风格。去掉一切多余的视觉元素，让文字和排版本身成为设计。克制动效，只用两种：滚动淡入和逐字渐显。

## 当前状态

已上线第一版，后续会持续迭代。
