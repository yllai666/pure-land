---
title: "CLI 工具集"
date: "2026-04-10"
summary: "一组用 Rust 编写的小型命令行工具，涵盖文件处理、JSON 转换和 HTTP 测试。"
cover: ""
tags: ["Rust", "CLI", "Tools"]
---

## 概述

把工作中反复用到的几个命令行操作封装成了工具集，全部用 Rust 实现，单二进制、零依赖。

## 工具列表

### jfmt
JSON 格式化工具，支持 stdin 管道和文件输入。
```bash
curl api.example.com/data | jfmt
```

### fsum
目录文件校验和生成/验证。用于确认文件传输完整性。

### ht
一个小巧的 HTTP 测试客户端，类似 httpie 但更轻量。
```bash
ht POST api.example.com/users name=John age=30
```

所有工具都发布到了 GitHub，欢迎 Star 和使用。
