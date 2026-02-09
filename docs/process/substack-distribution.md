# Substack Distribution

## Overview

Content is written as markdown in the Astro site repo. The Substack MCP server handles cross-posting — converting markdown to Substack's Tiptap format and calling the REST API directly.

```
src/content/posts/my-article.md
    │
    ├──► sauravbhatia.com/blog/my-article/     (Astro build)
    │
    └──► blog.sauravbhatia.com                  (Substack MCP)
         create_draft → review → publish
```

## MCP Server

**Project:** `/Users/sauravb/0devprojects/substack-mcp/`
**Config:** `/Users/sauravb/0devprojects/sb-website/.mcp.json`

The server connects to `blog.sauravbhatia.com` (custom domain) via the Substack REST API using a session token.

### Available Tools

| Tool | Purpose |
|------|---------|
| `list_posts` | List published posts (newest first, paginated) |
| `list_drafts` | List all drafts |
| `get_post` | Get a post/draft by ID with body as readable markdown |
| `create_draft` | Create a new draft from markdown |
| `update_draft` | Update title, subtitle, or body of an existing draft |
| `delete_draft` | Delete a draft |
| `publish_draft` | Publish a draft immediately |
| `schedule_draft` | Schedule a draft for future publication |
| `upload_image` | Upload an image to Substack CDN |
| `get_subscribers` | Get subscriber count |

## Distribution Flow

### New post → Substack

```
1. Write post with `substack: true` in frontmatter
2. "Push {filename} to Substack as a draft"
   → Claude reads the .md file
   → Strips frontmatter, sends markdown body
   → MCP converts markdown → Tiptap JSON
   → Calls create_draft API
   → Returns draft ID

3. Review draft on Substack dashboard (blog.sauravbhatia.com/publish)

4. "Publish draft {id}"          → live immediately
   OR "Schedule draft {id} for {datetime}"  → queued

5. Update frontmatter:
   substack_id: {id}
```

### Update existing post on Substack

```
1. Edit the markdown file
2. "Update Substack draft {id} with the new body from {filename}"
   → Claude reads file, calls update_draft
```

### Check what's pending

```
"Which posts have substack: true but no substack_id?"
→ Claude greps frontmatter, lists posts not yet pushed
```

## Frontmatter ↔ Substack Mapping

| Frontmatter | Substack API field | Notes |
|-------------|-------------------|-------|
| `title` | `draft_title` | Direct mapping |
| `description` | — | Used as Substack subtitle when cross-posting |
| `audience` | `audience` | `everyone`, `paid`, `free` |
| `tags` | — | Substack doesn't have tags; ignored |
| `cover` | — | Upload separately via `upload_image` if needed |
| `series` | — | Site-only concept |
| `substack_id` | `id` | Written back after publishing |

## Session Token

The MCP server authenticates with a `substack.sid` cookie. To get/refresh the token:

1. Log in to Substack in your browser
2. Open DevTools → Application → Cookies → `substack.sid`
3. Copy the value
4. Update `.mcp.json` env var `SUBSTACK_SESSION_TOKEN`

Token expires periodically. If tools return auth errors, refresh the token.

## Markdown → Tiptap Conversion

The MCP server converts markdown to Substack's Tiptap JSON format. Supported:

- Headings (h1-h6)
- Bold, italic, inline code, links
- Fenced code blocks with language
- Bullet and ordered lists
- Blockquotes
- Horizontal rules
- Images (`![alt](url)` → captionedImage)
- Paywall marker (`<!-- PAYWALL -->`)

What's NOT supported (add to tiptap.py if needed):
- Tables
- Footnotes
- Nested lists (only single-level)
- Embedded tweets/videos (use Substack editor for these)
