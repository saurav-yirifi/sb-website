# Writing Workflow

## Creating a New Post

### 1. Create the file

Pick a folder that makes sense to you and create a `.md` file:

```
src/content/posts/investing/my-new-article.md
```

### 2. Add frontmatter

Minimal (site-only article):

```yaml
---
title: "My New Article"
description: "One sentence about what this covers."
date: 2026-02-08
tags: [investing]
draft: true
---

Your markdown content here.
```

Start with `draft: true`. Flip to `false` when ready to publish.

Full (newsletter issue, cross-posted to Substack):

```yaml
---
title: "The Weekly Recap: Ep 5"
description: "This week's curated links and thoughts."
date: 2026-02-08
tags: [recap, crypto, startups]
draft: true
series: "weekly-recap"
issue: 5
substack: true
audience: "everyone"
cover: "/images/blog/recap-ep5.jpg"
---
```

### 3. Write and preview

```bash
npm run dev
# Visit http://localhost:4321/blog/my-new-article/
```

Draft posts are visible in dev mode but excluded from production builds.

### 4. Publish to site

Set `draft: false` in frontmatter. Commit and push — Cloudflare Pages deploys automatically.

### 5. Cross-post to Substack (if applicable)

If `substack: true` in frontmatter, ask Claude to push it:

> "Push my-new-article.md to Substack as a draft"

Claude will:
1. Read the markdown file
2. Convert to Tiptap JSON via the MCP server
3. Call `create_draft` with the title, body, and audience
4. Return the Substack draft ID

Then:
- Review the draft on your Substack dashboard
- Ask Claude to publish: "Publish Substack draft 12345"
- Or schedule: "Schedule draft 12345 for March 1st 9am UTC"

After publishing, update frontmatter with the Substack ID:

```yaml
substack_id: 12345
```

This enables a "Read on Substack" link on your site.

### 6. Substack Notes (linking back to site)

For a short teaser note on Substack that links to the full article on your site:

> "Drop a Substack note linking to sauravbhatia.com/blog/my-new-article/"

(Note: Substack Notes API support depends on API availability — may require manual posting.)

## Multi-Part Articles

Use `series` and `issue` to group parts:

```yaml
# Part 1
series: "investing-lessons"
issue: 1

# Part 2
series: "investing-lessons"
issue: 2
```

The site auto-generates prev/next links within the series and a series archive at `/series/investing-lessons/`.

## Updating Existing Content

When making meaningful revisions to a published post, add or update the `updated` field:

```yaml
date: 2026-02-08       # original publish date (don't change)
updated: 2026-03-15    # revision date
```

This shows "Updated Mar 15, 2026" on the post without changing its position in listings.

## Featuring a Post

Set `featured: true` to pin a post to the top of listing pages:

```yaml
featured: true
```

Use sparingly — 1-2 featured posts at a time. Featured posts appear above the chronological list with visual distinction.
