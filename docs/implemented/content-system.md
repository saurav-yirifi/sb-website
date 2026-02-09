# Content System — Implemented Feb 2026

Implements the content architecture defined in `docs/process/`.

## What Changed

The blog system was migrated from a fixed-category model (`Startups | Investing | Crypto | Weekly Recap`) to a flexible tag-based architecture with series support, Substack cross-posting fields, and new route types.

### Before

- Collection: `blog` at `src/content/blog/` (flat directory)
- Schema: `title`, `description`, `date`, `category` (enum), `author`, `draft`
- Routes: `/blog/`, `/blog/{slug}/`
- Category filters hardcoded in the listing page
- No series, no tag pages, no Substack integration fields

### After

- Collection: `posts` at `src/content/posts/` (topic subdirectories)
- Schema: see full schema below
- Routes: `/blog/`, `/blog/{slug}/`, `/blog/tag/{tag}/`, `/series/{series}/`
- Dynamic tag filters generated from tags in use
- Series navigation, featured pinning, cover images, Substack link

## Files Created

| File | Purpose |
|------|---------|
| `src/lib/posts.ts` | Shared utilities: `getSlug`, `getPostUrl`, `estimateReadTime`, `formatDate`, `formatDateLong` |
| `src/pages/blog/tag/[tag].astro` | Tag filter page — `/blog/tag/{tag}/` |
| `src/pages/series/[series].astro` | Series archive page — `/series/{series}/` |
| `src/content/posts/investing/*.md` | Investing lessons Part 1 & 2 |
| `src/content/posts/startups/*.md` | 12 Things from Building Digital Ventures |
| `src/content/posts/crypto/*.md` | Top 5 Crypto Currencies |
| `src/content/posts/newsletters/*.md` | Weekly Recap Ep1 |

## Files Modified

| File | Changes |
|------|---------|
| `src/content.config.ts` | Collection renamed `blog` → `posts`, new schema, new base path |
| `src/pages/blog/index.astro` | Tag-based filtering, featured post pinning, uses shared helpers |
| `src/pages/blog/[...slug].astro` | Series/chronological nav, cover image, updated date, Substack link |
| `src/pages/index.astro` | `posts` collection, `tags[0]` instead of `category`, `getPostUrl()` |
| `src/pages/rss.xml.ts` | `posts` collection, `getPostUrl()` |

## Files Deleted

| File | Reason |
|------|--------|
| `src/content/blog/*.md` (5 files) | Moved to `src/content/posts/{topic}/` with updated frontmatter |

## Frontmatter Schema

### Required

```yaml
title: "Post Title"              # string
description: "One sentence."     # string
date: 2026-02-08                 # date
tags: [investing, lessons]       # string[]
draft: false                     # boolean (default: false)
```

### Optional

```yaml
slug: "custom-url-slug"          # string — overrides filename for URL
series: "investing-lessons"      # string — groups into a named series
issue: 1                         # number — position within series
substack: true                   # boolean (default: false) — flag for cross-posting
substack_id: 12345               # number — written back after Substack publish
audience: "everyone"             # enum: everyone | paid | free (default: everyone)
cover: "/images/blog/hero.jpg"   # string — hero image + og:image
featured: true                   # boolean (default: false) — pins to top of listings
updated: 2026-03-15              # date — shows "Updated Mar 15" without changing sort
```

## Routes

| URL | Source | Behavior |
|-----|--------|----------|
| `/blog/` | `blog/index.astro` | All non-draft posts. Featured pinned to top. Tag filter buttons. |
| `/blog/{slug}/` | `blog/[...slug].astro` | Individual post. Slug from frontmatter or filename. |
| `/blog/tag/{tag}/` | `blog/tag/[tag].astro` | Posts filtered by tag. |
| `/series/{series}/` | `series/[series].astro` | Series posts ordered by issue number (ascending). |

## Slug Resolution

Handled by `getSlug()` in `src/lib/posts.ts`:

1. If `slug` is set in frontmatter → use it
2. Otherwise → extract filename from the glob loader id (strips directory path)

Example: `src/content/posts/investing/10-investing-lessons-part-1.md` → `/blog/10-investing-lessons-part-1/`

## Display Logic (Post Template)

The single post template at `blog/[...slug].astro` adapts based on frontmatter:

```
if series + issue:
  show "Investing Lessons · Issue #1" badge (links to series archive)
  prev/next navigation ordered by issue number within the series
else:
  show tag badges (each links to /blog/tag/{tag}/)
  prev/next navigation in chronological order

if cover:       → hero image above title
if updated:     → "Updated Feb 8, 2026" line below publish date
if substack_id: → "Also on Substack →" link after content
```

## Content Migration

| Original file | New location | Frontmatter changes |
|--------------|-------------|-------------------|
| `blog/10-investing-lessons-part-1.md` | `posts/investing/` | `category` → `tags: [investing]`, added `series: "investing-lessons"`, `issue: 1` |
| `blog/10-investing-lessons-part-2.md` | `posts/investing/` | Same, `issue: 2` |
| `blog/12-things-i-learned-from-building-digital-ventures.md` | `posts/startups/` | `category` → `tags: [startups]` |
| `blog/top-5-crypto-currencies.md` | `posts/crypto/` | `category` → `tags: [crypto]` |
| `blog/the-weekly-recap-ep1.md` | `posts/newsletters/` | `category` → `tags: [recap]`, added `series: "weekly-recap"`, `issue: 1` |

Folder organization is cosmetic — moving files between folders does not affect URLs, tags, or behavior.
