---
title: "Featured Post With Cover Image (Test)"
description: "A test post to validate featured pinning, cover image hero, and the og:image meta tag."
date: 2026-02-07
tags: [startups, ai]
draft: false
cover: "/images/blog/a1.png"
featured: true
---

## This is a test post for featured + cover

This post exists to verify that:

- It appears **pinned to the top** of `/blog/` above chronological posts
- The card on `/blog/` has a **"Featured"** label and distinct styling (accent border + gradient background)
- The post page shows the **cover image** as a hero above the title
- The `og:image` meta tag in the HTML `<head>` points to `/images/blog/a1.png`
- Since it has no `series`, it shows **tag badges** (`startups` / `ai`) that link to their tag pages
- Prev/next uses **chronological** order (not series order)

### Two tags

The `ai` tag is new — it should appear as a filter button on `/blog/` and generate `/blog/tag/ai/`.
