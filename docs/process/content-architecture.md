# Content Architecture

## Principle

Frontmatter is the source of truth. Folders are for human organization only.

The glob loader reads `**/*.md` from `src/content/posts/` — folder depth and folder names have zero effect on routing, filtering, or display. A post's behavior is entirely determined by its frontmatter fields.

## Folder Structure

```
src/content/posts/
  investing/
    10-lessons-part-1.md
    10-lessons-part-2.md
  crypto/
    top-5-currencies.md
  startups/
    12-things-building-ventures.md
  newsletters/
    weekly-recap-ep1.md
    weekly-recap-ep2.md
```

Organize by topic or whatever makes files easy to find. Move files between folders freely — nothing breaks. The folder a file lives in has no effect on its URL, tags, series membership, or distribution.

## Frontmatter Schema

### Required Fields

```yaml
title: "10 Investing Lessons (Part 1)"
description: "A 1-2 sentence excerpt for cards, SEO, and Substack preview"
date: 2026-02-08
tags: [investing, lessons]
draft: false
```

| Field | Type | Purpose |
|-------|------|---------|
| `title` | string | Display title everywhere — site, cards, SEO, Substack |
| `description` | string | Excerpt for blog cards, meta description, Substack preview |
| `date` | date | Original publish date. Controls sort order. |
| `tags` | string[] | Flexible categorization. A post can have multiple. Used for filtering. |
| `draft` | boolean | `true` = hidden from listings and builds. Default `false`. |

### Optional Fields

```yaml
# URL
slug: "10-investing-lessons-part-1"

# Series
series: "weekly-recap"
issue: 1

# Distribution
substack: false
substack_id:
audience: "everyone"

# Visual
cover: "/images/blog/investing-lessons.jpg"
featured: false

# Revision
updated: 2026-03-15
```

| Field | Type | Default | Purpose |
|-------|------|---------|---------|
| `slug` | string | filename | Override the URL slug. If omitted, uses the markdown filename (without extension). |
| `series` | string | null | Groups posts into a named series. Enables series archive pages and prev/next within series. |
| `issue` | number | null | Position within a series. Used for ordering and "Issue #N" display. |
| `substack` | boolean | false | Whether this post should be cross-posted to Substack. |
| `substack_id` | number | null | Substack post ID, written back after publishing. Enables "Read on Substack" link. |
| `audience` | enum | "everyone" | `everyone`, `paid`, `free`. Mirrors Substack's audience model. Passed when cross-posting. |
| `cover` | string | null | Path to cover image. Used for blog card thumbnail, post hero, and og:image. |
| `featured` | boolean | false | Pin to top of listing pages, above chronological posts. |
| `updated` | date | null | Last meaningful revision date. Shows "Updated Mar 15" without changing sort position. |

### Deliberately Omitted

| Field | Reason |
|-------|--------|
| `author` | Single author site. Hardcoded in template. Add later if guest writers appear. |
| `read_time` | Calculated from word count at build time. |
| `layout` | Derived from `series` presence — one template handles both. |
| `toc` | Generated from headings in markdown content. |
| `meta_title` / `meta_description` | Use `title` and `description`. Add overrides only when needed. |
| `canonical_url` | Only needed for content published elsewhere first. Add when relevant. |
| `subtitle` | Substack concept. Passed separately during cross-posting, not stored in frontmatter. |
| `category` | Replaced by `tags`. Tags are open-ended and multi-valued. |

## Routing

Frontmatter drives URLs. Folders are invisible to routing.

| Content | URL | Source |
|---------|-----|--------|
| Any post | `/blog/{slug}/` | slug field or filename |
| Tag filter | `/blog/tag/{tag}/` | posts where `tags` includes `{tag}` |
| Series archive | `/series/{series}/` | posts where `series` equals `{series}` |
| All posts | `/blog/` | all non-draft posts, newest first |

### URL resolution

1. If `slug` is set in frontmatter → use it
2. Otherwise → use the markdown filename (without `.md`)

Example: `src/content/posts/investing/10-lessons-part-1.md` with no `slug` field routes to `/blog/10-lessons-part-1/`.

### Listing page behavior

**`/blog/`** — Shows all non-draft posts. Featured posts pinned to top, then chronological. Tag filter buttons generated from all tags in use.

**`/blog/tag/{tag}/`** — Same layout, filtered to posts with that tag.

**`/series/{series}/`** — Posts in the series, ordered by `issue` number (ascending). Shows series name as heading, issue numbers on each card.

## Display Logic

The post template adapts based on frontmatter — no separate templates needed:

```
if series + issue:
  show "Issue #N" badge
  show series prev/next navigation (by issue order)
else:
  show tag badges
  show chronological prev/next navigation

if cover:
  show hero image
if updated:
  show "Updated {date}" below publish date
if substack_id:
  show "Also on Substack" link
```
