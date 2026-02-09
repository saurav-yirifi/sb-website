# Process Documentation

How content flows through sauravbhatia.com.

## Documents

| Doc | Covers |
|-----|--------|
| [Content Architecture](content-architecture.md) | Frontmatter schema, folder structure, routing rules, display logic |
| [Writing Workflow](writing-workflow.md) | Step-by-step: create, write, preview, publish, cross-post |
| [Substack Distribution](substack-distribution.md) | MCP server, tools, distribution flow, token management |

## Quick Reference

### Minimal frontmatter (site-only article)

```yaml
---
title: "Post Title"
description: "One sentence excerpt."
date: 2026-02-08
tags: [topic]
draft: false
---
```

### Full frontmatter (newsletter issue, cross-posted)

```yaml
---
title: "The Weekly Recap: Ep 5"
description: "This week in tech and investing."
date: 2026-02-08
tags: [recap, investing]
draft: false
slug: "weekly-recap-ep5"
series: "weekly-recap"
issue: 5
substack: true
substack_id:
audience: "everyone"
cover: "/images/blog/recap-ep5.jpg"
featured: false
updated:
---
```

### Routes

```
/blog/                      → all posts
/blog/{slug}/               → individual post
/blog/tag/{tag}/            → filtered by tag
/series/{series-name}/      → series archive
```
