---
title: "Custom Slug, Updated Date & Substack Link (Test)"
description: "A test post to validate slug override, updated date display, and the 'Also on Substack' link."
date: 2026-01-15
tags: [crypto, testing]
draft: false
slug: "my-custom-slug"
updated: 2026-02-08
substack: true
substack_id: 99999
audience: "everyone"
---

## This is a test post for slug + updated + substack_id

This post exists to verify that:

### Custom slug
- The URL is `/blog/my-custom-slug/` (not `/blog/custom-slug-updated-substack/`)
- Links from `/blog/`, tag pages, and RSS all point to the custom slug

### Updated date
- Below the publish date line, there is an **"Updated Feb 8, 2026"** notice
- The post's sort position is still based on the original `date` (Jan 15), not the `updated` date

### Substack link
- After the post content, there is an **"Also on Substack →"** link
- The link points to `https://blog.sauravbhatia.com/p/my-custom-slug`

### Audience field
- The `audience: "everyone"` field is stored but has no visual effect on the site — it's used during Substack cross-posting only

### New tag
- The `testing` tag is new — should appear on `/blog/` filters and generate `/blog/tag/testing/`.
